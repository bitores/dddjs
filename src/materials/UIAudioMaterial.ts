import { GLTools } from './../tools/GLTools';
import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";

export class UIAudioMaterial extends UIMaterial {
  // https://www.web-tinker.com/article/20498.html  绘制音乐的波形图

  // text map
  _audio: HTMLAudioElement | null = null;
  _audioIsReady: boolean = false;
  _audioPausing: boolean = true;
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
    this._audio = audio;
    this._audio.volume = 0.1;
    // this._audio.currentTime = 1000;
    audio.addEventListener('timeupdate', function (e) {
      console.log('00', e.timeStamp)
    })
    audio.addEventListener("playing", function () {
      that._audioIsReady = true;
      that.config['audio'] = audio;
      // if (that.config['autoPlay'] === false) audio.pause()
    }, true);
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
      audio.play();
    }, true);

    audio.addEventListener("error", function (e) {
      console.error(e)
    });

    // audio.play();

    var AudioContext = window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"];
    var context = new AudioContext();
    //从元素创建媒体节点
    var media = context.createMediaElementSource(audio);
    //创建脚本处理节点
    var processor = context.createScriptProcessor(4096, 1, 1);
    //连接：媒体节点→控制节点→输出源
    media.connect(processor);
    processor.connect(context.destination);
    //控制节点的过程处理
    processor.onaudioprocess = function (e) {
      //获取输入和输出的数据缓冲区
      var input = e.inputBuffer.getChannelData(0);
      var output = e.outputBuffer.getChannelData(0);
      console.log(e.outputBuffer.numberOfChannels)
      //将输入数缓冲复制到输出缓冲上
      for (var i = 0; i < input.length; i++)output[i] = input[i];
      // output [-1,1]
      // console.log(output)
    };
  }

  play() {
    console.log('play')
    this._audioPausing = false;
    this._audio && this._audio.play()
    if (this._audio)
      this._audio.muted = false;
  }

  pause() {
    console.log('pause')
    this._audioPausing = true;
    this._audio && this._audio.pause()
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