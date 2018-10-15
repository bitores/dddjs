import Base from "Base";
import { Vec3 } from "math/Vec3";

export default abstract class Node extends Base {
  abstract postion(): Vec3;
  children: Node[];
  parent: Node;
  _positon: Vec3 = new Vec3();
  _scale: Vec3 = new Vec3(1, 1, 1);
  _rotation: Vec3 = new Vec3();
}