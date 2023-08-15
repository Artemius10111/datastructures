#include <iostream>
#include <stdio.h>
#include <stdlib.h>

class dArr {
private:
  int memSize;
  int size;
  int *stack;

public:
  dArr() {
    this->memSize = 1;
    this->size = 0;
    this->stack = new int[this->memSize];
  }

  void display() {
    for (int i = 0; i < this->size; i++) {
      std::cout << this->stack[i] << std::endl;
    }
  }

  void push(int val) {
    if (this->size == this->memSize) {
      this->memSize++;
      int *tempStack = new int[this->memSize];
      for (int i = 0; i < this->size; i++) {
        tempStack[i] = this->stack[i];
      }
      delete[] this->stack;
      this->stack = tempStack;
    }
    this->stack[this->size] = val;
    this->size++;
  }

  int pop() {
    if (this->size >= 1) {
      this->size--;
      int res = this->stack[this->size];
      this->stack[this->size] = 0;
      return res;
    }
    return -1;
  }

  ~dArr() { delete[] this->stack; }
};

int main() {
  dArr d;
  for (int i = 0; i < 1000; i++) {
    d.push(i);
  }

  d.display();
  return 0;
}
