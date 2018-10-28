
export class ImagesLoaded {
  public loadedImages: HTMLImageElement[] = [];
  constructor(public images: string[] = [], public onAlways: Function) {
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(images, onAlways);
    }

    this.init()
  }

  init() {
    let tasks = this.images.length;
    this.images.forEach(url => {
      let image = new Image();
      image.onload = () => {
        tasks--;
        this.progress(image);
        this.loadedImages.push(image)
        this.check(tasks)
      }
      image.onerror = (e) => {
        tasks--;
        this.error(e)
        this.check(tasks)
      }
      image.src = url;
    })
  }

  check(tasks) {
    if (tasks == 0) {
      this.onAlways && this.onAlways(this.loadedImages)
    }
  }

  onProgress(callback) {
    this.progress = callback;
    return this;
  }

  onError(callback) {
    this.error = callback;
    return this;
  }

  onLoad(callback) {
    this.onAlways = callback;
    return this;
  }

  progress(image: HTMLImageElement) {

  }

  error(e) {

  }
}
