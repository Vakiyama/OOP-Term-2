import { Sortable } from '../interfaces';

class Node<T> {
  next: Node<T> | null = null;
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class LinkedListGroup<T> implements Sortable {
  head: Node<T> | null = null;

  add(data: T): void {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let tail = this.head;
    while (tail.next) {
      tail = tail.next;
    }
    tail.next = node;
  }

  get length(): number {
    if (!this.head) {
      return 1;
    }

    let node = this.head;
    let counter = 1;
    while (node.next) {
      node = node.next;
      counter++;
    }
    return counter;
  }

  at(index: number): Node<T> {
    if (!this.head) {
      throw new Error('Error: Index out of bounds');
    }
    let counter = 0;
    let node: Node<T> | null = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    throw new Error('Error: Index out of bounds');
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    const leftNode = this.at(leftIndex);
    const rightNode = this.at(rightIndex);

    return leftNode.data > rightNode.data;
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftNode = this.at(leftIndex);
    const rightNode = this.at(rightIndex);

    const leftNodeVal = leftNode.data;
    leftNode.data = rightNode.data;
    rightNode.data = leftNodeVal;
  }

  print(): void {
    if (!this.head) {
      return;
    }
    let node: Node<T> | null = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}
