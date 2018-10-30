import { GLTools } from './../tools/GLTools';
import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";

export class UIAudioMaterial extends UIMaterial {
  // https://www.web-tinker.com/article/20498.html  绘制音乐的波形图

  // text map
  _audioIsReady: boolean = false;
  constructor(config: {}) {
    super()

    this.config = {
      audio: null,
      autoPlay: false,
      u_Sampler: null,
      ...config
    }

    let that = this;

    var audio = new Audio(this.config['audio']);

    audio.addEventListener("playing", function () {
      that._audioIsReady = true;
      that.config['audio'] = audio;
      if (that.config['autoPlay'] === false) audio.pause()
    }, true);
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
      audio.play();
    }, true);

    audio.addEventListener("error", function (e) {
      console.error(e)
    });

    audio.play();
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
    if (this._audioIsReady) {
      let texture = GLTools.createTexture(this.ctx, this.config['audio'], {});
      this.config['u_Sampler'] = texture;
      this.isReady = true;
    }

  }
}