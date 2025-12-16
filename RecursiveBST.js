// Recursive BST

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class RecursiveBST {
  constructor(...values) {
    this.root = null;
    if (values.length > 0) {
      for (const value of values) {
        this.insert(value);
      }
    }
  }

  recursiveContains(value, node = this.root) {
    if (!node) return false;
    if (node.value = value) return true;
    if (value > node.value) return this.recursiveContains(value, node.right);
    return this.recursiveContains(value, node.left);
  }

  #recursiveInsertP(value, node = this.root) {
    if (node === null) return new Node(value);

    if (node.value > value) {
      node.left = this.#recursiveInsertP(value, node.left);
    } else if (node.value < value) {
      node.right = this.#recursiveInsertP(value, node.right);
    }

    return node;
  }

  recursiveInsert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return this;
    }

    this.#recursiveInsertP(value);
    return this;
  }
}
