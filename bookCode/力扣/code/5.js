// 5. 最长回文子串
// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例 1：

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
// 示例 2：

// 输入: "cbbd"
// 输出: "bb"

// 解法一：暴力枚举法
// 时间复杂度O(n^3)
// 空间复杂度O(1)
/*
var longestPalindrome = function(s) {
  function isPalindrome(str) {
    var len = str.length;
    var middle = parseInt(len / 2); // 取待判断的字符串的中间值
    for (var i = 0; i < middle; i++) {
      // 循环待判断字符串中的[0,middle]的字段
      if (str[i] != str[len - i - 1]) {
        // 判断[0,middle]的字段是否为回文，若不是回文，则返回false
        return false;
      }
    }
    return true; // 若为单字符串或者为回文，则返回true
  }
  var ans = "";
  var max = 0;
  var len = s.length;
  // 循环s字符串
  for (var i = 0; i < len; i++) {
    // 依次取下一个字符串
    for (var r = i + 1; r <= len; r++) {
      // 不断循环取每轮的字符串，从[0,i]到[1,i]...[i-1,i]
      var tmpStr = s.substring(i, r);
      // 判断是否为回文且回文的长度大于max
      if (isPalindrome(tmpStr) && tmpStr.length > max) {
        // 储存目前最长的回文字段
        ans = s.substring(i, r);
        // 储存目前最长的回文的长度
        max = tmpStr.length;
      }
    }
  }
  return ans;
};
*/

// 解法二：动态规划 - A
var longestPalindrome = function(s) {
  // 若字符串为空或者长度小于2，则直接返回原字符串
  if (!s || s.length < 2) {
    return s;
  }
  var s_f = s
    .split("")
    .reverse()
    .join(""); // 字符串的倒序
  var resultStr = s[0]; // 字符串的第1位
  var maxLen = 1;
  var tmpLen = 1;
  var maxStrIndex = 0;
  var len = s.length;
  //判断字符串是否回文
  function isPalinerome(i, r) {
    if (len - i - 1 == r - tmpLen + 1) {
      return true;
    }
    return false;
  }
  //初始化二维数组
  var len = s.length;
  var arr = new Array(len); // 定义s字符串长度的empty数组
  // 循环s字符串
  for (var i = 0; i < len; i++) {
    // 依次初始化arr空数组
    arr[i] = [];
    // 再次循环s字符串
    for (var r = 0; r < len; r++) {
      // 为arr的二维数组赋予0值，二维数组储存回文的长度
      arr[i][r] = 0;
    }
  }
  // 再次循环s字符串
  for (var i = 0; i < len; i++) {
    // 再次循环s字符串
    for (var r = 0; r < len; r++) {
      // 判断s与倒叙的s是否相等
      if (s[i] == s_f[r]) {
        // 若为第一次循环时，则将二维数组为1
        if (i == 0 || r == 0) {
          arr[i][r] = 1;
        } else {
          //
          arr[i][r] = arr[i - 1][r - 1] + 1;
          tmpLen = arr[i][r];
        }
        if (tmpLen > maxLen && isPalinerome(i, r)) {
          maxStrIndex = r;
          maxLen = tmpLen;
          resultStr = s.substring(i - tmpLen + 1, i + 1);
        }
      }
    }
  }
  return resultStr;
};

console.log(longestPalindrome("cbbd"));

/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function(s) {};
