class Node {
  constructor(value) {
    if (arguments.length === 0) {
      this.value = null;
      this.next = null;
    } else {
      this.value = value;
      this.next = null;
    }
  }
}

class Stack {
  constructor(value) {
    if (arguments.length === 0) {
      this.top = null;
      this.length = 0;
    } else {
      let nodo = new Node(value);
      this.top = nodo;
      this.length = 1;
    }
  }

  push(value) {
    if (arguments.length === 0) return;

    let nodo = new Node(value);
    nodo.next = this.top;
    this.top = nodo;

    this.length++;
    return this;
  }

  pop() {
    if (!this.top) return;

    let temp = this.top;

    this.top = this.top.next;
    temp.next = null;

    this.length--;
    return temp.value;
  }
}

// QUEUE

function reverseString(value) {
  let stack = new Stack(value[0]);
  for (let i = 1; i < value.length; i++) {
    stack.push(value[i]);
  }
  let output = "";
  for (let i = value.length; i > 0; i--) {
    output += stack.pop();
  }
  return output;
}
console.log(reverseString("Dowo"))
