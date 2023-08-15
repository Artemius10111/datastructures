class TreeNode {
  val: number
  left: TreeNode|null
  right: TreeNode|null
  constructor(val?: number, left?: TreeNode|null, right?: TreeNode|null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right)
  }
}


class ListNode<T> {
  data: T|null;
  next: ListNode<T>|null;
  prev: ListNode<T>|null;
  constructor() {
    this.data = null;
    this.next = null;
    this.prev = null;
  }
};


class Queue2<T> {
  front: ListNode<T>|null;
  rear: ListNode<T>|null;
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enque(val: T): void {
    const newbie = new ListNode<T>();
    newbie.data = val;

    if (!this.front) {
      this.front = newbie;
      this.rear = newbie;
    } else {
      this.rear!.next = newbie;
      newbie.prev = this.rear;
      this.rear = newbie;
    }

    return;
  };

  deque(): T|null {
    if (this.front) {
      const popped = this.front;
      this.front = this.front.next;
      return popped.data;
    }
    return null;
  }

  display(): void {
    let curr = this.front;

    while (curr !== null) {
      curr = curr.next;
    }
    return;
  }

  isEmpty(): boolean {
    return !this.front || !this.rear;
  }
}


function serialize(root: TreeNode|null): string {
  if (!root) {
    return '';
  }

  const res: string[] = [];

  const q: (TreeNode | null)[] = [];
  q.push(root);

  while (q.length) {
    const node = q.shift();

    if (!node) {
      res.push('#');
    } else {
      res.push(node.val.toString());
      q.push(node.left);
      q.push(node.right);
    }
  }

  return res.join(',');
};


function deserialize(data: string): TreeNode|null {
  const q = new Queue2<TreeNode>();
  const parsedData = data.split(',');

  const rootVal = parseInt(parsedData.shift()!, 10);

  if (isNaN(rootVal)) {
    return null;
  }

  const root = new TreeNode(rootVal);
  q.enque(root);

  while (!q.isEmpty()) {
    let curr = q.deque();
    if (parsedData.length) {
      let leftVal: string|number = parsedData.shift()!;
      if (leftVal !== '#') {
        leftVal = parseInt(leftVal, 10);

        const leftChild = new TreeNode(leftVal);
        q.enque(leftChild);
        curr!.left = leftChild;
      } else {
        curr!.left = null;
      }
    }

    if (parsedData.length) {
      let rightVal: string|number = parsedData.shift()!;
      if (rightVal !== '#') {
        rightVal = parseInt(rightVal, 10);
        const rightChild = new TreeNode(rightVal);
        q.enque(rightChild);

        curr!.right = rightChild;
      } else {
        curr!.right = null;
      }
    }
  }

  return root;
}