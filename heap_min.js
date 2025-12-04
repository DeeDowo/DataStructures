class MinHeapNo0 {
  #heap = [null];

  #parentIndex(childIndex) {
    return Math.floor(childIndex / 2);
  }
  #leftChildIndex(parentIndex) {
    return parentIndex * 2;
  }
  #rightChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }
  #swap(index1, index2) {
    let temp = this.#heap[index1];
    this.#heap[index1] = this.#heap[index2];
    this.#heap[index2] = temp;
  }

  get heap() {
    return [...this.#heap];
  }

  insert(value) {
    if (value === undefined || value === null) return;

    this.#heap.push(value);
    let insertedIndex = this.#heap.length - 1;
    let parentIndex = this.#parentIndex(insertedIndex);

    while (parentIndex > 0) {
      if (this.#heap[insertedIndex] < this.#heap[parentIndex]) {
        this.#swap(insertedIndex, parentIndex);
        insertedIndex = parentIndex;
        parentIndex = this.#parentIndex(insertedIndex);
      } else {
        break;
      }
    }

    return this.heap;
  }
}

class MinHeapWith0 {
  #heap = [];

  #parentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  #leftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }
  #rightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }
  #swap(index1, index2) {
    let temp = this.#heap[index1];
    this.#heap[index1] = this.#heap[index2];
    this.#heap[index2] = temp;
  }

  get heap() {
    return [...this.#heap];
  }

  insert(value) {
    if (value === undefined || value === null) return;

    this.#heap.push(value);
    let insertedIndex = this.#heap.length - 1;
    let parentIndex = this.#parentIndex(insertedIndex);

    while (parentIndex >= 0) {
      if (this.#heap[insertedIndex] < this.#heap[parentIndex]) {
        this.#swap(insertedIndex, parentIndex);
        insertedIndex = parentIndex;
        parentIndex = this.#parentIndex(insertedIndex);
      } else {
        break;
      }
    }
  }

}
