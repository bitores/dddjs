import { UIScene } from './UIScene';
import Base from "../Base";
import { UICamera } from "./UICamera";
import { UICanvas } from "./UICanvas";
import { GLTools } from "../tools/GLTools";

export class UIRender extends Base {
  public ctx: WebGLRenderingContext | null;
  private pool: Object[] = [];
  public scenes: UIScene[] = [];

  public glmode: string = 'triangle';
  public drawArray: boolean = false;
  public isLineMode: boolean = false;
  constructor(public canvas: UICanvas, public camera: UICamera) {
    super()
    this.ctx = canvas.ctx;
  }

  getTargetMatrix(obj) {
    if (obj._parent) {
      return obj._modelMatrix.clone().dot(this.getTargetMatrix(obj._parent))
    }
    return obj._modelMatrix;
  }

  drawMode(mode: string, gl: WebGLRenderingContext) {
    let glmode = -1;
    switch (mode) {
      case 'point':
        glmode = gl.POINTS;
        break;
      case 'linestrip':
        glmode = gl.LINE_STRIP;
        break;
      case 'lineloop':
        glmode = gl.LINE_LOOP;
        break;
      case 'line':
        glmode = gl.LINES;
        break;
      case 'strip':
        glmode = gl.TRIANGLE_STRIP;
        break;
      case 'fan':
        glmode = gl.TRIANGLE_FAN;
        break;
      case 'triangle':
        glmode = gl.TRIANGLES;
        break;
      default:
        glmode = gl.TRIANGLES;
        break;
    }

    return glmode;
  }


  renderItem(gl: WebGLRenderingContext, item: any) {
    let ibo = item.ibo,
      obj = item.obj,
      material = obj._material;
    material.use();
    if (!!material === false) {
      console.warn(`${obj.name} needs the material`)
      return;
    }
    if (material.isReady === false) return;

    material.upload(this.camera, obj);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    let drawMode = this.drawMode(material.mode, gl);
    if (this.drawArray) {
      if (this.isLineMode || obj._material.isLineMode) {
        gl.lineWidth(5);
        gl.drawArrays(gl.LINES, 0, 6);
      } else {
        gl.drawArrays(drawMode, 0, 6);
      }
    } else {
      if (this.isLineMode || obj._material.isLineMode) {
        gl.lineWidth(5);
        gl.drawElements(gl.LINES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
      } else {
        gl.drawElements(drawMode, obj.indices.length, gl.UNSIGNED_SHORT, 0);
      }
    }
  }

  clean(gl: WebGLRenderingContext) {
    // gl.enable(gl.CULL_FACE);
    // gl.frontFace(gl.CW)
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // void gl.colorMask(red, green, blue, alpha);
  }

  render() {
    if (this.ctx === null) return;
    let gl = this.ctx;
    this.clean(gl)
    this.pool.forEach(item => {
      this.renderItem(gl, item);
    })
  }

  renderScene(scene: UIScene) {
    if (!this.ctx) return;
    let gl = this.ctx;
    scene.render((obj) => {
      let material = obj._material;
      if (!material || obj._renderInitial) return;
      material.init(gl);
      obj._renderInitial = true;
      material.config['position'] = GLTools.createVBO(gl, obj.vertices, false, true);
      material.config['color'] = GLTools.createVBO(gl, obj.colors, false, true);
      material.config['a_TextCoord'] = GLTools.createVBO(gl, obj.textCoords, false, true);
      let ibo = GLTools.createVBO(gl, obj.indices, true, true);
      this.pool.push({
        obj,
        ibo,
        name: obj.name,
      });
    })
    this.render()
  }

  clone() {
  }

  toString() {
    return '()';
  }
}