import TimeInterpolator from './interpolator/TimeInterpolator';
import TypeEvaluator from './evaluator/TypeEvaluator';
import { AnimationListener } from './AnimationListener';
import { LinearInterpolator } from './interpolator/LinearInterpolator';
import { Object3d } from '../core/Object3d';

/**
 * 动画基本属性及生命周期管理
 */
export class Animation {
  // 基本属性 - 外设置 - setter
  protected _duration: number = 0; // 动画的一次执行时间等于 startOffset + duration；
  protected _startOffset: number = 0;
  protected _repeatCount: number = 0;
  protected _repeatMode: string = 'restart';// reverse表示倒序回放，restart表示从头播放

  protected _fillEnabled: boolean = false;
  // fillBefore 与 fillAfter 表示在 [0,1]范围外， 不互斥，意思就说，可以同时为true或false
  protected _fillBefore: boolean = true; // fillBefore支持时间<0 :
  protected _fillAfter: boolean = false; // fillAfter支持时间>1 : true表示在动画执行结束后，动画效果还持续存在，false表示执行结束后View展示回到原始位置，也就是View的可视区域的大小；

  protected _interpolator: TimeInterpolator = new LinearInterpolator();
  protected _evaluator: TypeEvaluator;

  protected _listeners: AnimationListener = new AnimationListener();


  // 辅助属性
  protected _cycleFlip: boolean = false;
  protected _repeated: number = 0;

  protected _initialized: boolean = false;


  //----
  protected _startTime: number = -1;
  protected _started: boolean = false;
  protected _ended: boolean = false;
  protected _more: boolean = false;
  protected _oneMoreTime: boolean = false;

  protected _pauseTime: number = 0;
  protected _isPausing: boolean = false;

  static REVERSE: string = 'reverse';

  constructor(public _target: Object3d, public _canStop: boolean = true) {

  }

  setTarget(target: Object3d) {
    this._target = target;
  }

  updateAnimation() {
    // 动画 外部更新 方法
    if (!this._oneMoreTime || this._isPausing) return;

    let currentTime = this.__getCurrentTime();

    let isRunning = this.getTransformation(currentTime);
    // console.log(isRunning)

    return isRunning;
  }

  // 子类实现
  initialize(width: number, height: number, parentWidth: number, parentHeight: number) {
    // 场景基本信息。。。
    this.reset();
    this._initialized = true;
  }

  // main 
  applyTransformation(interpolatedTime) {
    //  扩展入口 - 子类实现
    // 子类实现此方法根据插值时间来应用其转化效果，比如说透明度动画，在时间0.5时的透明度等；interpolatedTime是0～1之间的规整化时间；
  }

  /***
   * 
   * 返回true表示动画还在执行，false表示动画执行结束了
  */
  getTransformation(currentTime: number, scale: number = 1.0) {
    // 基类逻辑处理入口

    if (this._startTime == -1) {
      //前文描述了一种设置startTime为START_ON_FIRST_FRAME动作，表示动画在界面绘制的第一帧开始执行，这里就是其StartTime的真正赋值
      //后文描述了当动画需要多次执行时，每次执行结束后startTime会置为-1，重新经此方法决定动画startTime
      this._startTime = currentTime;
    }

    //获取动画的执行偏移时间，动画真正的执行耗时是startTime + startOffset。startOffset表示动画在startTime后还要等待startOffset才执行
    let startOffset = this._startOffset;// getStartOffset();
    //获取动画执行一次的耗时
    let duration = this._duration;
    let normalizedTime;
    if (duration != 0) {
      //计算当前时间在动画一次执行过程中的位置，此值如果是在startOffset范围内，也就是动画还没执行，则结果为<0;
      //开始执行时为0，如果是执行过程中肯定<1,执行结束后则一定>=1
      normalizedTime = ((currentTime - (this._startTime + startOffset))) / duration;
    } else {
      // time is a step-change with a zero duration
      //duration为0，则是初始帧和结束帧来回切换的动画，时间只有0 1两种取值
      normalizedTime = currentTime < this._startTime ? 0.0 : 1.0;
    }

    //动画一次执行结束了
    let expired = normalizedTime >= 1.0;
    //mMore表示动画是否还有帧可以执行，默认是只执行一次，所以一次后mMore=false；后面会根据repeatCount重新决定此值
    this._more = !expired;

    //mFillEnabled为false,直接将时间规整到0～1之间(FillEnabled默认值是false)
    if (!this._fillEnabled) normalizedTime = Math.max(Math.min(normalizedTime, 1.0), 0.0);

    //fillBefore支持时间<0,fillAfter支持时间>1
    if ((normalizedTime >= 0.0 || this._fillBefore) && (normalizedTime <= 1.0 || this._fillAfter)) {
      if (!this._started) {
        //通知动画开始
        this.fireAnimationStart();
        this._started = true;
      }

      //---for progress
      let progress = normalizedTime;  // add by huangzj

      //mFillBefore或mFillEnd导致规整时间不在0~1之间，再规整一遍
      if (this._fillEnabled) {
        normalizedTime = Math.max(Math.min(normalizedTime, 1.0), 0.0);
      }

      //动画的重复模式reverse时，往回执行
      if (this._cycleFlip) {
        normalizedTime = 1.0 - normalizedTime;
      }

      //获取插值时间，因为均匀时间被插值器打乱成插值时间，形成了动画的速率变化效果
      let interpolatedTime = this._interpolator.getInterpolation(normalizedTime);
      //子类实现此方法，来真正的应用动画效果
      this.applyTransformation(interpolatedTime);
      // 动画进度
      this.fireAnimationProgress(progress);
    }

    if (expired) {
      if (this._repeatCount === this._repeated || this.isCanceled()) {
        //动画执行次数已经全部执行完成，则通知动画结束
        if (!this._ended) {
          this._ended = true;
          this.fireAnimationEnd();
        }
      } else {
        if (this._repeatCount > 0) {
          //已执行次数+1
          this._repeated++;
        }

        if (this._repeatMode == Animation.REVERSE) {
          //动画执行结束了一轮后，动画执行是否需要反转的标志位要切换过来
          this._cycleFlip = !this._cycleFlip;
        }

        //startTime设为-1，下次调用此方法时重新赋值
        this._startTime = -1;
        //因为动画轮数没有执行完成，所以mMore置为true
        this._more = true;

        //告知动画重复执行事件
        this.fireAnimationRepeat();
      }
    }

    //动画已经执行结束了，但是OneMoreTime为true，返回标识告诉外面动画仍在执行
    //mOneMoreTime默认值为true,仅此处和cancel接口会置此值为false，所以，外部还会再调一次getTransfrom，这时候就是界面会考虑fillAfter来决定
    if (!this._more && this._oneMoreTime) {
      this._oneMoreTime = false;
      return true;
    }

    //返回动画是否还在运行
    return this._more;
  }



