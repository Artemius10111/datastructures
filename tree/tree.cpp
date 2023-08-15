#include <iostream>
#include <vector>

template <typename T> class Tree {
public:
  T data;
  Tree<T> *left;
  Tree<T> *right;

  Tree() : data(T()), left(nullptr), right(nullptr) {}

  ~Tree() {
    delete left;
    delete right;
  }
};

template <typename T> class Node {
public:
  T data;
  Node<T> *next;
  Node<T> *prev;
};

template <typename T> class Queue {
public:
  Node<T> *front;
  Node<T> *rear;

  Queue() : front(nullptr), rear(nullptr) {}

  ~Queue() {
    Node<T> *curr = front;
    while (curr) {
      Node<T> *nextNode = curr->next;
      delete curr;
      curr = nextNode;
    }
  }

  void enqueue(T val) {
    Node<T> *newbie = new Node<T>;
    newbie->data = val;
    newbie->next = nullptr;
    newbie->prev = nullptr;
    if (this->front == nullptr) {
      this->front = newbie;
      this->rear = newbie;
    } else {
      this->rear->next = newbie;
      newbie->prev = this->rear;
      this->rear = newbie;
    }
  }

  T dequeue() {
    if (this->front) {
      T val = this->front->data;
      Node<T> *temp = this->front;
      this->front = this->front->next;
      if (this->front) {
        this->front->prev = nullptr;
      } else {
        this->rear = nullptr;
      }
      delete temp;
      return val;
    }
    return T();
  }

  bool isEmpty() { return (this->front == nullptr && this->rear == nullptr); }
};

template <typename T> Tree<T> *generateTree() {
  std::vector<int> arr1 = {1, 2, 3, -1, -1, 4, 5};

  int val = arr1.front();
  arr1.erase(arr1.begin());

  Queue<Tree<T> *> *treeQ = new Queue<Tree<T> *>;
  Tree<T> *root = new Tree<T>;

  root->data = val;
  root->left = nullptr;
  root->right = nullptr;
  treeQ->enqueue(root);
  while (!treeQ->isEmpty()) {
    Tree<T> *node = treeQ->dequeue();

    if (!arr1.empty()) {
      int popedLeftVal = arr1.front();
      arr1.erase(arr1.begin());       

      if (popedLeftVal != -1) {
        Tree<T> *leftNode = new Tree<T>;
        leftNode->data = popedLeftVal;
        leftNode->left = nullptr;
        leftNode->right = nullptr;
        treeQ->enqueue(leftNode);
        node->left = leftNode;
      }
    }

    if (!arr1.empty()) {
      int popedRightVal = arr1.front(); 
      arr1.erase(arr1.begin());

      if (popedRightVal != -1) {
        Tree<T> *rightNode = new Tree<T>;
        rightNode->data = popedRightVal;
        rightNode->left = nullptr;
        rightNode->right = nullptr;
        treeQ->enqueue(rightNode);
        node->right = rightNode;
      }
    }
  }

  delete treeQ;
  return root;
}

template <typename T> void traversal(Tree<T> *root) {
  if (root == nullptr) {
    std::cout << "null" << '\n';
    return;
  }

  std::cout << root->data << '\n';
  traversal(root->left);
  traversal(root->right);
}

int main() {
  Tree<int> *root = generateTree<int>();
  traversal(root);
  delete root;
  return 0;
}
