/**
5. 最长回文子串
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"
 */

/**
 * @param {string} s
 * @return {string}
 */
// 1. 暴力法-超时
// var longestPalindrome = function(s) {
//   var ans = "";
//   var max = 0;
//   var len = s.length;
//   //   循环字符串
//   for (var i = 0; i < len; i++) {
//     // 循环下一个字符串
//     for (var r = i + 1; r <= len; r++) {
//       // 不断截取i-r的字符串
//       var tmpStr = s.substring(i, r);
//       // 判断这段字符串是否为回文且长度是否大于当前的最大回文长度
//       if (isPalindrome(tmpStr) && tmpStr.length > max) {
//         // 若是回文且长度大，则记录这段回文及长度
//         ans = s.substring(i, r);
//         max = tmpStr.length;
//       }
//     }
//   }
//   return ans;
// };

// function isPalindrome(str) {
//   // 获取字符串长度
//   var len = str.length;
//   // 截取字符串中间
//   var middle = parseInt(len / 2);
//   // 以中间为分界，判断字符串的首与尾相对应的位置是否相同，相同则属于回文
//   for (var i = 0; i < middle; i++) {
//     if (str[i] != str[len - i - 1]) {
//       return false;
//     }
//   }
//   return true;
// }

// // 2. 动态规划 - 未理解
// var longestPalindrome = function(s) {
//   // 获取字符串长度
//     let n = s.length;
//     // 初始化
//   let res = "";
//   // 初始化字符串等长数组
//   let dp = Array.from(new Array(n), () => new Array(n).fill(0));
//   // 倒叙循环字符串
//   for (let i = n - 1; i >= 0; i--) {
//     //
//     for (let j = i; j < n; j++) {
//       //
//         dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
//       if (dp[i][j] && j - i + 1 > res.length) {
//         res = s.substring(i, j + 1);
//       }
//     }
//   }
//   return res;
// };

// 3. 中心规划法
var longestPalindrome = function(s) {
  if (!s || s.length < 2) {
    return s;
  }
  let start = 0,
    end = 0;
  let n = s.length;
  // 中心扩展法
  let centerExpend = (left, right) => {
    while (left >= 0 && right < n && s[left] == s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  };
  // 循环字符串
  for (let i = 0; i < n; i++) {
    //
    let len1 = centerExpend(i, i);
    let len2 = centerExpend(i, i + 1);
    // 两种组合取最大回文串的长度
    let maxLen = Math.max(len1, len2);
    if (maxLen > end - start) {
      // 更新最大回文串的首尾字符索引
      start = i - ((maxLen - 1) >> 1);
      end = i + (maxLen >> 1);
    }
  }
  return s.substring(start, end + 1);
};

console.log(longestPalindrome("babad"));
