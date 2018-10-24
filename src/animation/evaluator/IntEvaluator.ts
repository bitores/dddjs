import TypeEvaluator from "./TypeEvaluator";

export class IntEvaluator extends TypeEvaluator {
  //  优雅的取整
  // var a = ~~2.98
  // var b= 2.23 | 0
  // var c= 2.50 >> 0

  evaluate(fraction: number, startValue: number, endValue: number) {
    return (startValue + fraction * (endValue - startValue)) | 0;
  }
}