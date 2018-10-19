import Base from "../Base";

export class UIShader extends Base {
  vertShader: WebGLShader;
  fragShader: WebGLShader;
  program: WebGLProgram;
  locations: Object = Object.create(null);
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

  // 限制 gl.-----fv
  uploadItem(name: string, v) {
    let gl = this.ctx;
    let location = this.locations[name],
      prefix = location.prefix,
      type = location.type;

    switch (type) {
      case 'bool':
      case 'int':
      case 'float': {
        if (prefix == 'attribute') {
          gl.vertexAttrib1fv(location.value, v);
        } else {
          gl.uniform1fv(location.value, v);
        }
      } break;
      case 'vec2':
      case 'bvec2':
      case 'ivec2': {
        if (prefix == 'attribute') {
          gl.vertexAttrib2fv(location.value, v);
        } else {
          gl.uniform2fv(location.value, v);
        }
      } break;

      case 'vec3':
      case 'bvec3':
      case 'ivec3': {
        if (prefix == 'attribute') {
          gl.vertexAttrib3fv(location.value, v);
        } else {
          gl.uniform3fv(location.value, v);
        }
      } break;
      case 'vec4':
      case 'bvec4':
      case 'ivec4': {
        if (prefix == 'attribute') {
          gl.vertexAttrib4fv(location.value, v);
        } else {
          gl.uniform4fv(location.value, v);
        }
      } break;
      case 'mat2': {
        gl.uniformMatrix2fv(location.value, false, v)
      } break;
      case 'mat3': {
        gl.uniformMatrix3fv(location.value, false, v)
      } break;
      case 'mat4': {
        gl.uniformMatrix4fv(location.value, false, v)
      } break;
      case 'sampler2D':
        ; break;
      case 'samplerCube':
        ; break;
      default:
        throw new TypeError('')
        ; break;
    }
  }

  // upload() {
  //   for(let o in this.locations){
  //     this.uploadItem(o)
  //   }
  // }

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