// --- 1 ---

// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// --- 2 ---

// 示例：

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

// //  Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var addTwoNumbers = function(l1, l2) {
  let sum = 0;
  let head = {};
  let cur = head;
  console.log(l1);
  console.log(l2);
  // 若l1,l2循环结束且sum(进1标记符)为0则跳出循环
  while (l1 || l2 || sum) {
    // 取得每一次的计算结果
    sum += (l1 && l1.val) + (l2 && l2.val); // sum += 是为了进1
    // 将sum%10保证sum小于10，大于10的则按0处理，然后将结果作为val，存放到head={next:{val:sum.next:null}}，作为head的next结点，每次循环，将结果依次接入队列结尾处，保证head能以倒叙顺序输出
    cur = cur.next = new ListNode(sum % 10);
    // 继续取下一个val进行循环
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
    // 小于10的数降低为0，大于9小于19的则按1，作为进1进行处理
    sum = Math.floor(sum / 10); //
  }
  console.log("head:", head.next);
  return head.next;
};

let l1 = {
  val: 2,
  next: {
    val: 4,
    next: {
      val: 3,
      next: null
    }
  }
};
let l2 = {
  val: 5,
  next: {
    val: 6,
    next: {
      val: 4,
      next: null
    }
  }
};
addTwoNumbers(l1, l2);

// // (function text() {
// let a = {};
// let b = a;
// a.next = { name: "666" };
// // })();

// // JS 传递对象问题，指针引用
// (function() {
//   var test1 = function(args) {
//     args.name = "lcc2";
//     args = { name: "lcc3" };
//   };
//   var test2 = function(args) {
//     args = { name: "lcc2" };
//     args.name = "lcc3";
//   };

//   params1 = { name: "lcc1" };
//   test1(params1);
//   console.log(JSON.stringify(params1));
//   //   结果同上
//   //   test1.call(this, params1);
//   //   console.log(JSON.stringify(params1));

//   params2 = { name: "lcc1" };
//   test2(params2);
//   console.log(JSON.stringify(params2));
//   //   结果同上
//   //   test2.call(this, params2);
//   //   console.log(JSON.stringify(params2));
// })();

// ---- 3 ----
// 示例 1:

// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
/**
 * @param {string} s
 * @return {number}
 */
// var lengthOfLongestSubstring = function(s) {
//   // 堆栈储存待处理的字符串节
//   // 待比较的字符串节
//   // 剩余字符串节
//   let originString = s
//   let dealString = ''
//   let
// };
