var express = require('express')
var router = express.Router()
var User = require("./../models/User").User
//11.5 var Hero = require("../models/hero").Hero

/* GET home page. */
router.get('/', function(req, res, next) {
   //11.5 Hero.find({},{_id:0,title:1,nick:1},function(err,menu){
      req.session.greeting = "Hi!!!!"
      res.render('index', {
                            title: 'Express',
                           //11.5 menu: menu,
                            counter: req.session.counter
                          });
    });

/* GET login/registration page. */
router.get('/logreg', function(req, res, next) {
  res.render('logreg',{title: 'Вход', error: null});
});

/* POST login/registration page. */
/*router.post('/logreg', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  User.findOne({username:username},function(err,user){
    if(err) return next(err)
    if(user){
      if(user.checkPassword(password)){
        req.session.user = user
        res.redirect('/')
      } else {
        res.render('logreg', {title: 'Вход', error: 'Пароль не верный'})
      }
    } else {
      var user = new User({username:username,password:password})
            user.save(function(err,user){
                if(err) return next(err)
                req.session.user = user
                res.redirect('/')
            })     
    }
})
});*/
router.post('/logreg', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  User.findOne({username:username},function(err,user){
      if(err) return next(err)
      if(user){
          if(user.checkPassword(password)){
              req.session.user = user._id
              res.redirect('/')
          } else {
                    res.render('logreg',{title:'Вход', error: 'Пароль не верный'})
          }
     } else {
     var user = new User({username:username,password:password})
          user.save(function(err,user){
              if(err) return next(err)
              req.session.user = user._id
              res.redirect('/')
          })        
    }
  })
});

/* POST logout. */
router.post('/logout', function(req, res, next) {
  req.session.destroy()
  res.locals.user = null;
  res.redirect('/')
});

//11.5 });

module.exports = router;


/* Страница Питтера Грифина */
/*router.get('/peter', function(req, res, next) {
  res.render('hero', {
      title: "Питтер Гриффин",
      picture: "images/peter.png",
      desc: "Протагонист и главный герой мультипликационного сериала «Гриффины», глава семейства. Питер ирландского происхождения, проживает с семьёй в городе Куахог, штат Род-Айленд."
  });
});

/* Страница Лоис */
/*router.get('/lois', function(req, res, next) {
  res.render('hero', {
      title: "Лоис",
      picture: "images/lois.jpg",
      desc: "Персонаж мультсериала «Гриффины», домохозяйка, жена Питера Гриффина. Является американкой еврейского происхождения по национальности."
  });
});

/* Страница Мэг */
/*router.get('/meg', function(req, res, next) {
  res.render('hero', {
      title: "Мэг",
      picture: "images/meg.jpg",
      desc: "Мэг — самосознательная и эмоционально хрупкая девочка-подросток. С ней несправедливо обращаются ее родители и у нее есть несколько недостатков. Которые заставляют ее пытаться стать частью «толпы». Что приводит только к тому, что она получает отпор от Конни Д’Амико. Популярной и красивой, но подлой и язвительной главной болельщицы местной средней школы. Тем не менее, другой студент по имени Нил Голдман привлекает ее."
  });
});

/*Chris*/
/*router.get('/chris', function(req, res, next) {
  res.render('hero', {
      title: "Крис Гриффин",
      picture: "images/Chris.webp",
      desc: " Он является старшим сыном и средним ребенком Питера и Лоис Гриффин и братом Стьюи и Мэг Гриффин. Крису изначально был дан «панк-образ». В течение первых трех сезонов он носил золотые серьги. И его болезненная неловкость не была так подчеркнута, как это было позже в сериале. Поскольку он в итоге стал менее стадным. Первоначально разработанный как несколько общительный, но все еще неразумный подросток. Крис стал более неуклюжим и еще со временем более идиотским."
  });
});

/*Stew*/
/*router.get('/stew', function(req, res, next) {
  res.render('hero', {
      title: "Стьюи Гриффин",
      picture: "images/Stew.jpg",
      desc: "Персонаж американского анимационного ситкома «Гриффины». Младший сын семейства Гриффинов, феноменально развитый и одаренный двухлетний мальчик."
  });
});

/* Страница Брайана */
/*router.get('/brian', function(req, res, next) {
  res.render('hero', {
      title: "Брайан Гриффин",
      picture: "images/brian.jpg",
      desc: "Брайан Гриффин — разговаривающая собака породы лабрадор, 8 лет, живёт с Гриффинами с тех пор, когда Питер подобрал его как бродячую собаку. Владеет такими человеческими качествами как: разговаривать, причём часто на довольно умные темы, водить автомобиль, ходить на двух ногах. Очень остроумный. Питер его лучший друг. В эпизоде Брайан возвращается в колледж, мы узнаем что Брайан ходил в университет Брауна в Род Айленде, но не закончил его. Любит Лоис."
  });
});*/