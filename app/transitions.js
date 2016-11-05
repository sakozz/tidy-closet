import {
  animate,
  stop
} from "liquid-fire";

export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('tags'),
    this.use('slideLeft', {duration: 500}),
    this.reverse('toRight', { duration: 300 })
  );

  this.transition(
    this.hasClass('outfit-item'),
    this.toValue(true),
    this.use('slideLeft', {duration: 500}),
    this.reverse('toRight',  { duration: 700 } )
  );
}
