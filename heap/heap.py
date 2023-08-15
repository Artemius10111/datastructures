class t_heap:
    MAX_HEAP_STRING = 'max'
    MIN_HEAP_STRING = 'min'

class Heap:

    def __init__(self, heap_type: t_heap.MAX_HEAP_STRING or t_heap.MIN_HEAP_STRING) -> None:
        self.heap_stack: [None or int] = [None]
        self.heap_type: t_heap.MAX_HEAP_STRING or t_heap.MIN_HEAP_STRING = heap_type

    def get_len(self) -> int:
        return len(self.heap_stack) - 1

    def get_first(self) -> int:
        return self.heap_stack[1] if self.get_len() != 0 else -1

    def __swap(self, a_index: int, b_index: int) -> int:
        self.heap_stack[a_index], self.heap_stack[b_index] = self.heap_stack[b_index], self.heap_stack[a_index]
        return None

    def add(self, num: int) -> None:
        self.heap_stack.append(num)

        currentIndex = self.get_len()
        parentIndex = currentIndex // 2

        try:
            match self.heap_type:
                case t_heap.MIN_HEAP_STRING: 
                    while (all([currentIndex > 1, self.heap_stack[currentIndex] < self.heap_stack[parentIndex]])):
                        self.__swap(currentIndex, parentIndex)
                        currentIndex = parentIndex
                        parentIndex = currentIndex // 2
                    return None
                case t_heap.MAX_HEAP_STRING:
                    while (all([currentIndex > 1, self.heap_stack[currentIndex] > self.heap_stack[parentIndex]])):
                        self.__swap(currentIndex, parentIndex)
                        currentIndex = parentIndex
                        parentIndex = currentIndex // 2
                    return None
                case _:
                    return None
        except TypeError:
            return None
                    

    def remove(self) -> None:
        if self.get_len() <= 1:
            self.heap_stack = [None]
            return None
        
        poped_top = self.heap_stack.pop()
        self.heap_stack[1] = poped_top

        current_index = 1
        left_index = 2 * 1
        right_index = 2 * 1 + 1

        try:
            self.heap_stack[left_index]
        except IndexError:
            return None

        try:
            if (self.heap_stack[right_index] == None):
                match self.heap_type:
                    case t_heap.MIN_HEAP_STRING:
                        if (self.heap_stack[current_index] > self.heap_stack[left_index]):
                            self.__swap(current_index, left_index)
                            return None
                    case t_heap.MAX_HEAP_STRING:
                        if (self.heap_stack[current_index] < self.heap_stack[left_index]):
                            self.__swap(current_index, left_index)
                            return None
                    case _:
                        return None
        except IndexError:
            return None

        try:
            match self.heap_type:
                case t_heap.MIN_HEAP_STRING:
                    while (any([self.heap_stack[current_index] > self.heap_stack[left_index], self.heap_stack[current_index] > self.heap_stack[right_index]])):
                        if (self.heap_stack[left_index] < self.heap_stack[right_index]):
                            self.__swap(current_index, left_index)
                            current_index = left_index
                        else:
                            self.__swap(current_index, right_index)
                            current_index = right_index
                        left_index = current_index * 2
                        right_index = current_index * 2 + 1
                case t_heap.MAX_HEAP_STRING:
                    while (any([self.heap_stack[current_index] < self.heap_stack[left_index], self.heap_stack[current_index] < self.heap_stack[right_index]])):
                        if (self.heap_stack[left_index] > self.heap_stack[right_index]):
                            self.__swap(current_index, left_index)
                            current_index = left_index
                        else:
                            self.__swap(current_index, right_index)
                            current_index = right_index
                        left_index = current_index * 2
                        right_index = current_index * 2 + 1

                case _:
                    return None
        except (IndexError, TypeError):
            return None 

    def heapify(self, nums: [int]) -> None:
        for num in nums:
            self.add(num)
        return