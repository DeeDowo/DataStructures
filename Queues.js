/**
 * QUEUE – FIFO (First In, First Out)
 *
 * Características clave:
 *  • El primer elemento en entrar es el primero en salir
 *  • Operaciones principales en extremos opuestos: enqueue (final) - dequeue (inicio)
 *
 * Complejidad con Singly Linked List:
 * ┌─────────────┬────────┬────────────────────────────────────────┐
 * │ Operación   │ Big O  │                  Notas                 │
 * ├─────────────┼────────┼────────────────────────────────────────┤
 * │ enqueue()   │ O(1)   │ gracias al puntero tail                │
 * │ dequeue()   │ O(1)   │ solo movemos el puntero first          │
 * │ peek()      │ O(1)   │ acceso directo al primer elemento      │
 * │ isEmpty()   │ O(1)   │                                        │
 * │ size()      │ O(1)   │ contador mantenido                     │
 * └─────────────┴────────┴────────────────────────────────────────┘
 *
 * Comparativa de implementaciones más comunes:
 *
 * -. Array + shift() / unshift()
 *    → dequeue o enqueue al inicio → O(n) 
 */

class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(...values){
        this.first = null;
        this.last = null;
        this.length = 0;

        if(values.length){
            for (const value of values) {
                this.enqueue(value);
            }
        }
    }

    enqueue(value){
        const node = new Node(value);

        if(!this.first){
            this.first = node;
            this.last = node;

            this.length++;
            return this;
        }

        this.last.next = node;
        this.last = node;
        this.length++;
        return this;
    }

    dequeue(){
        if(!this.first) return;

        if(this.length === 1){
            let first = this.first;
            this.first = null;
            this.last = null;

            this.length = 0;
            return first.value;
        }
        
        let first = this.first;
        this.first = this.first.next;
        first.next = null;
        this.length--;

        return first.value;
    }

    peek(){
        return this.first ? this.first.value : undefined;
    }

    isEmpty(){
        return !this.length;
    }

    size(){
        return this.length;
    }
}

