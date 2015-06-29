/**
 * Created by david on 28/6/15.
 */

var Tree = require('../dataModel/Tree');

var tree = new Tree();

module.exports.add = function (params, callback) {
    tree.add(params.path.split('.'), params.isIterative);
    if (callback) {
        return callback(null);
    }
};

module.exports.getTree = function (params, callback) {
    if (callback) {
        return callback(null, tree.getTree());
    }
    return tree.getTree();
};

module.exports.clearTree = function () {
    tree = new Tree();
};
