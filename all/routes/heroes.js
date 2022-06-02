var express = require('express')
var router = express.Router()
var Hero = require("../models/hero").Hero
var async = require("async")

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Новый маршрутизатор, для маошрутов, начинающихся с heroes')
});

/* Страница героев */
router.get('/:nick', function(req, res, next) {
    /*11,5 async.parallel([
            function(callback){
                Hero.findOne({nick:req.params.nick}, callback)
            },
            function(callback){
                Hero.find({},{_id:0,title:1,nick:1},callback)
            }
        ],
        function(err,result){*/
        Hero.findOne({nick:req.params.nick}, function(err, hero){
            if(err) return next(err)
            //11.5 var hero = result[0]
            //11.5 var heroes = result[1] || []
            if(!hero) return next(new Error("Нет такого героя в этой книжке"))
            res.render('hero', {
                title: hero.title,
                picture: hero.avatar,
                desc: hero.desc,
                //11.5 menu: heroes
            });
        })
});

module.exports = router
