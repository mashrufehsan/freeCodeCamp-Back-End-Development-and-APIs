require('dotenv').config();


//1
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//2

let personSchema = new mongoose.Schema({
  name : {type:String, required: true},
  age : Number,
  favoriteFoods : [String]

})

let Person = mongoose.model('Person', personSchema)

//3

const createAndSavePerson = (done) => {
  let mashruf = new Person({name : 'Mashruf', age: 25, favoriteFoods : ['Rice', 'Beef']})
  mashruf.save((error, data) => {
    if(error){
      console.log(error);
    }else{
      done(null,data)
    }
  })
};



//4

let arrayOfPeople = [
  {name: 'Mashruf', age: 25, favoriteFoods: 'Rice'},
  {name: 'Mila', age: 24, favoriteFoods: 'Beef'}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if(error){
      console.log(error);
    }else{
      done(null, createdPeople)
    }
  })


};


//5

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, data)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null, data);
      console.log(data)
    }
  })
};


//6

const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods: food}, (error, data)=>{
    if(error){
      console.log(error);
    }else{
      done(null, data)
    }
  })

};


//7

const findPersonById = (personId, done) => {
  

  Person.findById(personId, (error, data) => {
    if(error){
      console.log(error);
    }
    else{
      done(null, data)
    }
  })


};

//8

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId,(error, data)=>{
    if(error){
      console.log(error);
    }
    else{
      data.favoriteFoods.push(foodToAdd)
      data.save((error,data)=>{
        if(error){
          console.log(error)
        }
        else{
          done(null, data)
        }
      })
      
    }
  })
  
};


//9

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, result)=>{
    if(error){
      console.log(error);
    }else{
      done(null,result)
    }
  })

  
};

//10

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (error, data)=>{
    if(error){
      console.log(error);
    }else{
      done(null,data)
    }
  })
};

//11

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (error, data)=>{
    if(error){
      console.log(error);
    }else{
      done(null,data)
    }
  })

};

//12

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all: foodToSearch}})
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((error, data)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null, data)
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
