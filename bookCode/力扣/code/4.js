// 4. 寻找两个有序数组的中位数
// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

// 你可以假设 nums1 和 nums2 不会同时为空。

// 示例 1:

// nums1 = [1, 3]
// nums2 = [2]

// 则中位数是 2.0
// 示例 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// 则中位数是 (2 + 3)/2 = 2.5

// /**
//  * @param {number[]} nums1
//  * @param {number[]} nums2
//  * @return {number}
//  */
// var findMedianSortedArrays = function(nums1, nums2) {
//   // 合并加排序，得到[1,2,3,4,5,6] 偶数个
//   let num = nums1.concat(nums2).sort((a, b) => a - b);
//   // 取数组中间位置
//   let medieNum = num.length / 2;
//   // 若中间位置为偶数个
//   if (medieNum % 1 == 0) {
//     // 则取中间两个数进行/2
//     return (num[Math.floor(medieNum)] + num[Math.floor(medieNum) - 1]) / 2;
//   } else {
//     // 若中间位置为奇数位，则直接取其值
//     return num[Math.floor(medieNum)];
//   }
// };

var findMedianSortedArrays = function(nums1, nums2) {
  // 数组长度较长的靠后
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  // 获取数组长度
  const length1 = nums1.length;
  const length2 = nums2.length;
  // 从0位开始
  let min = 0; // 0
  // 从nums1的长度开始
  let max = length1; // 2
  // 取数组的一半的位置
  let half = Math.floor((length1 + length2 + 1) / 2); // 3
  // 当
  while (max >= min) {
    // 取nums1的一半的位置
    const i = Math.floor((max + min) / 2);
    // 取nums1的一半的一半的位置
    const j = half - i;
    if (i > min && nums1[i - 1] > nums2[j]) {
      max = i - 1;
      // 在nums1范围中 且 nums2的一半的一半大于nums1的一半
    } else if (i < max && nums1[i] < nums2[j - 1]) {
      min = i + 1;
    } else {
      let left, right;
      if (i === 0) left = nums2[j - 1];
      else if (j === 0) left = nums1[i - 1];
      else left = Math.max(nums1[i - 1], nums2[j - 1]);

      if (i === length1) right = nums2[j];
      else if (j === length2) right = nums1[i];
      else right = Math.min(nums1[i], nums2[j]);

      return (length1 + length2) % 2 ? left : (left + right) / 2;
    }
  }
  return 0;
};

console.log(findMedianSortedArrays([1, 3], [2, 6, 4, 5]));
