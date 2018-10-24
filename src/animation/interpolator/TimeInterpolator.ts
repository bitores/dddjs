
/**
 * https://blog.csdn.net/caonima0001112/article/details/47156301
 * 定义动画的变化率
 */
export default abstract class TimeInterpolator {
  abstract getInterpolation(input: number): number;
}