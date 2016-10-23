// import { animate, stop, Promise } from "liquid-fire";
import {
  animate,
  stop,
  Promise
} from "liquid-fire";

export default function(opts) {
  opts = opts || {};
  stop(this.oldElement);
  return Promise.all([
    animate(this.oldElement, { opacity: 0 }, {duration: opts.duration/2}),
    animate(this.newElement, {
       translateX: ['0%','100%'], opacity: 1 },
       opts
     )
  ]);

}
