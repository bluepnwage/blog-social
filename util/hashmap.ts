import { MantineColor } from "@mantine/core";
import { Topics, Data } from "@interfaces/blogs";

class Nodes {
  data: Data;
  next: null | Nodes;
  constructor(data: Data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: Nodes | null;
  constructor() {
    this.head = null;
  }
  addToHead(data: Data) {
    const currentHead = this.head;
    const nextHead = new Nodes(data);
    if (currentHead) nextHead.next = currentHead;
    this.head = nextHead;
  }
  addToTail(data: Data) {
    const nextTail = new Nodes(data);
    let currentNode = this.head;
    if (!this.head) {
      this.head = nextTail;
    } else {
      while (currentNode) {
        if (!currentNode.next) {
          break;
        }
        currentNode = currentNode.next;
      }
      currentNode.next = nextTail;
    }
  }
}

class HashMap {
  map: LinkedList[];
  constructor(maxSize = 7) {
    this.map = new Array(maxSize).fill(null).map(() => new LinkedList());
  }
  hash(input: string) {
    let hashCode = 0;
    for (let i = 0; i < input.length; i++) {
      hashCode += hashCode + input.charCodeAt(i);
    }
    return hashCode % this.map.length;
  }
  assign(key: Topics, value: MantineColor) {
    const arrayIndex = this.hash(key);
    const list = this.map[arrayIndex];
    if (!list.head) {
      list.addToHead({ value, key });
    } else {
      const nextNode = new Nodes({ value, key });
      let currentNode = list.head;
      while (currentNode.next) {
        if (currentNode.data.value === value) {
          currentNode.data.value = value;
          break;
        }
        currentNode = currentNode.next;
      }
      currentNode.next = nextNode;
      return nextNode;
    }
  }
  retrieve(key: Topics): MantineColor {
    const arrayIndex = this.hash(key);
    let current = this.map[arrayIndex].head;
    while (current) {
      if (current.data.key === key) {
        return current.data.value;
      }
      current = current.next;
    }
    return "dark";
  }
}

const colors = new HashMap();
colors.assign("education", "green");
colors.assign("technology", "blue");
colors.assign("sports", "orange");
colors.assign("fashion", "cyan");
colors.assign("art", "yellow");
colors.assign("business", "grape");
colors.assign("entertainment", "pink");
export default colors;
