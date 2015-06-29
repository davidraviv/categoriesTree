/**
 * Created by david on 28/6/15.
 */

'use strict';

var Node = require('./Node');

module.exports = Tree;

/**
 *  Tree constructor
 */
function Tree() {
    this.root = new Node('root');
}


/**
 * A tail recursion that finds the last existing tree node in a given path and returns that node with the remaining of the path
 * @param tree
 * @param path - array of strings, representing the path elements
 * @returns {*} tree, path
 */
function findRecursive(tree, path) {
    if (!tree.hasChildren || !tree.getChild(path[0])) {
        return {tree: tree, path: path};
    } else {
        var firstElement = path.splice(0, 1)[0];
        return findRecursive(tree.getChild(firstElement), path);
    }
}

/**
 * Finds the last existing tree node in a given path iteratively. Returns the tree node and the remaining of the path
 * @param tree
 * @param path - array of strings, representing the path elements
 * @returns {*} tree, path
 */
function findIterative(tree, path) {
    var nodePointer = tree;
    var pathLength  = path.length;
    for (var i = 0; i < pathLength; i++) {
        if (!nodePointer.hasChildren || !nodePointer.getChild(path[i])) {
            return {tree: nodePointer, path: path.splice(i, pathLength)};
        } else {
            nodePointer = nodePointer.getChild(path[i]);
        }
    }
    return {tree: nodePointer, path: []};
}


/**
 * a Tail recursive to create a node for each element in path and add to a tree
 * @param tree
 * @param path
 */
function addRecursive(tree, path) {
    if (path.length === 0) return;
    var isLastPathElement = path.length === 1;
    var firstElement      = path.splice(0, 1)[0];
    tree.addChild(new Node(firstElement));
    if (!isLastPathElement) {
        addRecursive(tree.getChild(firstElement), path);
    }
}

/**
 * Create a node for each element in the path and add to a tree
 * @param tree
 * @param path - array of strings, representing the path elements
 */
function addIterative(tree, path) {
    var nodePointer = tree;
    for (var i = 0; i < path.length; i++) {
        nodePointer.addChild(new Node(path[i]));
        nodePointer = nodePointer.getChild(path[i]);
    }
}

function serializeNode(node, niceTree) {
    for (var key in node.children) {
        if (node.children.hasOwnProperty(key)) {
            niceTree[key] = {};
            serializeNode(node.getChild(key), niceTree[key]);
        }
    }
}

/**
 * Add an element to the tree
 * @param path - array of strings, representing the path elements
 * @param isIterative - default is false
 */
Tree.prototype.add = function (path, isIterative) {
    var found;
    var res;
    if (isIterative) {
        found = findIterative(this.root, path);
        addIterative(found.tree, found.path);
    } else {
        found = findRecursive(this.root, path);
        addRecursive(found.tree, found.path);
    }
};

Tree.prototype.toString = function () {
    return JSON.stringify(this.getTree, null, 2);
};

Tree.prototype.getTree = function () {
    var niceTree = {};
    serializeNode(this.root, niceTree);

    return niceTree;
};