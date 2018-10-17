export default abstract class Base {
  abstract get className(): string;
  abstract toString(): string;
  abstract clone(): any;
  // abstract copy(): any;
}
