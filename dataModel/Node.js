/**
 * Created by david on 28/6/15.
 */

module.exports = Node;

/**
 *  Node constructor
 */
function Node(name) {

    /**
     * The Node name
     */
    this.name = name;

    /**
     * An array of children Nodes
     * @type {Array}
     */
    this.children = {};

    /**
     * Flag to mark if node has children
     * @type {boolean}
     */
    this.hasChildren = false;
}

Node.prototype.addChild = function (node) {
    this.children[node.name] = node;
    this.hasChildren         = true;
};

Node.prototype.getChild = function (name) {
    return this.children[name];
}