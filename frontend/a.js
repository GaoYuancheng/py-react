// 1 使用setTimeout实现一个mySetInterval;

const timerObj = {
  timer: null,
};

function mySetInterval(callback, t) {
  timerObj.timer = setTimeout(() => {
    callback();
    mySetInterval(callback, t);
  }, t);
  return timerObj;
}

// 使下面的调用每1000毫秒打印字符串'x'
mySetInterval(() => {
  console.log('xx');
}, 1000);

// 2. 实现一个myClearInterval,可以终止一个mySetInterval的执行;
function myClearInterval(timer) {
  // todo
  clearTimeout(timer.timer);
}

// usage:
const timer = mySetInterval(() => {
  console.log('y');
}, 1000);

setTimeout(() => {
  myClearInterval(timer);
}, 2500);
