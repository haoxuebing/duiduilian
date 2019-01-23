var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */
router.get('/', function (req, res, next) {

  request('http://192.168.34.127:5003/', (err, response, body) => {
    res.send(body);
  })

  // res.render('index', { title: 'Express' });
});

router.post('/',function (req, res, next) {

  request.post('http://192.168.34.127:5003/', {
    form: {
      "couplet_input": req.body.couplet_input||''
    }
  }, (err, response, body) => {
    res.send(body);
  })

  // res.render('index', { title: 'Express' });
});

module.exports = router;