import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../GLTools";
import { ImagesLoaded } from "../../utils/ImagesLoaded";


export class UICubeTextureMaterial extends UIMaterial {
  // image map

  constructor(config: Object = {}) {
    super()

    this.config = {
      images: [],
      u_Sampler: null,
      ...config
    }
  }

  shaderSource() {
    let vert = `
    attribute vec2 a_TextCoord;
    varying vec2 v_TexCoord;`,
      vertMain = "v_TexCoord = a_TextCoord; ",
      frag = `
    uniform samplerCube u_Sampler;
    varying vec2 v_TexCoord;`,
      fragMain = "gl_FragColor = textureCube(u_Sampler, vec3(v_TexCoord.xy,1));";

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
  }

  handle() {
    new ImagesLoaded(this.config['images']).onLoad((images) => {
      console.log('--', images)
      let texture = GLTools.createCubeTexture(this.ctx, images, {});
      // this.config["a_TextCoord"] = tbo;
      if (texture)
        texture['images'] = images;
      this.config['u_Sampler'] = texture;
    });


  }
}