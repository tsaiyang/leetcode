import * as util from "./util.js"

// 如何仅用递归函数和栈操作逆序一个栈
function getAndRemoveLastElement(stack) {
  const result = stack.pop()
  if (stack.length === 0) {
    return result
  }

  const last = getAndRemoveLastElement(stack)
  stack.push(result)
  return last
}

function reverseStack(stack) {
  if (stack.length < 1) {
    return
  }

  const last = getAndRemoveLastElement(stack)
  reverseStack(stack)
  stack.push(last)
}

// 生成窗口最大值数组
function getMaxWindow(arr, w) {}
