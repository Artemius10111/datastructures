enum heapT {
  min = 'min',
  max = 'max'
}

class Heap {
  heapStack: (null|number)[];
  heapType: heapT;
  constructor(heapType: heapT) {
    this.heapType = heapType;
    this.heapStack = [null];
  }

  swap(aIndex: number, bIndex: number): void {
    [this.heapStack[aIndex], this.heapStack[bIndex]] =
        [this.heapStack[bIndex], this.heapStack[aIndex]];
  };

  heapify(vals: number[]): void {
    for (const val of vals) {
      this.add(val);
    }

    return;
  }

  getLength(): number {
    return this.heapStack.length - 1;
  };

  getElements(): number[] {
    return this.heapStack.slice(1) as number[];
  }

  add(val: number) {
    this.heapStack.push(val);
    let currentIndex = this.getLength();
    let parentIndex = Math.floor(currentIndex / 2);

    switch (this.heapType) {
      case (heapT.min): {
        while (currentIndex > 1 &&
               this.heapStack[currentIndex]! < this.heapStack[parentIndex]!) {
          this.swap(currentIndex, parentIndex);
          currentIndex = parentIndex;
          parentIndex = Math.floor(parentIndex / 2);
        }
        break;
      };
      case (heapT.max): {
        while (currentIndex > 1 &&
               this.heapStack[currentIndex]! > this.heapStack[parentIndex]!) {
          this.swap(currentIndex, parentIndex);
          currentIndex = parentIndex;
          parentIndex = Math.floor(parentIndex / 2);
        }
        break;
      }
    }
    return;
  }

  remove() {
    if (this.getLength() <= 1) {
      this.heapStack = [null];
      return;
    }

    const popedVal = this.heapStack.pop()!;
    this.heapStack[1] = popedVal;

    let currentIndex = 1;
    let leftIndex = currentIndex * 2;
    let rightIndex = currentIndex * 2 + 1;

    if (!this.heapStack[leftIndex]) {
      return;
    }

    if (!this.heapStack[rightIndex]) {
      switch (this.heapType) {
        case (heapT.min): {
          if (this.heapStack[currentIndex]! > this.heapStack[leftIndex]!) {
            this.swap(currentIndex, leftIndex);
          }
          break;
        };
        case (heapT.max): {
          if (this.heapStack[currentIndex]! < this.heapStack[leftIndex]!) {
            this.swap(currentIndex, leftIndex);
          }
          break;
        };
      }
      return;
    }

    switch (this.heapType) {
      case (heapT.min): {
        while (this.heapStack[currentIndex]! > this.heapStack[leftIndex]! ||
               this.heapStack[currentIndex]! > this.heapStack[rightIndex]!) {
          if (this.heapStack[leftIndex]! < this.heapStack[rightIndex]!) {
            this.swap(currentIndex, leftIndex);
          } else {
            this.swap(currentIndex, rightIndex);
          }
          currentIndex = leftIndex;
          leftIndex = currentIndex * 2;
          rightIndex = currentIndex * 2 + 1
        }
        break;
      }
      case (heapT.max): {
        while (this.heapStack[currentIndex]! < this.heapStack[leftIndex]! ||
               this.heapStack[currentIndex]! < this.heapStack[rightIndex]!) {
          if (this.heapStack[leftIndex]! > this.heapStack[rightIndex]!) {
            this.swap(currentIndex, leftIndex);
            currentIndex = leftIndex;
          } else {
            this.swap(currentIndex, rightIndex);
            currentIndex = rightIndex;
          }
          leftIndex = currentIndex * 2;
          rightIndex = currentIndex * 2 + 1
        }
        break;
      }
    }

    return;
  };
};