"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var urlModel = function urlModel(longUrl, hashKey, shortUrl) {
  _classCallCheck(this, urlModel);

  this.longUrl = longUrl;
  this.hashKey = hashKey;
  this.shortUrl = shortUrl;
};

exports.default = urlModel;