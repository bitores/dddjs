import Base from "../Base";

export class UIShader extends Base {
  vertShader: WebGLShader;
  fragShader: WebGLShader;
  program: WebGLProgram;
  vars: Object = {
    attribute: {},
    uniform: {}
  };
  // private qq: RegExp = /\s+/g;
  // /(attribute|uniform)\s\S+\s\S+;/g
  constructor(public ctx: WebGLRenderingContext, public vertSource: string, public fragSource: string, public name: string = '') {
    super()
    this.vertShader = this.compileShader(vertSource, ctx.VERTEX_SHADER);
    this.fragShader = this.compileShader(fragSource, ctx.FRAGMENT_SHADER);
    this.program = this.linkProgram(this.vertShader, this.fragShader)
    this.analySource(vertSource);
    this.analySource(fragSource);
    console.log(this.vars)
  }

  analySource(source: string) {
    let format = source.replace(/\s+/g, ' ');
    let matchs = format.match(/(attribute|uniform)\s\S+\s\S+;/g);
    matchs && matchs.forEach(record => {
      record = record.replace(';', '');
      let ret = record.split(' ');
      this.vars[ret[0]][ret[2]] = ret[1];
    })
  }

  private compileShader(source: string, shaderType: number) {
    var shader = this.ctx.createShader(shaderType);
    this.ctx.shaderSource(shader, source);
    this.ctx.compileShader(shader);
    return shader;
  }

  private linkProgram(vertShader: WebGLShader, fragShader: WebGLShader) {
    var shaderProgram = this.ctx.createProgram();
    this.ctx.attachShader(shaderProgram, vertShader);
    this.ctx.attachShader(shaderProgram, fragShader);
    this.ctx.linkProgram(shaderProgram);
    return shaderProgram;
  }

  getUniformLocation(name: string) {
    return this.ctx.getUniformLocation(this.program, name);
  }

  getAttribLocation(name: string) {
    return this.ctx.getAttribLocation(this.program, name);
  }

  use() {
    this.ctx.useProgram(this.program);
  }

  get className() {
    return 'Node';
  }

  clone() {
    return new UIShader(this.ctx, this.vertSource, this.fragSource, this.name);
  }

  toString() {
    return '()';
  }
}