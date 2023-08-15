#include <stdio.h>
#include <stdlib.h>

struct dArr {
  int memSize;
  int size;
  int *stack;
};

void push(int val, struct dArr *A) {
  if ((*A).size == (*A).memSize) {
    (*A).memSize++;
    int *tempStack = (*A).stack;
    (*A).stack = (int *)malloc(sizeof(int) * (*A).memSize);
    for (int i = 0; i < (*A).size; i++) {
      (*A).stack[i] = tempStack[i];
    }
    free(tempStack);
  };
  (*A).stack[(*A).size] = val;
  (*A).size++;
};

int getByIndex(struct dArr *A) { return -1; }

void display(struct dArr *A) {
  printf("\n Values of array are \ni val \n");
  for (int i = 0; i < (*A).size; i++) {
    printf("%d %d\n", i, (*A).stack[i]);
  }
  printf("\n");
  return;
}

int pop(struct dArr *A) {
  if ((*A).size >= 1) {
    (*A).size--;
    int res = (*A).stack[sizeof((*A).stack) / sizeof((*A).stack[0])];
    (*A).stack[sizeof((*A).stack[0]) * (*A).size] = 0;
    return res;
  }
  (*A).stack = (int *)malloc(sizeof(int));
  return -1;
};
;

int main() {
  struct dArr *A = (struct dArr *)malloc(sizeof(struct dArr));
  (*A).size = 0;
  (*A).memSize = 1;
  (*A).stack = (int *)malloc(sizeof(int) * (*A).memSize);

  for (int i = 0; i < 1000; i++) {
    push(i * i * i, A);
  }
  for (int i = 0; i < 1000; i++) {
    pop(A);
  }

  display(A);
  printf("size attribute is %d", (*A).size);
  printf("memSize attribute is %d", (*A).memSize);

  return 1;
}
