import { Animation } from "./Animation";


export class AnimationListener {
  startListeners: Function[] = [];
  endListeners: Function[] = [];
  repeatListeners: Function[] = [];
  progressListeners: Function[] = [];
  pauseListeners: Function[] = [];

  constructor() {

  }

  registerStartListener(listener: Function) {
    if (typeof (listener) === 'function')
      this.startListeners.push(listener)
  }

  registerEndListener(listener: Function) {
    if (typeof (listener) === 'function')
      this.endListeners.push(listener)
  }

  registerRepeatListener(listener: Function) {
    if (typeof (listener) === 'function')
      this.repeatListeners.push(listener)
  }

  registerProgressListener(listener: Function) {
    if (typeof (listener) === 'function')
      this.progressListeners.push(listener)
  }

  registerPauseListener(listener: Function) {
    if (typeof (listener) === 'function')
      this.pauseListeners.push(listener)
  }

  onAnimationStart(animation: Animation) {
    let listeners = this.startListeners, len = listeners.length;
    for (let i = 0; i < len; i++) {
      let listener = listeners[i];
      listener && listener(animation);
    }
  }
  onAnimationEnd(animation: Animation) {
    let listeners = this.endListeners, len = listeners.length;
    for (let i = 0; i < len; i++) {
      let listener = listeners[i];
      listener && listener(animation);
    }
  }
  onAnimationRepeate(animation: Animation) {
    let listeners = this.repeatListeners, len = listeners.length;
    for (let i = 0; i < len; i++) {
      let listener = listeners[i];
      listener && listener(animation);
    }
  }

  onAnimationProgress(animation: Animation, progress: number) {
    let listeners = this.progressListeners, len = listeners.length;
    for (let i = 0; i < len; i++) {
      let listener = listeners[i];
      listener && listener(animation, progress);
    }
  }

  onAnimationPause(animation: Animation) {
    let listeners = this.pauseListeners, len = listeners.length;
    for (let i = 0; i < len; i++) {
      let listener = listeners[i];
      listener && listener(animation);
    }
  }
}