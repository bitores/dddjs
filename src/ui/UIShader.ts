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
  private shaderTypeReg = /(attribute|uniform)\s\S+\s\S+;/g;
  constructor(public ctx: WebGLRenderingContext, public vertSource: string, public fragSource: string, public name: string = '') {
    super()
    this.vertShader = this.compileShader(vertSource, ctx.VERTEX_SHADER);
    this.fragShader = this.compileShader(fragSource, ctx.FRAGMENT_SHADER);
    this.program = this.linkProgram(this.vertShader, this.fragShader)
    this.analySource(vertSource);
    this.analySource(fragSource);
    // console.log(this.vars)
  }

  analySource(source: string) {
    let format = source.replace(/\s+/g, ' ');
    let matchs = format.match(this.shaderTypeReg);
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
      if (value !== null) {
        this.locations[ret[2]] = {
          prefix: ret[0],
          type: ret[1],
          value: value
        }
      } else {
        throw new Error()
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

  upload(name: string, value) {
    switch (name) {
      case 'bool':
        ; break;
      case 'int':
        ; break;
      case 'float':
        ; break;
      case 'vec2':
        ; break;
      case 'vec3':
        ; break;
      case 'vec4':
        ; break;
      case 'bvec2':
        ; break;
      case 'bvec3':
        ; break;
      case 'bvec4':
        ; break;
      case 'ivec2':
        ; break;
      case 'ivec3':
        ; break;
      case 'ivec4':
        ; break;
      case 'mat2': {
        let v = this.locations[name];
        this.ctx.uniformMatrix2fv(v.value, false, value)
      } break;
      case 'mat3':
        ; break;
      case 'mat4':
        ; break;
      case 'sampler2D':
        ; break;
      case 'samplerCube':
        ; break;
      default:
        throw new TypeError('')
        ; break;

    }
  }

  get className() {
    return 'UIShader';
  }

  clone() {
    return new UIShader(this.ctx, this.vertSource, this.fragSource, this.name);
  }

  toString() {
    return '()';
  }
}