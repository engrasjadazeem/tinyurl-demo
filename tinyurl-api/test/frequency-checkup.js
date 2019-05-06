var assert = require('assert');
var randomstring = require('randomstring');

describe('Frequency checkup', function () {
  it('should not generate similar hashes', function() {
    var result = [];
    for(var i=0; i<100000; i++) {
      result.push(randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
      }));
    }
    assert.equal(result.length, new Set(result).size);
  });
});