/**
 * @function 分析变量类型并输出带颜色的日志
 * @param {type} any
 * author:FREENDOM
 */
function color(param) {
  console.log(
    "%c [%s] : %c %s",
    "color: #16a085",
    Object.prototype.toString.call(param).slice(8, -1),
    "color: #0000ff",
    JSON.stringify(param)
  );
}
