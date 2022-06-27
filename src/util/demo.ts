/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { debounce, throttle } from '.';

let pre = Date.now();
function a() {
  const now = Date.now();
  if (pre) {
    console.info(now - pre);
  } else {
    console.info(now);
  }
  pre = now;
}

var b = debounce(a, 2000, { leading: false, maxWait: 4000, trailing: true });
// var b = debounce(a, 2000, { leading: false,  trailing: true });
var c = throttle(a, 2000, { leading: false, trailing: false });

var timer = setInterval(b, 4000);
var clearTimer = () => clearInterval(timer);
