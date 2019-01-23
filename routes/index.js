var express = require('express');
var router = express.Router();
var request = require('request');
var logs = require('./logger');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function (req, res, next) {

  request('http://192.168.34.127:5003/', (err, response, body) => {
    res.send(body);
  })

  // res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {

  let sl = req.body.couplet_input;
  request.post('http://192.168.34.127:5003/', {
    form: {
      "couplet_input": sl || ''
    }
  }, (err, response, body) => {
    var $ = cheerio.load(body);
    var $html = $('textarea');
    logs.info("上联：" + sl + '  下联：' + $html.text());
    res.send(body);
  })

  // res.render('index', { title: 'Express' });
});

module.exports = router;