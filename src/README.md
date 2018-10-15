
RH
LH

#### coordinated system
- Object (M)
- Camera (V) 摄像机坐标系
- screen (P) 世界坐标系

MVP = P * V * M
http://www.manew.com/blog-22490-660.html
正射投影和透视投影。前者用于精确制图，如工业零件侧视图或建筑物顶视图，从屏幕上就可以量测平行于屏幕的线段长度；后者用于模拟视觉，远处的物体看上去较小
视图矩阵实际上就是整个世界的模型矩阵
模型视图矩阵的作用是确定某一帧中，空间里每个顶点的坐标，而投影矩阵则将这些顶点坐标映射到二维的屏幕上

M: ModelMatrix 模型矩阵，表示物体的 平移、缩放、旋转 变换信息 - 
```
所谓的ModelMatrix，就是将模型坐标变换到WorldMatrix的Matrix，

WorldMatrix = Mt * Mr * Ms

Vw = WorldMatrix * Vm
```
V: ViewMatrix 用于直接将World坐标系下的坐标转换到Camera坐标系下
```
视图矩阵作用一句话简明表达就是世界坐标系转换到摄像机坐标系。
1、根据摄像机的位置和旋转信息可以构造出摄像机的坐标系矩阵C-你单纯的乘上世界矩阵，是错误的。因为你的变化还是在世界坐标系做平移和旋转。
2、

一 相机状态描述
视点：相机在世界坐标中的位置 eye(eyeX, eyeY, eyeZ)
观测点：被观察的目标点，指明相机的朝向 at(atX, atY, atZ)
视线：从视点出发指向观测点方向的射线 dir(atX - eyeX, atY - eyeY, atZ - eyeZ)
上方向：图像的上方向，指明相机以视线为轴的旋转角 up(upX, upY, upZ)

二 相机坐标系
定义： 以视点为原点，以视线为z轴负方向，x轴与y轴与图像的x,y轴平行。
根据定义，首先可得出：

zAxis：-dir = eye - at = (eyeX - atX, eyeY - atY, eyeZ - atZ) 归一化 N(Nx, Ny, Nz)
xAxis：up X zAxis 归一化 U(Ux, Uy, Uz)
yAxis: zAxis X xAxis 归一化 V(Vx, Vy, Vz)
三 视图矩阵
姿态矩阵：相机位置变化矩阵。
视图矩阵：将顶点有世界坐标系转到到相机坐标系下的变化矩阵。
当相机位置变化时，可以看作相机不动，被观测物体发生相反的，所以视图矩阵即为姿态矩阵的逆矩阵。
假设相机初始坐标系与世界坐标重合，然后一个旋转变化R，然后经过一个平移变换T，得到相机坐标系。
```
P
```
```