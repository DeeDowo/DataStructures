/**
 * Singly Linked List - Complejidad y características clave
 * 
 * Ventajas sobre arrays:
 *  - Inserción/eliminación al inicio → O(1)
 *  - No hay redimensión (resize)
 *  - Memoria no contigua → mejor en ciertos casos de fragmentación
 * 
 * Desventajas:
 *  - Acceso por índice → O(n)
 *  - Pop (eliminar al final) → O(n)  ← porque no tenemos puntero al penúltimo
 *  - Más uso de memoria por punteros
 * 
 * Complejidad (Singly Linked List con head + tail):
 * ┌─────────────────────┬──────────┐
 * │ Operación           │ Big O    │
 * ├─────────────────────┼──────────┤
 * │ push()     (final)  │ O(1)     │
 * │ pop()      (final)  │ O(n)     │  ← requiere recorrer
 * │ unshift()  (inicio) │ O(1)     │
 * │ shift()    (inicio) │ O(1)     │
 * │ get(index)          │ O(n)     │
 * │ insert/delete medio │ O(n)     │
 * └─────────────────────┴──────────┘
 * 
 * Estructura de un nodo:
 * { value: any, next: Node | null }
 * 
 * head → primer nodo
 * tail → último nodo (su .next = null)
 */

let nodoEjemplo = {
    value: 2,
    next: null,
}

let nodoEjemplo2 = {
    value: 3,
    next: nodoEjemplo,
}

// Implementación de la clase Node

class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

// Implementación de la clase LinkedList

class LinkedList{
    constructor(...values){
        this.head = this.tail = null;
        this.length = 0;

        if(values.length > 0) {
            for (const value of values) {
                this.push(value);
            }
        }
    }

    push(value){
        const node = new Node(value);

        if(!this.head){
            this.head = this.tail = node;
        }else{
            this.tail.next = node; 
            this.tail = node;
        }

        this.length++;

        return this;
    }

    pop(){
        if(!this.head) return;

        if(this.length === 1) {
            const lastNode = this.head;
            this.head = this.tail = null;
            
            this.length = 0;
            return lastNode;
        }

        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        const lastNode = current.next;
        this.tail = current;
        current.next = null;

        this.length--;
        return lastNode;
    }

    shift(){
        if(!this.head) return;

        if (this.length === 1) {
            const firstNode = this.head;
            this.head = this.tail = null;

            this.length = 0;
            return firstNode;
        }

        let firstNode = this.head;
        this.head = this.head.next;
        firstNode.next = null;
        
        this.length--;
        return firstNode;
    }

    unshift(value){
        const node = new Node(value);

        if(!this.head){
            this.head = this.tail = node;
            this.length++;

            return this;
        }
        
        node.next = this.head;
        this.head = node;
        this.length++;
        return this;
    }

    get(index){
        if(index < 0 || index >= this.length) return;

        let temp = this.head;
        for(let i = 0; i < index; i++){
            temp = temp.next;
        }
        return temp;
    }

    set(index, value){
        let temp = this.get(index);

        if(temp){
            temp.value = value;
            return true;
        }
        return false;
    }

    insertAt(index, value){
        if(index < 0 || index > this.length) return;

        if(index === this.length) return this.push(value);
        if(index === 0) return this.unshift(value);

        const target = new Node(value);

        let preTarget = this.get(index-1);
        let nextTarget = preTarget.next;
        
        preTarget.next = target;
        target.next = nextTarget;
        
        this.length++;
        return this;
    }

    removeAt(index){
        if(index < 0 || index >= this.length) return;

        if(index === this.length-1) return this.pop();
        if(index === 0) return this.shift();

        let preTarget = this.get(index-1);
        let target = preTarget.next;
        preTarget.next = target.next;

        target.next = null;
        this.length--;
        return target;
    }

    reverse(){
        if(!this.head) return;
        if(this.length === 1) return this;

        let temp = this.head;
        this.head = this.tail;
        this.tail = temp;

        let pre = null;
        let next = null;

        while(temp){
            next = temp.next;
            temp.next = pre;
            pre = temp;
            temp = next;
        }
        return this;
    }

    middleNode(){
        if(!this.head) return;
        if(this.length === 1) return this.head;

        let slow = this.head;
        let fast = this.head;

        while(fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    hasLoop(){
        if(!this.head) return false;

        let slow = this.head;
        let fast = this.head;

        while(fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;
            if(slow === fast){
                return true;
            }
        }
        return false;
    }

    nthFromEnd(n){
        if(!this.head) return;
        if(n <= 0 || n > this.length) return;

        let target = this.head;
        let end = this.head;

        for(let i = 1; i < n; i++){
            if(!end.next) return;
            end = end.next;
        }
        while(end.next){
            target = target.next;
            end = end.next;
        }
        return target;
    }

    findDuplicatesLoop(){
        if(!this.head) return;
       let current = this.head;

       while(current && current.next){
           let runner = current; 

           while(runner.next){ 
               if(current.value === runner.next.value) {
                   runner.next = runner.next.next; 
                   this.length--;
               }else{
                   runner = runner.next;
               }
           }
           current = current.next;
       }
        return this;
    }

    binary(){
        if(!this.head) return;

        let current = this.head;
        let total = 0;
        while(current){
            total *= 2;
            if(current.value === 1) {
                total += 1;
            }
            current = current.next;
        }
        return total;
    }

    partitionList(value){
        if(!this.head) return;

        let menor = new Node(0);
        let mayor = new Node(0);
        let menorFin = menor;
        let mayorFin = mayor;

        let current = this.head;
        while(current){
            if(current.value < value){
                menorFin.next = new Node(current.value);
                menorFin = menorFin.next;
            }else{
                mayorFin.next = new Node(current.value);
                mayorFin = mayorFin.next;
            }
            current = current.next;
        }
        menorFin.next = mayor.next;
        this.head = menor.next;
        this.tail = mayorFin;

        return this;
    }

    reverseBetween(start, end){
        if(start > end) return;
        if(start < 0 || end >= this.length) return;

        let times = end - start;
        let preHead = new Node(0);
        preHead.next = this.head;

        let pre = preHead;
        let current = this.head;

        for(let i = 0; i < start; i++){
            pre = pre.next;
            current = current.next;
        }

        for(let i = 0; i < times; i++){
            let nextCurrent = current.next;

            current.next = nextCurrent.next;
            nextCurrent.next = pre.next;
            pre.next = nextCurrent;

        }
        this.head = preHead.next;
        return this;
    }

    swapPairs(){
        if(this.length === 0) return;
        if(this.length === 1) return this;
        let temp = this.head;
        this.head = this.head.next;
        let current = temp.next;

        while(true){
            let nextPair = current.next;
            current.next = temp;

            if(!nextPair || !nextPair.next){
                temp.next = nextPair;
                break;
            }

            temp.next = nextPair.next;
            temp = nextPair;
            current = temp.next;
        }
        return this;
    }
}
