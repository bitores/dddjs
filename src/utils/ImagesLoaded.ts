
export class ImagesLoaded {
  public loadedImages: HTMLImageElement[] = [];
  constructor(public images: string[] = []) {
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(images);
    }

    this.init()
  }

  init() {
    let tasks = this.images.length;
    this.images.forEach(url => {
      let image = new Image();
      // if (image.complete) {
      //   tasks--;
      //   this.progress(image);
      //   this.loadedImages.push(image)
      //   this.check(tasks)
      // } else {
      image.onload = () => {
        tasks--;
        this.progress(image);
        this.loadedImages.push(image)
        this.check(tasks)
      }
      // }
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

  onAlways(images: HTMLImageElement[]) {

  }

  progress(image: HTMLImageElement) {

  }

  error(e) {

  }
}
