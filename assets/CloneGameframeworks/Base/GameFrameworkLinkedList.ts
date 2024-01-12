export class GameFrameworkLinkedList<T>
{
    private m_LinkedList:LinkedList<T>;
    private m_CachedNodes:Array<LinkedListNode<T>>;

    public GameFrameworkLinkedList()
    {
        this.m_LinkedList = new LinkedList<T>();
        this.m_CachedNodes = new Array<LinkedListNode<T>>();
    }

    public Count():number{
        return this.m_LinkedList.length;
    }

    public CacheNodeCount():number{
        return this.m_CachedNodes.length;
    }

    public First():LinkedListNode<T>{
        return this.m_LinkedList.head;
    }

    public Last():LinkedListNode<T>{
        return this.m_LinkedList.tail;
    }

    public AddAfter(node:LinkedListNode<T>,value:T):LinkedListNode<T>{
        return {} as LinkedListNode<T>;
    }

    private  AcquireNode(value:T):LinkedListNode<T>
    {
        let node:LinkedListNode<T>  = null;
        if (this.m_CachedNodes.length > 0)
        {
            node = this.m_CachedNodes.pop();
            node.value = value;
        }
        else
        {
            node = new LinkedListNode<T>(value);
        }

        return node;
    }
}