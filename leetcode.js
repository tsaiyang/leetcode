import { ListNode, TreeNode } from "./util.js"
// 1. 两数之和
const twoSum = function (nums, target) {
  let numMap = new Map()
  for (let i = 0; i < nums.length; i++) {
    const index = numMap.get(target - nums[i])
    if (index) {
      return [i, index]
    }
    numMap.set(nums[i], i)
  }
  return [-1, -1]
}

// 2. 两数相加
const addTwoNumbers = function (l1, l2) {
  let flag = 0,
    n1 = 0,
    n2 = 0
  let dummyNode = new ListNode()
  let cur = dummyNode

  while (l1 || l2 || flag) {
    n1 = l1 ? l1.val : 0
    n2 = l2 ? l2.val : 0

    cur.next = new ListNode((n1 + n2 + flag) % 10)
    cur = cur.next
    flag = Math.floor((n1 + n2 + flag) / 10)

    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }

  return dummyNode.next
}

// 3. 无重复字符的最长子串
const lengthOfLongestSubstring = function (s) {
  let maxLen = 0,
    slow = 0,
    fast = 0
  let charMap = new Array(256)

  while (fast < s.length) {
    if (!charMap[s[fast]]) {
      charMap[s[fast++]] = true
    } else {
      maxLen = Math.max(maxLen, fast - slow)
      while (s[slow] !== s[fast]) {
        charMap[s[slow++]] = true
      }
      charMap[s[slow++]] = true
    }
  }

  maxLen = Math.max(maxLen, fast - slow)
  return maxLen
}

// 15. 三数之和
const threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let res = []
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      let l = i + 1
      let r = nums.length - 1
      while (l < r) {
        if (nums[l] + nums[r] === -nums[i] && (l === i + 1 || nums[l] !== nums[l - 1])) {
          res.push([nums[i], nums[l], nums[r]])
          l++
          r--
        } else if (nums[l] + nums[r] > -nums[i]) {
          r--
        } else {
          l++
        }
      }
    }
  }
  return res
}

// 16. 最接近的三数之和
const threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  let res = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < nums.length; i++) {
    let l = i + 1
    let r = nums.length - 1
    while (l < r) {
      const sum = nums[l] + nums[r] + nums[i]
      if (sum === target) {
        return target
      }
      if (sum > target) {
        r--
      } else {
        l++
      }
      res = Math.min(res, Math.abs(target - sum))
    }
  }
  return res
}

// 17. 电话号码的字母组合
function getDigitMap() {
  let m = new Map()
  m.set("2", "abc")
  m.set("3", "def")
  m.set("4", "ghi")
  m.set("5", "jkl")
  m.set("6", "mno")
  m.set("7", "pqrs")
  m.set("8", "tuv")
  m.set("9", "wxyz")
  return m
}

const letterCombinations = function (digits) {
  let digitMap = getDigitMap()
  let result = []
  let str = []
  const fn = (level) => {
    if (level === digits.length) {
      result.push(str.join(""))
      return
    }
    for (let i = 0; i < digitMap.get(digits[level]).length; i++) {
      str.push(digitMap.get(digits[level])[i])
      fn(level + 1)
      str.pop()
    }
  }
  fn(0)
  return result
}

// 19. 删除链表的倒数第 N 个结点
const removeNthFromEnd = function (head, n) {
  if (!head || n < 1) {
    return head
  }

  let cur = head
  while (cur) {
    cur = cur.next
    n--
  }

  if (n === 0) {
    return head.next
  }
  if (n < 0) {
    cur = head
    while (n < -1) {
      cur = cur.next
      n++
    }
    cur.next = cur.next.next
  }

  return head
}

// 20. 有效的括号
const isValid = function (s) {
  let stack = []
  for (let c of s) {
    if (c === "[" || c === "{" || c === "(") {
      stack.push(c)
    } else {
      if (stack.length > 0) {
        return false
      }
      if (
        (c === "[" && stack[stack.length - 1] === "]") ||
        (c === "{" && stack[stack.length - 1] === "}") ||
        (c === "(" && stack[stack.length - 1] === ")")
      ) {
        stack.pop()
      }
    }
  }
  return stack.length < 1
}

// 22. 括号生成
const generateParenthesis = function (n) {
  let result = []
  let str = []
  const fn = (level) => {
    if (level === n * 2) {
      if (str.length < 1) {
        return
      }
      result.push(str.join(""))
      return
    }

    if (str.filter((e) => e === "(").length < n) {
      str.push("(")
      fn(level + 1)
      str.pop()
    }

    if (str.filter((e) => e === ")").length < str.filter((e) => e === "(").length) {
      str.push(")")
      fn(level + 1)
      str.pop()
    }
  }

  fn(0)
  return result
}

// 26. 删除有序数组中的重复项
const removeDuplicates = function (nums) {
  if (nums.length < 2) {
    return nums.length
  }

  let slow = 1
  let fast = 1
  while (fast < nums.length) {
    if (nums[fast] === nums[slow - 1]) {
      fast++
    } else {
      nums[slow++] = nums[fast]
    }
  }
  return slow
}

// 27. 移除元素
const removeElement = function (nums, val) {
  let i = 0
  let j = nums.length - 1
  while (i < j) {
    if (nums[j] === val) {
      j--
      continue
    }
    if (nums[i] === val) {
      const c = nums[i]
      nums[i] = nums[j]
      nums[j] = c
    }
    i++
  }
  return i
}
