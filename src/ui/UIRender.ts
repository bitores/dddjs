import { UIScene } from './UIScene';
import Base from "../Base";
import { UICamera } from "./UICamera";
import { UICanvas } from "./UICanvas";
import { GLTools } from "../tools/GLTools";
import { Shape } from "./shape/Shape";

export class UIRender extends Base {
  public ctx: WebGLRenderingContext | null;
  private pool: Object[] = [];
  public scenes: UIScene[] = [];
  constructor(public canvas: UICanvas, public camera: UICamera) {
    super()
    this.ctx = canvas.ctx;
  }

  addRenderObject(obj: Shape, image: HTMLImageElement | null = null) {
    let shader = obj._material;
    if (!this.ctx || !shader) return;
    shader.init(this.ctx);
    let vbo = GLTools.createVBO(this.ctx, obj.vertices, false, true);
    let cbo = GLTools.createVBO(this.ctx, obj.colors, false, true);
    let tbo = GLTools.createVBO(this.ctx, obj.textCoords, false, true);
    let ibo = GLTools.createVBO(this.ctx, obj.indices, true, true);

    shader.config['position'] = vbo;
    shader.config['color'] = cbo;
    shader.config['a_TextCoord'] = tbo;


    this.pool.push({
      obj,
      ibo,
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


  renderItem(gl: WebGLRenderingContext, item: any) {
    let shader = item.shader,
      ibo = item.ibo,
      obj = item.obj;
    shader.use();
    if (obj._material.isReady === false) return;
    // console.log(obj._material.isReady)
    shader.upload(this.camera, obj);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.drawElements(gl.TRIANGLES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  clean(gl: WebGLRenderingContext) {
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CW)
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render() {
    if (this.ctx === null) return;
    let gl = this.ctx;
    this.clean(gl)
    this.pool.forEach(item => {
      this.renderItem(gl, item);
    })
  }

  get className() {
    return 'UIRender';
  }

  clone() {
  }

  toString() {
    return '()';
  }
}