import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../GLTools";

export class UIMaterial {
  // color
  public config: Object = {};
  public shader: ShaderChunk | null = null;

  public ctx: WebGLRenderingContext;
  public vertShader: WebGLShader | null;
  public fragShader: WebGLShader | null;
  public program: WebGLProgram | null;
  public locations: Object = {};

  private shaderTypeReg = /(attribute|uniform)\s\S+\s\S+;/g;
  constructor(config: Object = {}) {
    this.config = {
      color: new Float32Array([
        0, 0, 1, 1,
        1, 0, 0, 1,
        0, 1, 0, 1,
        1, 0, 1, 1
      ]),
      ...config
    }
  }

  shaderSource() {
    let vert = `
    attribute vec4 color;
    varying vec4 vColor;`,
      vertMain = "vColor = color;",
      frag = "varying vec4 vColor;",
      fragMain = "gl_FragColor = vColor;";

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
  }

  handle() {
    let tbo = GLTools.createVBO(this.ctx, this.config["color"], false)

    this.config["color"] = tbo;
  }

  init(ctx: WebGLRenderingContext) {
    this.ctx = ctx;
    this.shaderSource()
    if (!this.shader) return;
    this.vertShader = GLTools.createShader(ctx, this.shader.vertSource, ctx.VERTEX_SHADER);
    this.fragShader = GLTools.createShader(ctx, this.shader.fragSource, ctx.FRAGMENT_SHADER);
    if (this.vertShader && this.fragShader) {
      this.program = GLTools.createProgram(ctx, this.vertShader, this.fragShader)
    }
    this.analySource(this.shader.vertSource);
    this.analySource(this.shader.fragSource);
    this.handle()
  }

  analySource(source: string) {
    // 标准化 shader
    let format = source.replace(/[\s]+/g, ' ');
    // 去 换行
    format = format.replace(/[\r\n]/g, "");
    // 去 首尾空格
    format = format.replace(/(^\s*)|(\s*$)/g, "")
    // 去 ; 左右空格
    format = format.replace(/\s*;\s*/g, ';');
    let matchs = format.match(this.shaderTypeReg);
    matchs && matchs.forEach(record => {
      record = record.replace(';', '');
      let ret = record.split(' ');
      let value: WebGLUniformLocation | null = null;
      if (ret[0] === "uniform") {
        value = this.getUniformLocation(ret[2]);
      } else if (ret[0] === "attribute") {
        value = this.getAttribLocation(ret[2]);
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

  getUniformLocation(name: string) {
    if (this.program) {
      return this.ctx.getUniformLocation(this.program, name);
    }
    return null;
  }

  getAttribLocation(name: string) {
    if (this.program) {
      return this.ctx.getAttribLocation(this.program, name);
    }
    return null;
  }

  use() {
    this.ctx.useProgram(this.program);
    if (this.config['dynamic'] === true) this.handle()
  }

  location(name: string) {
    return this.locations[name] && this.locations[name].value;
  }

  getTargetMatrix(obj) {
    if (obj._parent) {
      return obj._modelMatrix.clone().dot(this.getTargetMatrix(obj._parent))
    }
    return obj._modelMatrix;
  }

  upload(camera, obj) {
    for (const item in this.locations) {
      if (this.locations.hasOwnProperty(item)) {
        switch (item) {
          // case "texture0":
          // case "texture1":
          // case "u_Sampler":
          //   {
          //     this.uploadItem(item, this.config[item])
          //   }
          //   break;
          case 'Pmatrix': {
            this.uploadItem(item, camera._projectMatrix.elements)
          }
            break;
          case 'Vmatrix': {
            this.uploadItem(item, camera._viewMatrix.elements)
          }
            break;
          case 'Mmatrix': {
            this.uploadItem(item, this.getTargetMatrix(obj).elements)
          }
            break;
          default: {
            this.uploadItem(item, this.config[item])
          }
        }
      }
    }
  }

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
          gl.bindBuffer(gl.ARRAY_BUFFER, v);
          gl.vertexAttribPointer(location.value, 1, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(location.value);
        } else {
          gl.uniform1fv(location.value, v);
        }
      } break;
      case 'vec2':
      case 'bvec2':
      case 'ivec2': {
        if (prefix == 'attribute') {
          gl.bindBuffer(gl.ARRAY_BUFFER, v);
          gl.vertexAttribPointer(location.value, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(location.value);
        } else {
          gl.uniform2fv(location.value, v);
        }
      } break;

      case 'vec3':
      case 'bvec3':
      case 'ivec3': {
        if (prefix == 'attribute') {
          gl.bindBuffer(gl.ARRAY_BUFFER, v);
          gl.vertexAttribPointer(location.value, 3, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(location.value);
        } else {
          gl.uniform3fv(location.value, v);
        }
      } break;
      case 'vec4':
      case 'bvec4':
      case 'ivec4': {
        if (prefix == 'attribute') {
          gl.bindBuffer(gl.ARRAY_BUFFER, v);
          gl.vertexAttribPointer(location.value, 4, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(location.value);
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
        gl.activeTexture(gl.TEXTURE0);
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.bindTexture(gl.TEXTURE_2D, v);
        gl.uniform1i(location.value, v.unit);
        ; break;
      case 'samplerCube':
        if (v) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, v);
          gl.uniform1i(location.value, v.unit);
        }

        ; break;
      default:
        throw new TypeError('')
        ;
    }
  }

}