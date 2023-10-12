const mongoDb = require('mongodb');
// const ObjectId = mongoDb.ObjectId;
const getDb = require('../util/database').getDb;

class User{
  constructor(username, email, cart, id){
    this.username = username;
    this.email = email;
    this.cart=cart;
    this._id=id;
  }

  save(){
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product){
    let cartProductIndex=-1;
    let updatedCartItems=[];
    if(this.cart!==undefined){
      cartProductIndex = this.cart.items.findIndex(cp=>{
        return cp.productId.toString()===product._id.toString();
      });
      updatedCartItems = [...this.cart.items];
    }
    
    let newQuantity=1;
    

    if(cartProductIndex>=0){
      newQuantity=this.cart.items[cartProductIndex].quantity+1;
      updatedCartItems[cartProductIndex].quantity=newQuantity;
    }
    else{
      updatedCartItems.push({
        productId: new mongoDb.ObjectId(product._id),
        quantity: newQuantity
      });
    }
    
    // console.log(updatedCartItems);
    const updatedCart = {
      items: updatedCartItems
    };
    // console.log(updatedCart);

    const db = getDb();
    return db
    .collection('users')
    .updateOne(
      {_id: new mongoDb.ObjectId(this._id)},
      {$set: {cart: updatedCart}}
      );
    
  }

  static findById(userId){
    const db = getDb();
    return db.collection('users')
    .findOne({_id: new mongoDb.ObjectId(userId)})
    .then(user=>{
      console.log(user);
      return user;
    })
    .catch(err=>{
      console.log(err);
    })
  }

}

module.exports = User;
