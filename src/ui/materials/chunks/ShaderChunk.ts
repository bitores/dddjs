
export class ShaderChunk {
  vertSource: string;
  fragSource: string;
  constructor(public vert: string = "", public vertMain: string = "", public frag: string = "", public fragMain: string = "") {
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
      gl_FragColor = vec4(1., 1., 1., 1.);
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
}