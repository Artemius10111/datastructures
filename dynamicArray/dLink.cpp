#include <iostream>

class Node {

public:
  int data;
  Node *next;
  Node(int val) {
    this->data = val;
    this->next = nullptr;
  }
};

class dLink {
private:
  Node *root;

public:
  dLink() { this->root = nullptr; }

  void push(int val) {
    Node *curr = this->root;
    if (!curr) {
      this->root = new Node(val);
      return;
    }

    while (curr->next != nullptr) {
      curr = curr->next;
    }

    curr->next = new Node(val);
  }

  int pop() {
    if (this->root == nullptr) {
      return -1;
    }

    Node *curr = this->root;
    if (curr->next == nullptr) {
      int res = curr->data;
      delete curr;
      this->root = nullptr;
      return res;
    }

    while (curr->next->next != nullptr) {
      curr = curr->next;
    }

    int res = curr->next->data;
    delete curr->next;
    curr->next = nullptr;
    return res;
  }

  void display() {
    Node *curr = this->root;
    while (curr != nullptr) {
      std::cout << curr->data << '\n';
      curr = curr->next;
    }
  }

  ~dLink() {
    while (this->root != nullptr) {
      Node *temp = this->root;
      this->root = this->root->next;
      delete temp;
    }
  }
};

int main() {
  dLink d;
  d.push(1);
  d.push(2);
  d.push(3);
  d.push(4);

  d.display();

  return 0;
}
