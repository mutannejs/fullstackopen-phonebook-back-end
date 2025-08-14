import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Informe a senha como argumento");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://mutanne:${password}@myatlasclusteredu.3cfoq.mongodb.net/phonebook`;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length != 5) {
  Person.find({}).then(response => {
    response.forEach(
      (person) => console.log(`${person.name} ${person.number}`)
    )
    mongoose.connection.close();
  });
} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  newPerson.save().then(response => {
    console.log(response);
    mongoose.connection.close();
  });
}
