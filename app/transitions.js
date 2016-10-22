export default function(){
  this.transition(
    this.fromRoute('outfits.index'),
    this.toRoute('outfits.new'),
    this.use( 'toLeft' , { duration: 700 }),
    this.reverse('toRight', { duration: 700 })
  );
  this.transition(
    this.fromRoute('outfits.index'),
    this.toRoute('outfits.show'),
    this.use('toLeft' , { duration: 700 }),
    this.reverse('toRight',  { duration: 700 } )
  );
}
