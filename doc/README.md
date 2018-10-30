html:canvas = 1: *
canvas:viewport = 1: *
canvas: scene = 1:*
#### Todo list

- math: Matrix(perspective、T、R、S) 
- camera: check the perspective matrix
- canvas: get the context e.g.gl
- object: get the model matrix
- shader: wrap the lib to handle the shader programer compile.....
- render: link the shader with the object
- shadersource: shader source lib
- event: webgl event....
- animation: ...
- scene: 
- manager: .... 


#### 矩阵验证
- 投影矩阵 已验证
- 物体平移，缩放 已验证
- 物体公转，自转 实现思路 - 借助父节点进行
- 父子节点的处理
- 动画系统基础框架，便于后期扩展，来源 Android 动画系统源码
- 基本的材质系统
- 基本的测试物体 - plane, box, ball
- 使用同一个材质实例时，应该注册其它对象对材质属性的修改造成的不可控现象
```
1、
```



####


- canvas *
- viewport *
- scene *
- camera *
- object3d *

- shaderLib 1
- render 1

- cacheLib