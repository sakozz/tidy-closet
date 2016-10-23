import {
  animate,
  stop
} from "liquid-fire";

export default function() {
  this.transition(
    this.fromRoute('outfits.index'),
    this.toRoute('outfits.new'),
    this.use('slideLeft', {duration: 1000}),
    this.reverse('toRight', { duration: 700 })
  );

  this.transition(
    this.fromRoute('outfits.index'),
    this.toRoute('outfits.show'),
    this.use('slideLeft', {duration: 1000}),
    this.reverse('toRight',  { duration: 700 } )
  );
}
