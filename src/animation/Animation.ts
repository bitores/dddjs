import Base from '../Base';
import { Object3d } from '../core/Object3d';
export class Animation extends Base {
  // valueFrom: number;// 初始值
  // valueTo: number;// 结束值
  // duration: number;// 动画持续时间（ms），必须设置，动画才有效果
  // startOffset: number;// 动画延迟开始时间（ms）

  // fillBefore: boolean = true // 动画播放完后，视图是否会停留在动画开始的状态，默认为true
  // fillAfter: boolean = false // 动画播放完后，视图是否会停留在动画结束的状态，优先于fillBefore值，默认为false
  // fillEnabled: boolean = true // 是否应用fillBefore值，对fillAfter值无影响，默认为true
  // repeatMode: string = "restart" // 选择重复播放动画模式，restart代表正序重放，reverse代表倒序回放，默认为restart|
  // repeatCount: number = 0 // 重放次数（所以动画的播放次数=重放次数+1），为infinite时无限重复
  // interpolator: number;// 插值器，即影响动画的播放速度
  constructor() {
    super()
  }

  // 设置动画对象
  setTarget(obj: Object3d) {
    console.log(obj)
  }

  // 启动动画
  start() {

  }

  // 暂停动画
  pause() {

  }

  // 继续动画
  resume() {

  }

  // 让动画到达最后一帧
  end() {

  }

  // 取消动画
  cancel() {

  }

  // 反向播放动画
  reverse() {

  }

  // ------------------

  // 是否已经开始
  isStarted() {

  }

  // 是否在运行中
  isRunning() {

  }

  // 开始动画前的回调函数
  onStart() {

  }
  // 每次被更新后执行
  onUpdate() {

  }
  // 结束动画后的回调函数
  onStop() {

  }
  // 动画全部结束后执行
  onComplete() {

  }

  onChange(callback) {
    this.onChangeCallback = callback;
  }
  // 
  onChangeCallback() {

  }

  get className() {
    return 'Animation';
  }

  clone() {
    // return new UIShaderSource();
  }

  toString() {
    return '()';
  }
}