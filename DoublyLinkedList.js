// la diferencia esencial entre una linked list y una doubly es que la doubly tiene un puntero a pre, es decir,
// un puntero al nodo previo

class Node{
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList{
    constructor(...values){
        this.head = this.tail = null;
        this.length = 0;

        if(values.length > 0){
            for (const value of values) {
                this.push(value);
            }
        }
    }

    push(value){
        let node = new Node(value);

        if(!this.head){
            this.head = this.tail = node;
            this.length ++;
            return this;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;

        this.length++;
        return this;
    }

    pop(){
        if(!this.head) return;

        if(this.length === 1){
            const lastNode = this.tail;
            this.head = null;
            this.tail = null;

            this.length = 0;
            return lastNode;
        }

        const lastNode = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        lastNode.prev = null;

        this.length--;
        return lastNode;
    }

    unshift(value){
        let node = new Node(value);

        if(!this.head){ 
            this.head = node;
            this.tail = node;

            this.length++;
            return this;
        }
        
        this.head.prev = node;
        node.next = this.head;
        this.head = node;

        this.length++;
        return this;
    }

    shift(){
        if(!this.head) return;

        if(this.length === 1){
            let firstNode = this.head;
            this.head = null;
            this.tail = null;

            this.length = 0;
            return firstNode;
        }

        let firstNode = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        firstNode.next = null;
        
        this.length--;
        return firstNode;
    }

    get(index){
        if(index < 0 || index >= this.length) return undefined;

        if(index < this.length/2){
            let target = this.head;
            for(let i = 0; i < index; i++){
                target = target.next;
            }

            return target;
        }else{
            let target = this.tail;
            for(let i = this.length-1; i > index; i--){
                target = target.prev;
            }

            return target;
        }
    }

    set(index, value){
        if(index < 0 || index >= this.length) return false;

        let target = this.get(index);
        target.value = value;
        return true;
    }

    insertAt(index, value){
        if(index < 0 || index > this.length) return;
        if(index === 0) return this.unshift(value);
        if(index === this.length) return this.push(value);

        let preTarget = this.get(index-1);
        let nextTarget = preTarget.next;
        
        let node = new Node(value);
        node.prev = preTarget;
        node.next = nextTarget;

        nextTarget.prev = node;
        preTarget.next = node;

        this.length++;
        return this;
    }

    removeAt(index){
        if(index < 0 || index >= this.length) return;
        if(index === 0) return this.shift();
        if(index === this.length-1) return this.pop();

        let preTarget = this.get(index - 1);
        let target = preTarget.next;
        let nextTarget = target.next;

        preTarget.next = nextTarget;
        nextTarget.prev = preTarget;
        target.next = target.prev = null;

        this.length--;
        return target;
    }

    isPalindrome(){
        if(!this.head) return false;
        if(this.length === 1) return true;

        let times = Math.floor(this.length/2);
        let start = this.head;
        let end = this.tail;

        for(let i = 0; i < times; i++){
            if(start.value !== end.value) return false;
            start = start.next;
            end = end.prev;
        }
        return true;
    }

    reverse(){
        if(!this.head) return undefined;
        if(this.length === 1) return this;

        let temp = null;
        let current = this.head;

        while(current){
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        return this;
    }

    partitionList(value){
        if(!this.head) return;
        if(this.length === 1) return this;

        let lessHead = new Node();
        let lessTail = lessHead;

        let greatHead = new Node();
        let greatTail = greatHead;

        let current = this.head;

        while(current){
            if(current.value < value){
                lessTail.next = current;
                current.prev = lessTail;
                lessTail = current;
            }else{
                greatTail.next = current;
                current.prev = greatTail;
                greatTail = current;
            }
            current = current.next;
        }
        lessTail.next = greatHead.next;
        if (greatHead.next) {
            greatHead.next.prev = lessTail;
        }
        greatTail.next = null;

        this.head = lessHead.next ? lessHead.next : greatHead.next;
        this.tail = greatHead.next ? greatTail : lessTail;

        if (this.head.prev) this.head.prev = null;
        return this;
    }

    reverseBetween(start, end){
        if(!this.head) return;
        if(this.length <= 1) return;
        if(start >= this.length || end >= this.length) return;
        if(start < 0 || end < 0) return;
        if(start >= end) return;    

        let times = end - start;

        let dummyPre = new Node();
        dummyPre.next = this.head;

        let previous = dummyPre;
        for(let i = 0; i < start; i++){
            previous = previous.next;
        }

        let current = previous.next;
        let toMove = previous.next.next;

        for(let i = 0; i < times; i++){
            current.next = toMove.next;
            if(toMove.next) toMove.next.prev = current;

            toMove.next = previous.next;
            toMove.prev = previous;

            previous.next.prev = toMove;
            previous.next = toMove;

            toMove = current.next;
            if(!current.next) this.tail = current;
        }

        this.head = dummyPre.next;
        this.head.prev = null;
    
        return this;
    }

    swapPairs(){
        if(!this.head) return this;
        if(this.length === 1) return this;

        let pre = new Node();
        pre.next = this.head;
        this.head.prev = pre;
        
        let first = this.head;
        let second = first.next;

        while(true){
            let temp = second.next;
            second.next = first;
            second.prev = first.prev;

            first.prev.next = second;
            first.next = temp;
            if(temp !== null) temp.prev = first;
            first.prev = second;

            if(!first.next || !first.next.next) {
                break;
            }else{
                first = first.next;
                second = first.next;
            }
        }
        this.head = dummy.next;
        this.head.prev = null;
        return this;
    }

    print(){
        let datos = `head: ${this.head.value} \ntail: ${this.tail.value} \nlength: ${this.length}`;
        let lista = ``;
        let nodo = new Node(0);
        nodo.next = this.head;
        for (let index = 0; index < this.length; index++) {
            lista += `nodo ${index + 1}: ${nodo.next.value}\n`;
            nodo = nodo.next;
        }
        nodo.next = null;
        return `${datos}\n\n${lista}`;
    }
}
