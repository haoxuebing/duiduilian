var express = require('express');
var router = express.Router();
var request = require('request');
var logs = require('./logger');
var urlencode = require('urlencode');
let fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('Fort', {
    title: '对对联'
  });
});

router.post('/seq2seq', function (req, res, next) {

  let sl = req.body.txt;
  let url = 'http://localhost:5000/' + urlencode(sl)
  request(url, (err, response, body) => {
    let xia = JSON.parse(body)["下联"]
    logs.info("上联：" + sl + '  下联：' + xia + '<br/>');
    res.send(xia);
  })
});

router.get('/log', (req, res) => {
  let nowstr = getNowFormatDate()
  sendLog(nowstr, res);
})


router.get('/log/:m/:d', (req, res) => {
  let m = req.params['m']
  let d = req.params['d']
  let nowstr = getNowFormatDate(m, d)
  sendLog(nowstr, res);
})

function sendLog(nowstr, res) {
  let filepath = `./logs/info-${nowstr}.log`;
  fs.exists(filepath, function (exists) {
    if (exists) {
      let data = fs.readFileSync(filepath).toString();
      res.send(data);
    }
    else {
      res.send("No logs");
    }
  });
}

function getNowFormatDate(month, strDate) {
  var date = new Date();
  var seperator1 = "-";
  if (month == undefined) {
    month = date.getMonth() + 1;
  }
  if (strDate == undefined) {
    strDate = date.getDate();
  }
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

module.exports = router;