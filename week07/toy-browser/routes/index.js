var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('dirname: ', __dirname)
  // res.sendFile( __dirname + "/" + "index.html" )
  res.render('index',{ title: '首页' });
  // res.send('hha')
});

module.exports = router;
