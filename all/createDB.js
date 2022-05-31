/*var MongoClient = require('mongodb').MongoClient
var data = require("./data.js").data 

const uri = "mongodb://localhost:27017/"
const client = new MongoClient(uri)
async function run() {
    try  {
        await client.connect();
        var database = client.db("griffins");
        database.dropDatabase()
        database = client.db("griffins");
        const guys = database.collection("guys");
        const result = await guys.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`);

    } finally {
        await client.close();
    }
}
run()*/
/*
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var schema = mongoose.Schema({ name: String })

schema.methods.meow = function(){
    console.log(this.get("name") + " сказал мяу")
}

var Cat = mongoose.model('Cat', schema)

var kitty = new Cat({ name: 'Пушок' })
kitty.save(function (err) {
    kitty.meow()
})*/
/*
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/all')
var Hero = require("./models/hero").Hero

var hero = new Hero({
    title: "Пятачок",
    nick: "pig"
})

console.log(hero)
hero.save(function(err, hero, affected){
    console.log(hero.title)
})*/

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/all')
var Hero = require("./models/hero").Hero
var async = require("async")
var data = require('./data.js').data

// 1. Очистить базу данных all
// 2. Вставить 5 героев
// 3. Закрыть соединение с базой данных

async.series([
        open,
        dropDatabase,
        createHeroes,
        close
    ],
    function(err,result){
        if(err) throw err
        console.log("ok")
    })

function open(callback){
    mongoose.connection.on("open",callback)
    console.log("Открыта")
}

function dropDatabase(callback){
    var db = mongoose.connection.db
    db.dropDatabase(callback)
    console.log("База дропнута")
}

function createHeroes(callback){
    async.each(data, function(heroData, callback){
            var hero = new mongoose.models.Hero(heroData)
            hero.save(callback)
        },
        callback)
        console.log("Герои созданы")
}

function close(callback){
    mongoose.disconnect(callback)
    console.log("Закрыта")
}