  // register listener 
  registerAnimationStartListener(listener: Function) {
    this._listeners.registerStartListener(listener)
    return this;
  }

  registerAnimationEndListener(listener: Function) {
    this._listeners.registerEndListener(listener)
    return this;
  }

  registerAnimationRepeatListener(listener: Function) {
    this._listeners.registerRepeatListener(listener)
    return this;
  }

  registerAnimationProgressListener(listener: Function) {
    this._listeners.registerProgressListener(listener)
    return this;
  }

  registerAnimationPauseListener(listener: Function) {
    this._listeners.registerPauseListener(listener)
    return this;
  }

  fireAnimationStart() {
    this._listeners.onAnimationStart(this)
  }

  fireAnimationEnd() {
    this._listeners.onAnimationEnd(this)
  }

  fireAnimationRepeat() {
    this._listeners.onAnimationRepeate(this)
  }

  fireAnimationProgress(progress: number) {
    this._listeners.onAnimationProgress(this, progress)
  }

  fireAnimationPause() {
    this._listeners.onAnimationPause(this);
  }


  // prototype setter
  setInterpolator(interplator: TimeInterpolator) {
    this._interpolator = interplator;
  }

  __getCurrentTime() {
    return new Date().getTime()
  }

  // 基本操作
  start() {
    // 第一次调用getTransformation时开始执行动画
    this.setStartTime(-1);
  }

  startNow() {
    // 在当前时间开始执行动画；
    this.setStartTime(this.__getCurrentTime());
  }

  pause() {
    if (this._started && !this._ended && !this._isPausing) {
      // pause
      this._isPausing = true;
      this._pauseTime = this.__getCurrentTime()
      this.fireAnimationPause()
    }
  }

  resume() {
    if (this._isPausing) {
      this._isPausing = false;
      this._startTime += this.__getCurrentTime() - this._pauseTime;
      this._pauseTime = 0;
    }
  }

  cancel() {
    if (this._started && !this._ended) {
      this.fireAnimationEnd();
      this._ended = true;
      this._pauseTime = 0;
      this._isPausing = false;
    }
    this._startTime = -1;
    this._more = false;
    this._oneMoreTime = false;
  }

  reset() {
    this._initialized = false;
    this._cycleFlip = false;
    this._repeated = 0;
    this._isPausing = false;
    this._pauseTime = 0;
    this._more = true;
    this._oneMoreTime = true;
  }

  detach() {
    if (this._started && !this._ended) {
      this._ended = true;
      this.fireAnimationEnd()
    }
  }

  // 基本状态
  isInitialized() {
    return this._initialized;
  }

  hasStarted() {
    return this._started;
  }

  isRunning() {
    return this._started && !this._ended;
  }

  hasEnded() {
    return this._ended;
  }

  isFillEnabled() {
    return this._fillEnabled;
  }

  isCanceled() {
    return this._startTime == -1;
  }

  /**
   * @param durationMillis 
   * 指定动画最长可以执行的时间；
   * 此方法实现在预期执行动画时间超出durationMillis时，
   * 通过减少duration和repeatCount的值来保证动画总执行时间不超过durationMillis
   */
  restrictDuration(durationMillis: number) {
    // If we start after the duration, then we just won't run.
    if (this._startOffset > durationMillis) {
      this._startOffset = durationMillis;
      this._duration = 0;
      this._repeatCount = 0;
      return;
    }

    let dur = this._duration + this._startOffset;
    if (dur > durationMillis) {
      this._duration = durationMillis - this._startOffset;
      dur = durationMillis;
    }
    // If the duration is 0 or less, then we won't run.
    if (this._duration <= 0) {
      this._duration = 0;
      this._repeatCount = 0;
      return;
    }
    // Reduce the number of repeats to keep below the maximum duration.
    // The comparison between mRepeatCount and duration is to catch
    // overflows after multiplying them.
    if (this._repeatCount < 0 || this._repeatCount > durationMillis
      || (dur * this._repeatCount) > durationMillis) {
      // Figure out how many times to do the animation.  Subtract 1 since
      // repeat count is the number of times to repeat so 0 runs once.
      this._repeatCount = ((durationMillis / dur) - 1) | 0;
      if (this._repeatCount < 0) {
        this._repeatCount = 0;
      }
    }
  }

  setStartTime(startTimeMillis: number) {
    this._startTime = startTimeMillis;
    this._started = this._ended = false;
    this._cycleFlip = false;
    this._repeated = 0;
    this._isPausing = false;
    this._pauseTime = 0;
    this._more = true;
    this._oneMoreTime = true;

  }
}

