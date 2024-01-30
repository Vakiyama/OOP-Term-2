import { Sortable } from '../interfaces';

export class CharacterGroup implements Sortable {
  data: string;

  constructor(data: string) {
    this.data = data;
  }

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    const compareString = this.data.toLowerCase();
    const leftCharCode = compareString[leftIndex].charCodeAt(0);
    const rightCharCode = compareString[rightIndex].charCodeAt(0);
    return leftCharCode > rightCharCode;
  }

  swap(leftIndex: number, rightIndex: number): void {
    const chars = this.data.split('');
    const leftChar = chars[leftIndex];
    chars[leftIndex] = chars[rightIndex];
    chars[rightIndex] = leftChar;
    this.data = chars.join('');
  }
}
