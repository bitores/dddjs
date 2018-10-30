import { GLTools } from './../tools/GLTools';
import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";

export class UIVideoMaterial extends UIMaterial {
  // text map
  _video: HTMLVideoElement | null = null;
  _videoIsReady: boolean = false;
  _videoPausing: boolean = false;
  constructor(config: {}) {
    super()

    this.config = {
      video: null,
      autoPlay: false,
      u_Sampler: null,
      ...config
    }

    let that = this;

    var video = document.createElement("video");
    video.muted = true;
    video.src = this.config['video'];

    video.addEventListener("playing", function () {
      that._videoIsReady = true;
      that.config['video'] = video;
      if (that.config['autoPlay'] === false) video.pause()
    }, true);
    video.addEventListener("ended", function () {
      video.currentTime = 0;
      video.play();
    }, true);

    video.addEventListener("error", function (e) {
      console.error(e)
    });

    video.play();
    this._video = video;
  }

  play() {
    this._videoPausing = false;
    this._video && this._video.play()
    if (this._video)
      this._video.muted = false;
  }

  pause() {
    this._videoPausing = true;
    this._video && this._video.pause()
  }

  shaderSource() {
    let vert = `
    attribute vec2 a_TextCoord;
    varying vec2 v_TexCoord;`,
      vertMain = "v_TexCoord = a_TextCoord; ",
      frag = `
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;`,
      fragMain = "gl_FragColor = texture2D(u_Sampler, v_TexCoord);";

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
  }

  handle() {
    if (this._videoIsReady) {
      let texture = GLTools.createTexture(this.ctx, this.config['video'], {});
      this.config['u_Sampler'] = texture;
      this.isReady = true;
    }

  }
}