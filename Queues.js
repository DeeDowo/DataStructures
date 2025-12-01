// para queues, esta estructura sigue el patrón fifo
// es decir, el primero que entra es el primero en salir
// por ello requiere una estructura en donde agregar elementos por un lado 
// sea O(1) y removerlos del otro se igual O(1)
//
// usar un array en este caso sería ineficiente, la mejor solución 
// es una SLL


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
}
