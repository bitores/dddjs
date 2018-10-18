import Base from "../Base";

export class UIShader extends Base {
  vertShader: WebGLShader;
  fragShader: WebGLShader;
  program: WebGLProgram;
  // vars: Object = {
  //   attribute: {},
  //   uniform: {}
  // };
  locations: Object = {};
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
      let value = null;
      if (ret[0] === "uniform") {
        value = this.getUniformLocation(ret[2]);
        // this.vars[ret[0]][ret[2]] = { type: ret[1], value };
      } else if (ret[0] === "attribute") {
        value = this.getAttribLocation(ret[2]);
        // this.vars[ret[0]][ret[2]] = { type: ret[1], value };
      }
      this.locations[ret[2]] = {
        t1: ret[0],
        t2: ret[1],
        value: value
      }
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

  location(name: string) {
    return this.locations[name].value;
  }

  // get(name: string) {
  //   let val = this.uniform(name);
  //   if (val) return val;
  //   return this.attribute(name);
  // }

  // uniform(name: string) {
  //   return this.vars['uniform'][name].value;
  // }

  // attribute(name: string) {
  //   return this.vars['attribute'][name].value;
  // }

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