export default abstract class Base {
  // public name: string;

  abstract get className(): string;
  abstract toString(): string;
  abstract clone(): any;
  // abstract copy(): any;
}
