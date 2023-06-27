export class TreeNode {
  left
  right
  val

  constructor(left, right, val) {
    this.left = left
    this.right = right
    this.val = val
  }
}

export class ListNode {
  val
  next

  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}
