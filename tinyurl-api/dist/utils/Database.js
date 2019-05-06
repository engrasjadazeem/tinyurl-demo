'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

var _development = require('../config/development');

var _development2 = _interopRequireDefault(_development);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, [{
    key: 'sendQuery',
    value: async function sendQuery(query, params) {
      try {
        var client = new _pg.Client({
          user: _development2.default.pgUser,
          host: _development2.default.pgHost,
          database: _development2.default.pgDatabase,
          port: _development2.default.pgPort,
          password: _development2.default.pgPassword
        });
        await client.connect();
        var response = await client.query(query, params);
        await client.end();
        return response;
      } catch (error) {
        console.log('Error occured!', error);
      }
    }
  }, {
    key: 'getById',
    value: async function getById(hashkey) {
      try {
        var query = 'SELECT * FROM url_system.url_hash where hashkey = $1';
        var params = [hashkey];
        var response = await this.sendQuery(query, params);
        return response.rows[0];
      } catch (error) {
        console.log('Error in fetching by hashkey, ', error);
        throw error;
      }
    }
  }, {
    key: 'insert',
    value: async function insert(urlModel) {
      try {
        var query = 'INSERT INTO url_system.url_hash (long_url, hashkey, short_url)\n                    VALUES ($1, $2, $3)';
        var params = [urlModel.longUrl, urlModel.hashKey, urlModel.shortUrl];
        var response = await this.sendQuery(query, params);
        return urlModel;
      } catch (error) {
        console.log('Error in insertion, ', error);
        throw error;
      }
    }
  }]);

  return Database;
}();

exports.default = Database;