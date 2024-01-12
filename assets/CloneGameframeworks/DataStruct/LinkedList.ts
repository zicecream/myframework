class LinkedList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;
    length = 0;
  
    push(value: T) {
      const newNode = new LinkedListNode(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      this.length++;
    }
    
    pop() {
      if (!this.tail) return null;
      const value = this.tail.value;
      if (this.tail === this.head) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail!.next = null;
      }
      this.length--;
      return value;
    }
  
    unshift(value: T) {
      const newNode = new LinkedListNode(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      }
      this.length++;
    }
  
    shift() {
      if (!this.head) return null;
      const value = this.head.value;
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head!.prev = null;
      }
      this.length--;
      return value;
    }
  
    get(index: number) {
      if (index < 0 || index >= this.length) return null;
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.next;
      }
      return current!.value;
    }
  
    insert(value: T, index: number) {
      if (index < 0 || index > this.length) return false;
      if (index === 0) {
        this.unshift(value);
      } else if (index === this.length) {
        this.push(value);
      } else {
        const newNode = new LinkedListNode(value);
        const prev = this._get(index - 1);
        const next = prev.next;
        prev.next = newNode;
        newNode.prev = prev; 
        newNode.next = next;
        next!.prev = newNode;
        this.length++;
      }
      return true;
    }
  
    _get(index: number) {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.next;
      }
      return current!;
    }
  
    removeAt(index: number) {
      if (index < 0 || index >= this.length) return null;
      if (index === 0) return this.shift();
      if (index === this.length - 1) return this.pop();
      const prev = this._get(index - 1);
      const removed = prev.next;
      prev.next = removed!.next;
      removed!.next.prev = prev;
      this.length--;
      return removed!.value;
    }
  }