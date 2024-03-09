// 节流 立即执行版
export const throttle = (fn, time) => {
  let timer = null;
  time = time || 1000;
  return function (...args) {
    if (timer) {
      return;
    }
    const _this = this;
    fn.apply(_this, args);
    timer = setTimeout(() => {
      timer = null;
    }, time);
  };
};

// 防抖 非立即执行版
export const debounce = (fn, time) => {
  time = time || 200;
  // 定时器
  let timer = null;
  return function (...args) {
    const _this = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(_this, args);
    }, time);
  };
};

// 防抖 立即执行版
export const debounceRight = (fn, time) => {
  time = time || 200;
  // 定时器
  let timer = null;
  return function (...args) {
    const _this = this;
    if (timer) {
      clearTimeout(timer);
    }
    fn.apply(_this, args);
    timer = setTimeout(function () {
      timer = null;
    }, time);
  };
};
