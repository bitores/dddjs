import Base from "../Base";
import { UIObject } from "./UIObject";
import { UICamera } from "./UICamera";
import { UICanvas } from "./UICanvas";

export class UIRender extends Base {
  public ctx: WebGLRenderingContext | null;
  private pool: Object[] = [];
  constructor(public canvas: UICanvas, public camera: UICamera) {
    super()
    this.ctx = canvas.ctx;
  }

  // create buffer object
  createBO(data: Float32Array, is_index: boolean = false, buffer_static: any = true) {
    if (this.ctx === null) return null;
    let gl = this.ctx;
    let usage: number | null = null;
    let target = is_index ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
    switch (buffer_static) {
      case false:
      case "dynamic": {
        usage = gl.DYNAMIC_DRAW;
      } break;
      case "stream": {
        usage = gl.STREAM_DRAW;
      } break;
      case true:
      case 'static':
      default: {
        usage = gl.STATIC_DRAW;
      } break;
    }
    var bo = gl.createBuffer();
    gl.bindBuffer(target, bo);
    gl.bufferData(target, data, usage);
    gl.bindBuffer(target, null);

    return bo;
  }

  createTexture(image: HTMLImageElement) {
    if (this.ctx === null) return null;
    let gl = this.ctx;
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set up texture so we can render any size image and so we are
    // working with pixels.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);// 纹理水平填充方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);// 纹理垂直填充方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);// 纹理缩小方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);// 纹理放大方式



    // make the texture the same size as the image
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  }

  addRenderObject(obj: UIObject, image: HTMLImageElement | null = null) {
    let shader = obj._material;
    if (this.ctx && shader) shader.init(this.ctx);
    let vbo = this.createBO(obj.vertices, false, true);
    let ibo = this.createBO(obj.indices, true, true);

    var textureCoord = [



      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    ];


    let texture, tbo;
    if (image) {
      tbo = this.createBO(new Float32Array(textureCoord), false, true);
      texture = this.createTexture(image);
    }

    this.pool.push({
      obj,
      vbo,
      tbo,
      ibo,
      texture,
      shader,
      name: obj.name,
    });

    obj._children.forEach(item => {
      this.addRenderObject(item, image);
    })
  }

  getTargetMatrix(obj) {
    if (obj._parent) {
      return obj._modelMatrix.clone().dot(this.getTargetMatrix(obj._parent))
    }
    return obj._modelMatrix;
  }


  renderItem(item: any) {
    if (this.ctx === null) return;
    let gl = this.ctx, shader = item.shader, vbo = item.vbo, ibo = item.ibo, obj = item.obj;
    shader.use();


    // let proj_matrix = this.camera._projectMatrix.elements;
    // let view_matrix = this.camera._viewMatrix.elements;

    // let mov_matrix = this.getTargetMatrix(obj).elements;
    // shader.uploadItem('Pmatrix', proj_matrix)
    // shader.uploadItem('Vmatrix', view_matrix)
    // shader.uploadItem('Mmatrix', mov_matrix)
    shader.upload(this.camera, obj);




    // if (item.texture) {
    //   //1.对纹理图像进行Y轴反转
    //   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    //   //2.开启0号纹理单元
    //   gl.activeTexture(gl.TEXTURE0);
    //   //3.向target绑定纹理对象
    //   gl.bindTexture(gl.TEXTURE_2D, item.texture);

    //   // //4.配置纹理参数
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //   // //5.配置纹理图像
    //   // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    //   //6.将0号纹理图像传递给着色器
    //   gl.uniform1i(shader.location('u_Sampler'), 0);
    // }

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(shader.location('position'), 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(shader.location('position'));
    // if (tbo) {
    //   gl.bindBuffer(gl.ARRAY_BUFFER, tbo);
    //   gl.vertexAttribPointer(shader.location('a_TextCoord'), 2, gl.FLOAT, false, 0, 0);
    //   gl.enableVertexAttribArray(shader.location('a_TextCoord'));
    // }

    // console.log('..')
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.drawElements(gl.TRIANGLES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  clean() {
    if (this.ctx === null) return;
    let gl = this.ctx;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render() {
    this.clean()
    this.pool.forEach(item => {
      this.renderItem(item);
      // console.log(item.name)
    })
  }

  get className() {
    return 'UIRender';
  }

  clone() {
    // return new UIShader(this.ctx, this.vertSource, this.fragSource, this.name);
  }

  toString() {
    return '()';
  }
}