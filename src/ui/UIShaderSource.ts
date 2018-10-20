import Base from "../Base";

export class UIShaderSource extends Base {
  vertSource: string;
  fragSource: string;
  private vert: string;
  private vertMain: string;
  private frag: string;
  private fragMain: string;
  constructor() {
    super()
    this.vert = "";
    this.vertMain = "";
    this.frag = "";
    this.fragMain = "";
    this.checkShader()
    this.compose()
  }

  compose() {
    this.vertSource = `
    attribute vec3 position;
    uniform mat4 Pmatrix;
    uniform mat4 Vmatrix;
    uniform mat4 Mmatrix;
    ${this.vert}
    void main(void) { 
      gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);
      ${this.vertMain}
    }
    `;
    this.fragSource = `precision mediump float;
    ${this.frag}
    void main(void) {
      gl_FragColor = vec4(1., 0., 1., 1.);
      ${this.fragMain}
    }
    `;
  }

  hasColor() {
    this.vert += `attribute vec4 color;varying   vec4 vColor;`;
    this.vertMain += `vColor = color;`;
    this.frag += `varying vec4 vColor;`;
    this.fragMain += `gl_FragColor = vColor;`;
  }

  checkShader() {

  }


  get className() {
    return 'UIShaderSource';
  }

  clone() {
    // return new UIShaderSource();
  }

  toString() {
    return '()';
  }
}