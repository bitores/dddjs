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

  public glmode: string = 'triangle';
  public drawArray: boolean = false;
  public isLineMode: boolean = false;
  constructor(public canvas: UICanvas, public camera: UICamera) {
    super()
    this.ctx = canvas.ctx;
  }

  addRenderObject(obj: Shape) {
    // let material = obj._material;
    // if (!this.ctx || !material) return;
    // material.init(this.ctx);
    // material.config['initial'] = true;
    // material.config['position'] = GLTools.createVBO(this.ctx, obj.vertices, false, true);
    // material.config['color'] = GLTools.createVBO(this.ctx, obj.colors, false, true);
    // material.config['a_TextCoord'] = GLTools.createVBO(this.ctx, obj.textCoords, false, true);
    // let ibo = GLTools.createVBO(this.ctx, obj.indices, true, true);

    // this.pool.push({
    //   obj,
    //   ibo,
    //   material,
    //   name: obj.name,
    // });

    // obj._children.forEach(item => {
    //   this.addRenderObject(item);
    // })
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
    let material = item.material,
      ibo = item.ibo,
      obj = item.obj;
    material.use();
    if (!!obj._material === false) {
      console.warn(`${obj.name} needs the material`)
      return;
    }
    if (obj._material.isReady === false) return;
    material.upload(this.camera, obj);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    if (this.drawArray) {
      if (this.isLineMode || obj._material.isLineMode) {
        gl.lineWidth(5);
        gl.drawArrays(gl.LINES, 0, 6);
      } else {
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    } else {
      if (this.isLineMode || obj._material.isLineMode) {
        gl.lineWidth(5);
        gl.drawElements(gl.LINES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
      } else {
        gl.drawElements(gl.TRIANGLES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
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
    // scene.nodes.forEach(obj => {



    //   obj._children.forEach(item => {
    //     this.addRenderObject(item);
    //   })
    // })

    scene.render((obj) => {
      let material = obj._material;
      if (!material || material.config['initial']) return;
      material.init(this.ctx);
      material.config['initial'] = true;
      if (this.ctx) {
        material.config['position'] = GLTools.createVBO(this.ctx, obj.vertices, false, true);
        material.config['color'] = GLTools.createVBO(this.ctx, obj.colors, false, true);
        material.config['a_TextCoord'] = GLTools.createVBO(this.ctx, obj.textCoords, false, true);
        let ibo = GLTools.createVBO(this.ctx, obj.indices, true, true);
        this.pool.push({
          obj,
          ibo,
          material,
          name: obj.name,
        });
      }
    })

  }

  clone() {
  }

  toString() {
    return '()';
  }
}