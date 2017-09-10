/**
 * Created by zivlevi1 on 11.9.2017.
 */
const Transform = require('.././transform');
const Load = require('.././load');

var assert = require('assert');

describe('checkType', function() {
    it('should return VARCHAR(255)', function() {
        assert.equal("VARCHAR(255)", Load.checkType("object"));
    });
});

describe('createFields', function() {
    it('should return list of fields', function() {
        var res = ["_id","name","address"];
        Transform.setColums(res);
        assert.equal("_id, name, address, ", Transform.createFields());
    });
});

describe('createFields', function() {
    it('should return list of types', function() {
        var res = ["string","number","number"];
        Transform.setTypes(res);
        assert.equal("VARCHAR(255), INT, INT, ", Transform.createTypes());
    });
});



