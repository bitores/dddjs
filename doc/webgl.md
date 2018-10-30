#

- 上下文
- 清画布
- 画点
- 画线
- 画面（三角形）
- 三角形上色
- 四边形
- 平移
- 旋转
- 缩放
- 投影（正交、透视）
- 纹理
- 多纹理
- 动画
- 模板
- 混合
- 透明
- 排序
- 


#######

```
Q:图片 256 * 256 jpg 放在cubetexture上有问题
A: 6张图片，保证是一样的大小，如果6张图在大小上不一样就是会出现问题。

RENDER WARNING: texture bound to texture unit 0 is not renderable. It maybe non-power-of-2 and have incompatible texture filtering.

```

#### z-fighting


将遮挡剔除设置为有效的话，需要传入内置常量gl.CULL_FACE ，遮挡剔除的内侧和外侧切换的方法
多边形的内侧和外侧是根据顶点的连接顺序来判断的，而这个判断基准反过来的情况也是有的，形成多边形的顶点的连接顺序是顺时针的时候是外侧，逆时针的时候为内侧，想要反过来判断的话，顺时针就变成了内侧。
gl.enable(gl.CULL_FACE);
将顺时针设置为［外侧］的代码：gl.frontFace(gl.CW);顺时针］的英语是ClockWise
将顺时针设置为［内侧］的代码：gl.frontFace(gl.CCW);--［逆时针］的英语为CounterClockWise

Q:需要遮挡掉一半的显示部分， 也就是只显示左边部分
A:texSubImage2D和texCopyImage2D已经试过了， 能成功


将深度测试设置为有效的代码示例


gl.enable(gl.DEPTH_TEST);
深度测试的评价函数为depthFunc，这个函数需要指定参数，一般是使用下面的常量作为参数。
>指定一般深度测试的评价方法
gl.depthFunc(gl.LEQUAL);
这里指定了内置常量gl.LEQUAL的话，就会把里侧的东西隐藏，反过来想一下，基本上不会指定成其他情况了吧。


[webgl——混合与模板测试](https://blog.csdn.net/srk19960903/article/details/73928426?utm_source=blogxgwz2)
[](https://blog.csdn.net/u014767384/article/details/81810304)
[](http://blog.sina.com.cn/s/blog_6e159df70102xa67.html)


四元数和旋转矩阵+旋转向量相比究竟有何优势：：四元数可以平滑插值