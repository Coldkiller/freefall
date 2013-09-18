var assert = require('assert');
var utils = require('partial.js/utils');

exports.run = function(framework) {

    framework.assert('Homepage', '/1/', function response(error, data, name, code, headers) {
        assert.ok(code === 200, name);
    });

};