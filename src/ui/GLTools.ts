export class GLTools {

  // create buffer object
  static createVBO(gl: WebGLRenderingContext, data: Float32Array, isIndex: boolean = false, bufferStatic: any = true) {
    let usage: number | null = null;
    let target = isIndex ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
    switch (bufferStatic) {
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

  static useVBO(gl: WebGLRenderingContext, bo: WebGLBuffer, location: number, size: number) {
    gl.bindBuffer(gl.ARRAY_BUFFER, bo);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  static createFBO(gl: WebGLRenderingContext, images: HTMLImageElement[]) {
    // https://github.com/StringKun/WebGL-FBO
    // WebGLFramebuffer
    let fboBuffer = gl.createFramebuffer();

    let texture = gl.createTexture();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 256, 256, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


    // 新建渲染缓冲区对象作为帧缓冲区的深度缓冲区对象
    var depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 256, 256);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fboBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

    // 检测帧缓冲区对象的配置状态是否成功
    var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (gl.FRAMEBUFFER_COMPLETE !== e) {
      console.log('Frame buffer object is incomplete: ' + e.toString());
      return;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    return { fboBuffer, texture };
  }

  useFBO(gl: WebGLRenderingContext, fbo: WebGLFramebuffer, texture: WebGLTexture, callback: Function) {
    // 在帧缓冲区的颜色关联对象即纹理对象中绘制立方体，纹理使用图片
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);// 绑定帧缓冲区对象后绘制就会在绑定帧缓冲区中进行绘制
    callback()
    // 在canvas上绘制矩形，纹理使用上一步在纹理对象中绘制的图像
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);// 接触绑定之后，会在默认的颜色缓冲区中绘制
    gl.bindTexture(gl.TEXTURE_2D, texture);
  }

  static createTexture(gl: WebGLRenderingContext, image: HTMLImageElement | null = null, option: {
    wrapS?: number,
    wrapT?: number,
    filterMin?: number,
    filterMag?: number,
    unit?: number,
    pixel?: number,
    flip?: number,
    width?: number,
    height?: number,
    format?: number,
    type?: number
  }) {
    let wrapS = option.wrapS || gl.CLAMP_TO_EDGE,
      wrapT = option.wrapT || gl.CLAMP_TO_EDGE,
      filterMin = option.filterMin || gl.LINEAR,
      filterMag = option.filterMag || gl.LINEAR,
      unit = option.unit || 0,
      pixel = option.pixel || gl.UNPACK_FLIP_Y_WEBGL,
      flip = option.flip || 1,
      width = option.width || 512,
      height = option.height || 512,
      format = option.format || gl.RGB,
      type = option.type || gl.UNSIGNED_BYTE;

    var texture = gl.createTexture();
    gl.pixelStorei(pixel, flip);
    // 开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set up texture so we can render any size image and so we are
    // working with pixels.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);// 纹理水平填充方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);// 纹理垂直填充方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMin);// 纹理缩小方式
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMag);// 纹理放大方式

    // 函数原型
    // https://www.cnblogs.com/w-wanglei/p/6659809.html
    // texImage2D(target, level, internalformat, width, height, border=0, format=interalformat, type, image·)
    // 将image指定的图像分配给绑定到目标上的纹理对象。是WebGL2.0的函数，主要区分WebGL1.0的同名函数区别。参数：
    // target:gl.TEXTURE_2D或gl.TEXTURE_CUBE
    // level:传入0（实际上，该参数是为金字塔纹理准备的）
    // internalformat:图像的内部格式
    // width:文理绘制宽度
    // height:纹理绘制高度
    // format:纹理数据格式，必须使用与internalformat相同的值
    // type:纹理数据的类型
    // image:包含纹理图像的Image对象，可为null

    if (image === null) {
      // 绘制32*32的数据 一三象限白色，二四象限黑色，用作平铺国际象棋棋盘
      // dat=[];
      // for(i=0;i<32;i++)for(j=0;j<32;j++)
      //   k=i<16^j<16?255:0,dat.push(k,k,k);
      // 把数组转换成内存指针作为texImage2d的参数
      // webgl.texImage2D( webgl.TEXTURE_2D,0,webgl.RGB,32,32,0,webgl.RGB, webgl.UNSIGNED_BYTE,new Uint8Array(dat));


      // make the texture the same size as the image
      gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);

    } else {
      // IMG对象包含的数据可不止图片的数据而已，还有图片的尺寸。所以我们直接使用图片对象作为参数就不用给这个函数传入尺寸
      // 同样， DOM对象都有自带的图形数据和相应的尺寸数据，所以在使用DOM对象作为数据参数时不需要在参数中制定尺寸
      // 推论： 如果 数据中没有携带对应的 尺寸信息 或者说 图像数据为null 时，我们就必须 设置 其尺寸大小
      gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, image);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  }

  static createCubeTexture(gl: WebGLRenderingContext, images: HTMLImageElement[] | null = null, option: {
    wrapS?: number,
    wrapT?: number,
    filterMin?: number,
    filterMag?: number,
    unit?: number,
    pixel?: number,
    flip?: number,
    width?: number,
    height?: number,
    format?: number,
    type?: number
  }) {
    let wrapS = option.wrapS || gl.CLAMP_TO_EDGE,
      wrapT = option.wrapT || gl.CLAMP_TO_EDGE,
      filterMin = option.filterMin || gl.LINEAR,
      filterMag = option.filterMag || gl.LINEAR,
      unit = option.unit || 0,
      pixel = option.pixel || gl.UNPACK_FLIP_Y_WEBGL,
      flip = option.flip || 1,
      width = option.width || 512,
      height = option.height || 512,
      format = option.format || gl.RGB,
      type = option.type || gl.UNSIGNED_BYTE;

    var texture = gl.createTexture();
    gl.pixelStorei(pixel, flip);
    // 开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    // Set up texture so we can render any size image and so we are
    // working with pixels.
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, wrapS);// 纹理水平填充方式
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, wrapT);// 纹理垂直填充方式
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, filterMin);// 纹理缩小方式
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, filterMag);// 纹理放大方式

    // 函数原型
    // https://www.cnblogs.com/w-wanglei/p/6659809.html
    // texImage2D(target, level, internalformat, width, height, border=0, format=interalformat, type, image·)
    // 将image指定的图像分配给绑定到目标上的纹理对象。是WebGL2.0的函数，主要区分WebGL1.0的同名函数区别。参数：
    // target:gl.TEXTURE_2D或gl.TEXTURE_CUBE
    // level:传入0（实际上，该参数是为金字塔纹理准备的）
    // internalformat:图像的内部格式
    // width:文理绘制宽度
    // height:纹理绘制高度
    // format:纹理数据格式，必须使用与internalformat相同的值
    // type:纹理数据的类型
    // image:包含纹理图像的Image对象，可为null

    if (images === null) {
      // 绘制32*32的数据 一三象限白色，二四象限黑色，用作平铺国际象棋棋盘
      // dat=[];
      // for(i=0;i<32;i++)for(j=0;j<32;j++)
      //   k=i<16^j<16?255:0,dat.push(k,k,k);
      // 把数组转换成内存指针作为texImage2d的参数
      // webgl.texImage2D( webgl.TEXTURE_2D,0,webgl.RGB,32,32,0,webgl.RGB, webgl.UNSIGNED_BYTE,new Uint8Array(dat));


      // make the texture the same size as the image
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, format, width, height, 0, format, type, null);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, format, width, height, 0, format, type, null);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, format, width, height, 0, format, type, null);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, format, width, height, 0, format, type, null);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, format, width, height, 0, format, type, null);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, format, width, height, 0, format, type, null);

    } else {
      // IMG对象包含的数据可不止图片的数据而已，还有图片的尺寸。所以我们直接使用图片对象作为参数就不用给这个函数传入尺寸
      // 同样， DOM对象都有自带的图形数据和相应的尺寸数据，所以在使用DOM对象作为数据参数时不需要在参数中制定尺寸
      // 推论： 如果 数据中没有携带对应的 尺寸信息 或者说 图像数据为null 时，我们就必须 设置 其尺寸大小
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, format, format, type, images[0]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, format, format, type, images[1]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, format, format, type, images[2]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, format, format, type, images[3]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, format, format, type, images[4]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, format, format, type, images[5]);
    }

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    return texture;
  }


  static createShader(gl: WebGLRenderingContext, source: string, shaderType: number) {
    var shader = gl.createShader(shaderType);
    if (shader) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
    }

    return shader;
  }

  static createProgram(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader) {
    var shaderProgram = gl.createProgram();
    if (shaderProgram) {
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);
    }

    return shaderProgram;
  }

  static useProgram(gl: WebGLRenderingContext, program: WebGLProgram) {
    gl.useProgram(program);
  }

}