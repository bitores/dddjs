import Base from "../Base";

export class UIShader extends Base {
  vertShader: WebGLShader | null;
  fragShader: WebGLShader | null;
  program: WebGLProgram | null;
  locations: Object = Object.create(null);
  private shaderTypeReg = /(attribute|uniform)\s\S+\s\S+;/g;
  public ctx: WebGLRenderingContext;
  // public vertSource: string; 
  // public fragSource: string;
  constructor(public vertSource: string, public fragSource: string, public name: string = '') {
    super()
  }

  init(ctx: WebGLRenderingContext) {
    this.ctx = ctx;
    this.vertShader = this.compileShader(this.vertSource, ctx.VERTEX_SHADER);
    this.fragShader = this.compileShader(this.fragSource, ctx.FRAGMENT_SHADER);
    if (this.vertShader && this.fragShader) {
      this.program = this.linkProgram(this.vertShader, this.fragShader)
    }
    this.analySource(this.vertSource);
    this.analySource(this.fragSource);
    // console.log(this.vars)
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
    if (shader) {
      this.ctx.shaderSource(shader, source);
      this.ctx.compileShader(shader);
    }

    return shader;
  }

  private linkProgram(vertShader: WebGLShader, fragShader: WebGLShader) {
    var shaderProgram = this.ctx.createProgram();
    if (shaderProgram) {
      this.ctx.attachShader(shaderProgram, vertShader);
      this.ctx.attachShader(shaderProgram, fragShader);
      this.ctx.linkProgram(shaderProgram);
    }

    return shaderProgram;
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
        //1.对纹理图像进行Y轴反转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        //2.开启0号纹理单元
        gl.activeTexture(gl.TEXTURE0);
        //3.向target绑定纹理对象
        // gl.bindTexture(gl.TEXTURE_2D, texture);

        //4.配置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //5.配置纹理图像
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

        //.....
        gl.uniform1i(location.value, v);
        ; break;
      case 'samplerCube':
        //1.对纹理图像进行Y轴反转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        //2.开启0号纹理单元
        gl.activeTexture(gl.TEXTURE0);

        // gl.bindTexture(gl.TEXTURE_CUBE_MAP, textureObject);
        //立方图纹理需要设置六个方位上的纹理，为了方便区分，我设置了六个不同的纹理图像
        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById('myTexture1'));
        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById('myTexture2'));
        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById('myTexture3'));
        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById('myTexture4'));
        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById('myTexture5'));
        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById('myTexture6'));

        //.....
        gl.uniform1i(location.value, v);
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
    return new UIShader(this.vertSource, this.fragSource, this.name);
  }

  toString() {
    return '()';
  }
}