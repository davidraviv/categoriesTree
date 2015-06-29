# Categories Tree

## Basic implementation of Categories Tree

### Usage:
Starting the server:
```
node app.js
```
The API is a very simple GET REST API.

Adding a category to the tree:
```
http://localhost:3000/add?path=fruit.apple&isIterative=true
```
* path: dot separated path elements
* isIterative: true to use iterative implementation, or false to use recursive implementation. Default is false


Printing the tree:
```
http://localhost:3000/printTree
```

Testing:
```
mocha
```


