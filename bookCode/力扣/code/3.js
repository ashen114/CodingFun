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
//   let start = 0,
//     end = 0,
//     len = s.length,
//     maxLen = 0,
//     i = 0;
//     // 若字符串长度为0或1则直接返回长度，无计算意义
//     if(len == 0|| len == 1){
//         return len
//     }
//     // 每次取s的下一位
//     while(s[end + 1]){
//         for(let i = start;i <= end;i++){

//         }
//     }
// };
// var lengthOfLongestSubstring = function(s) {
//   let arr = []; // 用于缓存的数组
//   let max = 0; // 用于存储最大的字符串长度
//   // 循环
//   for (let item of s) {
//     // 判断arr是否存在item
//     if (arr.includes(item)) {
//       // 若存在，则取item的位置index
//       let index = arr.indexOf(item);
//       //根据item的位置index，剔除arr中前index的字符串
//       console.log(arr.splice(0, index + 1));
//     }
//     // 保存item
//     arr.push(item);
//     max = max > arr.length ? max : arr.length;
//   }
//   return max;
// };

// var lengthOfLongestSubstring = function(s) {
//   // 为长度0则直接返回
//   if (s.length == 0) return 0;
//   let hash = {};
//   let max = 0;
//   let left = 0;
//   // 循环s
//   for (let right = 0; right < s.length; right++) {
//     // 循环s时，取每次循环的一个字符，存在hash中，把位置存在moveLeft中
//     let moveLeft = hash[s[right]];
//     // 当存在重复的字符时
//     if (moveLeft) {
//       // 更新left，取重复字符串最后出现的位置
//       left = Math.max(left, moveLeft);
//     }
//     // 不断追加最新出现的新字符及更新再次出现的重复字符的位置
//     hash[s[right]] = right + 1;
//     // 记录当前出现重复字符串前的最大字符串长度  若遇到重复字符串，max会更新
//     max = Math.max(max, right - left + 1);
//   }
//   console.log("hash:", hash);
//   return max;
// };

var lengthOfLongestSubstring = function(s) {
  if (s.length == 0) return 0;
  let hash = {};
  let left = 0;
  let max = 0;
  for (let right = 0; right < s.length; right++) {
    let moveLeft = hash[s[right]];
    if (moveLeft) {
      left = Math.max(left, moveLeft);
    }
    hash[s[right]] = right + 1;
    max = Math.max(max, right - left + 1);
  }
  return max;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
