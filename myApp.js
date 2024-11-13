require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

let personSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:Number,
  favoriteFoods:[String]
});

let Person = mongoose.model('Person',personSchema);

const person = new Person ({
  name:'AMogh',
  age:26,
  favoriteFoods:['Kaala Jamoon', 'Rashgulla', 'Puliyogare','Basundi']
})

const person2 = new Person ({
  name:'Varsh',
  age:26,
  favoriteFoods:['Rashgulla', 'Puliyogare','Basundi']
})


const arrayOfPeople = [person,person2];

const createAndSavePerson = (done) => {

  person.save(function(err,data){
    if(err){
      console.error(err)
      return console.error(err)
    }
    done(null,data);
  })
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data){
    if(err) return console.error(err)
    console.log(data)
    done(null,data)
  })

};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err,data){
    if(err) return console.error(err);
    console.log(data)
    done(null, data);

  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function(err,data){
    if(err) return console.error(err);
    console.log(data);
    done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},function(err,data){
    if(err) return console.error(err);
    console.log(data);
    done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
    Person.findById(personId,function(err,person){
      if(err) return console.log(err);

      person.favoriteFoods.push(foodToAdd);

      person.save(function(err,updatedPerson){
        if(err) return console.log(err)
        done(null,updatedPerson)
      })
    })
   

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  console.log('person name',personName)
  Person.findOneAndUpdate({name:personName},{age:ageToSet}, {new:true},function(err,updatedPerson){
    if(err) return console.log(err);
    console.log(updatedPerson);
    done(null,updatedPerson)
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,removedPerson){
    if(err) return console.log(err);
    done(null,removedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,removedPerson){
    if(err) return console.log(err);
    console.log('removed person',nameToRemove,removedPerson)
    done(null,removedPerson)
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select(['name','favoriteFoods']).exec((err,foodPerson) => {
    if(err) console.log(err);
    console.log(foodPerson)
    done(null,foodPerson)
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
