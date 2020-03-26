function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function() {
      console.log("i:", i);

      return i;
    };
  }
  //   console.log("arr:", arr);

  for (var a = 0; a < 10; a++) {
    console.log(arr[a]());
  }
}
test(); // 连续打印 10 个 10
