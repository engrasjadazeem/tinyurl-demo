'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _Database = require('./utils/Database');

var _Database2 = _interopRequireDefault(_Database);

var _urlModel = require('./models/urlModel');

var _urlModel2 = _interopRequireDefault(_urlModel);

var _development = require('./config/development');

var _development2 = _interopRequireDefault(_development);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _validUrl = require('valid-url');

var _validUrl2 = _interopRequireDefault(_validUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var validUrl = require('valid-url');
var app = (0, _express2.default)();
var database = new _Database2.default();

app.use((0, _cors2.default)({
  origin: 'http://localhost:3001'
}));

app.listen(_development2.default.tinyurlPort, function () {
  return console.log('Example app listening on port ' + _development2.default.tinyurlPort + '!');
});

app.post('/tinyurl', function (req, res) {
  try {
    if (req.query.longUrl && typeof req.query.longUrl == "string" && req.query.longUrl != "") {

      if (!_validUrl2.default.isUri(req.query.longUrl)) {
        // res.send('Invalid URL provided, please try again');
        throw 'Invalid URL provided, please try again';
      }

      var hash = _randomstring2.default.generate({
        length: 6,
        charset: 'alphanumeric'
      });
      var shortUrl = 'http://' + _development2.default.tinyurlDomain + ':' + _development2.default.tinyurlPort + '/' + hash;
      var urlModelObject = new _urlModel2.default(req.query.longUrl, hash, shortUrl);
      insertUrlModel(urlModelObject, function (err, result) {
        if (err) {
          res.send('Error occured in insertion', err);
        }
        res.send(urlModelObject);
      });
    } else {
      res.send('longUrl not provided in request.');
    }
  } catch (ex) {
    console.log('Exception occured in tinyurl post request, details: ', ex);
    throw ex;
  }
});

app.get('/:hash([a-zA-Z0-9]{6,})', function (req, res) {
  try {
    if (req.params.hash && typeof req.params.hash == "string" && req.params.hash != "") {
      getHashUrl(req.params.hash, function (err, result) {
        if (err) {
          res.send('Error occured in fetching hash', err);
        }
        var urlModelObject = new _urlModel2.default(result.long_url, result.hashkey, result.short_url);
        res.redirect(301, urlModelObject.longUrl);
        //res.send(urlModelObject);
      });
    }
  } catch (ex) {
    console.log(ex);
  }
});

var getHashUrl = async function getHashUrl(hash, callback) {
  try {
    var hashUrls = await database.getById(hash);
    callback(null, hashUrls);
  } catch (ex) {
    console.log(ex);
    e.request = call.request;
    callback(ex);
  }
};

var insertUrlModel = async function insertUrlModel(urlModelObject, callback) {
  try {
    var response = await database.insert(urlModelObject);
    callback(null, response);
  } catch (ex) {
    console.log('Exception occured in insertUrlModel', ex);
  }
};