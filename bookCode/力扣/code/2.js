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
