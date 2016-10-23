// import { animate, stop, Promise } from "liquid-fire";
import {
  animate,
  stop,
  Promise
} from "liquid-fire";

export default function(opts) {
  opts = opts || {};
  let self = this;
  stop(this.oldElement);
  return Promise.all([
    animate(this.oldElement, { opacity: 0 }, opts),
    animate(this.newElement, {
       translateX: ['100%', '0%'], opacity: 1 },
       opts
     )
  ]);

}
