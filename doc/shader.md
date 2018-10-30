
- 所有 attribute, uniform ：都有唯一 location
- 传值 有 两种：一、直传   二、 buffer
- 需要 创建 ArrayBuffer:  vertices, color , normal, index ...

ArrayBuffer 使用：
1、预处理 数据 为 vbo, ibo, cbo...  - 带开关水桶
2、后面操作 xbo ,开关


https://www.aliyun.com/jiaocheng/634865.html?spm=5176.100033.2.13.c1e55584cbgfif

需求：在浏览器加载完毕后，自动播放视频：出现play() failed because the user didn't interact with the document first.错误
解决方法：给video标签加入<video muted></video> 静音即可。

Chrome 66为了避免标签产生随机噪音。

##### shader warning
 material isReady field control