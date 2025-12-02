/**
 * STACK – LIFO (Last In, First Out)
 * 
 * ¿Cómo elegir la estructura subyacente?
 * → Necesitamos inserción y eliminación en O(1) en el mismo extremo (el "top").
 * 
 * Opciones viables:
 * 
 * 1. Array
 *    - push()  → O(1) amortizado
 *    - pop()   → O(1)
 * 
 * 2. Singly Linked List (con puntero al head/top)
 *    - push() → O(1)
 *    - pop()  O(1)
 * 
 * 3. Doubly Linked List
 *    - También O(1), pero innecesario: nunca usas el prev
 * 
 * STACK – LIFO
 * 
 * Complejidad:
 * ┌─────────────┬────────┐
 * │ Operación   │ Big O  │
 * ├─────────────┼────────┤
 * │ push()      │ O(1)   │
 * │ pop()       │ O(1)   │
 * │ peek()      │ O(1)   │
 * │ isEmpty()   │ O(1)   │
 * └─────────────┴────────┘
 */

// Implementación con SLL

class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class StackSLL {
  constructor(...values) {
    this.top = null;
    this.length = 0;

    if(values.length){
        for (const value of values) {
            this.push(value);
        }
    }
  }

  push(value) {
    const node = new Node(value);

    node.next = this.top;
    this.top = node;

    this.length++;
    return this;
  }

  pop() {
    if (!this.top) return undefined;

    let temp = this.top;

    this.top = this.top.next;
    temp.next = null;

    this.length--;
    return temp.value;
  }

    peek(){
        return this.top.value;
    }

    isEmpty(){
        return !this.length;
    }

    size(){
        return this.length;
    }
}

// Implementación usando un array

class Stack {
    constructor(...values){
        this.data = values.length ? values : [];    
    }
    
  push(value) {
    this.data.push(value);
    return this;
  }

  pop() {
    return this.data.length ? this.data.pop() : undefined;
  }

    peek(){
        return this.data.length ? this.data[this.data.length-1] : undefined;
    }

    isEmpty(){
        return !this.data.length;
    }

    size(){
        return this.data.length;
    }
}

// Ejercicios con Stackc 

// Ejercicio 1:
function sortStack(value) {

  let tempStack = new Stack();

  while (!value.isEmpty()) {
    let temp = value.pop();

    if (tempStack.isEmpty()) {
      tempStack.push(temp);
    } else {
      while (tempStack.peek() > temp && tempStack.peek() !== undefined) {
        value.push(tempStack.pop())
      }
      tempStack.push(temp);
    }
  }

  while (!tempStack.isEmpty()) {
    value.push(tempStack.pop());
  }

  return value;
}

// Ejercicio 2:
function reverseString(string) {
  let stringReversed = "";
  let stack = new Stack();

  for (const l of string) {
    stack.push(l);
  }
  for (let i = 0; i < string.length; i++) {
    stringReversed += stack.pop();
  }

  return stringReversed;
}

// Ejercicio 3:
function isBalancedParentheses(string) {
  let stack = new Stack();
  for (const l of string) {
    if (l === "(") {
      stack.push(l)
    } else {
      if (stack.isEmpty()) return false;
      stack.pop();
    }
  }

  return stack.isEmpty();
}
