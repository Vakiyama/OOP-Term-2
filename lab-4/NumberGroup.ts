import { Sortable } from '../interfaces';

export class NumberGroup implements Sortable {
  data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  get length() {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    const tempLeft = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = tempLeft;
  }
}
