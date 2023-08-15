#include <iostream>

template <typename T> class Node {
public:
  T data;
  Node<T> *next;
  Node() : next(nullptr) {}
};

template <typename T> class Queue {
public:
  Node<T> *longest;
  Node<T> *newest;

  Queue() {
    this->longest = nullptr;
    this->newest = nullptr;
  }

  void insert(T val) {
    Node<T> *newNode = new Node<T>;
    newNode->data = val;

    if (this->longest == nullptr) {
      this->longest = newNode;
      this->newest = newNode;
    } else {
      this->newest->next = newNode;
      this->newest = newNode;
    }
  }

  void display() {
    Node<T> *curr = this->longest;

    while (curr != nullptr) {
      std::cout << curr->data << '\n';
      curr = curr->next;
    };

    return;
  }

  // FIFO
  T pop() {
    if (this->longest) {
      T val = this->longest->data;
      this->longest = this->longest->next;
      return val;
    }
    return T();
  };
};

int main() {

  Queue<int> *q = new Queue<int>;
  q->insert(2);
  q->insert(3);
  q->insert(4);
  q->insert(5);
  q->display();
  q->pop();
  return 1;
}