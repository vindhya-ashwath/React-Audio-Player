class Node {
  constructor(data, prevNode, nextNode) {
    this.data = data;
    this.nextNode = nextNode;
    this.prevNode = prevNode;
  }
}

export default class DoublyLinkedList {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  length() {
    let length = 0;
    if (this.head) {
      length += 1;
      let node = this.head;
      while (node.nextNode) {
        length += 1;
        node = node.nextNode;
      }
    }
    return length;
  }

  add(value) {
    if (!this.head) {
      const newNode = new Node(value);
      this.head = newNode;
      this.tail = newNode;
    } else {
      const lastNode = this.tail;
      const newNode = new Node(value, lastNode);
      lastNode.nextNode = newNode;
      this.tail = newNode;
    }
  }

  printAll() {
    if (!this.head) {
      return 'No data stored!';
    } else if (!this.head.nextNode) {
      return this.head.data;
    }
    const data = [];
    let node = this.head;
    while (node.nextNode) {
      data.push(node.data);
      node = node.nextNode;
    }
    return data;
  }

  getNodeAt(position) {
    const length = this.length();
    if (position > length || position <= 0) {
      return 'Index out of range';
    }
    let count = 1;
    let node = this.head;
    while (node) {
      if (count === position) {
        break;
      } else {
        node = node.nextNode;
        count += 1;
      }
    }
    return node;
  }

  remove(position) {
    const length = this.length();
    if (position > length || position <= 0) {
      return 'Index out of range';
    }

    if (length === 1 && position === 1) {
      this.head = undefined;
      this.tail = undefined;
      return true;
    }
    let count = 2;
    let node = this.head.nextNode;
    let prevNode = this.head;
    while (node) {
      if (count === position) {
        if (node.nextNode) {
          const nextNode = node.nextNode;
          prevNode.nextNode = nextNode;
          nextNode.prevNode = prevNode;
        } else {
          prevNode.nextNode = undefined;
          this.tail = prevNode;
        }
        break;
      } else {
        prevNode = node;
        node = node.nextNode;
        count += 1;
      }
    }
    return 'Node remoded from DLL';
  }
}
