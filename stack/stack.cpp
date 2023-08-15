#include <iostream>

template <typename T> class Node {
public:
  T data;
  Node<T> *next;

  Node() {
    this->data = T();
    this->next = nullptr;
  }

  ~Node() { delete this->next; }
};

template <typename T> class Stack {
public:
  Node<T> *root;
  Stack(T defaultVal) {
    this->root = new Node<T>;
    this->root->data = defaultVal;
  }

  void insert(T val) {
    Node<T> *newNode = new Node<T>;
    newNode->data = val;
    newNode->next = this->root;
    this->root = newNode;
  }

  T pop() {
    T poppedVal = this->root->data;
    Node<T> *temp = this->root;
    this->root = this->root->next;
    temp->next = nullptr;
    delete temp;
    return poppedVal;
  }

  void display() {
    Node<T> *curr = this->root;
    while (curr != nullptr) {
      std::cout << curr->data << '\n';
      curr = curr->next;
    }
  }
};

int main() {
  Stack<int> *s = new Stack<int>(1);

  s->insert(2);
  s->insert(5);
  s->insert(4);
  s->insert(3);

  s->display();
  s->pop();

  delete s;

  return 0;
}
