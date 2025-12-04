// Un heap es en esencia un binary tree representado con un array. 
// No es un árbol completamente ordenado: solo mantiene la "propiedad de heap":
//  - En un max-heap, cada elemento a partir de la raíz es mayor o igual que sus hijos.
//  - En un min-heap, cada elemento a partir de la raíz es menor o igual que sus hijos.
//
// Se usa un array en lugar de nodos.
//
// max-heap -> el mayor valor está en la raíz
// min-heap -> el menor valor está en la raíz
//
// Los hijos pueden ser menores, mayores o iguales al padre (según el tipo de heap).
//
// Un heap siempre es "complete", es decir, se llena nivel por nivel, de izquierda a derecha,
// sin dejar huecos.
//
// Fórmulas de índices (ignorando el índice 0):
//   leftChild  = 2 * parentIndex
//   rightChild = 2 * parentIndex + 1
//
// Fórmulas de índices (usando un array desde 0):
//   leftChild  = 2 * parentIndex + 1
//   rightChild = 2 * parentIndex + 2
//
// Padre (ignorando index 0):
//   parentIndex = Math.floor(childIndex / 2)
//
// Padre (usando un array desde 0):
//   parentIndex = Math.floor((childIndex - 1) / 2)
//
// Para insertar un valor, se coloca al final del array y luego se "bubble up":
// Se compara con su padre y si viola la propiedad de heap, se intercambian.
// Esto continúa hasta que quede en la posición correcta.

// dejando el index 0 vacio

class MaxHeapNo0 {
  #heap = [null];

  get heap() {
    return [...this.#heap];
  }

  #leftChild(parentIndex) {
    return parentIndex * 2;
  }

  #rightChild(parentIndex) {
    return parentIndex * 2 + 1;
  }

  #parent(childIndex) {
    return Math.floor(childIndex / 2)
  }

  #swap(index1, index2) {
    let temp = this.#heap[index1];
    this.#heap[index1] = this.#heap[index2];
    this.#heap[index2] = temp;
  }

  insert(value) {
    this.#heap.push(value);
    let insertedIndex = this.#heap.length - 1;
    let parentIndex = this.#parent(insertedIndex);

    while (parentIndex > 0) {
      if (this.#heap[parentIndex] < this.#heap[insertedIndex]) {
        this.#swap(insertedIndex, parentIndex);
        insertedIndex = parentIndex;
        parentIndex = this.#parent(insertedIndex);
      } else {
        break;
      }
    }
    return this.heap;
  }
}

class MaxHeapWith0 {
  #heap = [];

  get heap() {
    return [...this.#heap];
  }

  #leftChild(parentIndex) {
    return parentIndex * 2 + 1;
  }

  #rightChild(parentIndex) {
    return parentIndex * 2 + 2;
  }

  #parent(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  #swap(index1, index2) {
    let temp = this.#heap[index1];
    this.#heap[index1] = this.#heap[index2];
    this.#heap[index2] = temp;
  }

  insert(value) {
    this.#heap.push(value);
    let current = this.#heap.length - 1;
    let parentIndex = this.#parent(current);

    while (current > 0 && this.#heap[current] > this.#heap[this.#parent(current)]) {
        this.#swap(current, this.#parent(current));
        current = this.#parent(current);
    }
  }

    #sinkDown(index){
        let maxIndex = index;
        let size = this.#heap.length;

        while (true) {
            let left = this.#leftChild(maxIndex);
            let right = this.#rightChild(maxIndex);

            if (right < size || left < size ) {
                let max = null;
                max = this.#heap[left] > this.#heap[right] ? left : right;
                maxIndex = this.#heap[max] > this.#heap[maxIndex] ? max : maxIndex;
            }

            if(maxIndex !== index){
                this.#swap(maxIndex, index);
                index = maxIndex;
            }else{
                return;
            }
        }
    }

    remove(){
        if(this.#heap.length === 0) return null;
        if(this.#heap.length === 1) return this.#heap.pop();

        let max = this.#haap[0];
        this.#heap[0] = this.#heap.pop();
        this.#sinkDown(0);

        return max;
    }
  
}

