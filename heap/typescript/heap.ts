enum tHeap {
    min = "min",
    max = "max"
}

class Heap {

    heapType: tHeap
    heapStack: (number | null)[]
    constructor(heapType: tHeap) {
        this.heapType = heapType;
        this.heapStack = [null];
    }

    getLength(): number {
        return this.heapStack.length - 1;
    }

    getFirst(): number {
        return this.heapStack[1] || -1;
    }

    heapify(nums: number[]): void {
        for (const num of nums) {
            this.add(num);
        }
        return;
    } 

    swap(aIndex: number, bIndex: number): void {
        [this.heapStack[aIndex], this.heapStack[bIndex]] = [this.heapStack[bIndex], this.heapStack[aIndex]];
        return;
    }

    add(num: number) {
        this.heapStack.push(num);
        let currentIndex = this.getLength();
        let parentIndex = Math.floor(currentIndex / 2);

        switch (this.heapType) {
            case tHeap.min: {
                while (currentIndex > 1 && this.heapStack[currentIndex]! < this.heapStack[parentIndex]!) {
                    this.swap(currentIndex, parentIndex);
                    currentIndex = parentIndex;
                    parentIndex = Math.floor(parentIndex / 2);
                }
                break;
            }
            case tHeap.max: {
                while (currentIndex > 1 && this.heapStack[currentIndex]! > this.heapStack[parentIndex]!) {
                    this.swap(currentIndex, parentIndex);
                    currentIndex = parentIndex;
                    parentIndex = Math.floor(parentIndex / 2);
                }
                break;
            }
        }

        return;
    }

    remove(): void {
        if (this.getLength() <= 1) {
            this.heapStack = [null];
            return;
        }

        const popedTop = this.heapStack.pop() as number;
        this.heapStack[1] = popedTop;

        let currentIndex = 1;
        let leftIndex = 2 * 1;
        let rightIndex = 2 * 1 + 1;

        if (this.heapStack[rightIndex] === undefined) {
            switch (this.heapType) {
                case tHeap.min: {
                    if (this.heapStack[currentIndex]! > this.heapStack[leftIndex]!) {
                        this.swap(currentIndex, leftIndex);
                        return;
                    }
                    break;
                }
                case tHeap.max: {
                    if (this.heapStack[currentIndex]! < this.heapStack[leftIndex]!) {
                        this.swap(currentIndex, leftIndex);
                        return;
                    }
                    break;
                }
            }
        }

        switch (this.heapType) {
            case tHeap.min: {
                while (this.heapStack[currentIndex]! > this.heapStack[leftIndex]! || this.heapStack[currentIndex]! > this.heapStack[rightIndex]!) {
                    if (this.heapStack[leftIndex]! < this.heapStack[rightIndex]!) {
                        this.swap(currentIndex, leftIndex);
                        currentIndex = leftIndex;
                    } else {
                        this.swap(currentIndex, rightIndex);
                        currentIndex = rightIndex;
                    }

                    leftIndex = currentIndex * 2;
                    rightIndex = currentIndex * 2 + 1;
                }
                break;
            }
            case tHeap.max: {
                while (this.heapStack[currentIndex]! < this.heapStack[leftIndex]! || this.heapStack[currentIndex]! < this.heapStack[rightIndex]!) {
                    if (this.heapStack[leftIndex]! > this.heapStack[rightIndex]!) {
                        this.swap(currentIndex, leftIndex);
                        currentIndex = leftIndex;
                    } else {
                        this.swap(currentIndex, rightIndex);
                        currentIndex = rightIndex;
                    }

                    leftIndex = currentIndex * 2;
                    rightIndex = currentIndex * 2 + 1;
                }
                break;
            }
        }

        return;
    }
}
