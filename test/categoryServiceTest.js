/**
 * Created by david on 28/6/15.
 */

var assert          = require('assert');
var categoryService = require('../services/categoryService');
var fs              = require('fs');

function objectLoader(dataFileName) {
    var input = fs.readFileSync("./test/data/" + dataFileName + ".json", 'utf8');
    return JSON.parse(input);
}

beforeEach(function () {
    categoryService.clearTree();
});

describe('categoryService add recursive', function () {
    it('should add two different paths', function () {
        categoryService.add({path: 'sport.running'});
        categoryService.add({path: 'fruit.apple'});
        assert.deepEqual(categoryService.getTree(), objectLoader('twoPaths'));
    });

    it('should add two combined paths', function () {
        categoryService.add({path: 'sport.football'});
        categoryService.add({path: 'sport.basketball'});
        assert.deepEqual(categoryService.getTree(), objectLoader('combinedPath'));
    });

    it('should add two hierarchical categories with the same name', function () {
        categoryService.add({path: 'sport.sport'});
        assert.deepEqual(categoryService.getTree(), objectLoader('twoCategoriesSameName'));
    });

    it('should add a single path when adding the same path twice', function () {
        categoryService.add({path: 'sport.running'});
        categoryService.add({path: 'sport.running'});
        assert.deepEqual(categoryService.getTree(), objectLoader('singlePath'));
    });
});

describe('categoryService add iterative', function () {
    it('should add two different paths', function () {
        categoryService.add({path: 'sport.running', isIterative: true});
        categoryService.add({path: 'fruit.apple', isIterative: true});
        assert.deepEqual(categoryService.getTree(), objectLoader('twoPaths'));
    });

    it('should add two combined paths', function () {
        categoryService.add({path: 'sport.football', isIterative: true});
        categoryService.add({path: 'sport.basketball', isIterative: true});
        assert.deepEqual(categoryService.getTree(), objectLoader('combinedPath'));
    });

    it('should add two hierarchical categories with the same name', function () {
        categoryService.add({path: 'sport.sport', isIterative: true});
        assert.deepEqual(categoryService.getTree(), objectLoader('twoCategoriesSameName'));
    });

    it('should add a single path when adding the same path twice', function () {
        categoryService.add({path: 'sport.running', isIterative: true});
        categoryService.add({path: 'sport.running', isIterative: true});
        assert.deepEqual(categoryService.getTree(), objectLoader('singlePath'));
    });
});