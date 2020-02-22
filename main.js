// getting-started.js
const dbuser = 'itay';
const dbpassword = 'XXXXXXXXXX';
const collectionName = 'test';
// const url = `<!--mongodb+srv://<${dbuser}>:<${dbpassword}>cluster0-px0px.mongodb.net/test-->`;

// const MongoClient = require('mongodb').MongoClient;
mongoose = require('mongoose');
const uri = `mongodb+srv://${dbuser}:${dbpassword}@cluster0-px0px.mongodb.net/${collectionName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    whenConnectedToDb();
});

function whenConnectedToDb() {
    const kittySchema = new mongoose.Schema({
        name: String
    });

    // var Kitten = mongoose.model('Kitten', kittySchema);
    //
    // var silence = new Kitten({ name: 'Silence' });
    // console.log(silence.name); // 'Silence'

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });

    Kitten.find({ name: /^fluff/ }, (res) => {
        console.log(res);
    });
}
