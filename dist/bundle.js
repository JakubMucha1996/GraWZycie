(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Board = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = require("./Cell.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(xCells, yCells) {
        var cellSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.gridSize;

        _classCallCheck(this, Board);

        this.xCells = xCells;
        this.yCells = yCells;
        this.cellSize = cellSize;
        this.cellsArray = Array(yCells).fill(0).map(function (line, yIndex) {
            return Array(xCells).fill(0).map(function (cell, xIndex) {
                return new _Cell.Cell(xIndex, yIndex, 0, "#FFFFFF");
            });
        });

        // console.log(this.cellsArray);
    }

    _createClass(Board, [{
        key: "drawGrid",
        value: function drawGrid() {
            var _this = this;

            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.canvas.width;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.canvas.height;

            this.cellsArray.forEach(function (line, yCells) {
                var y = yCells * _this.cellSize;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            });

            this.cellsArray[0].forEach(function (column, xCells) {
                var x = xCells * _this.cellSize;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            });
            ctx.strokeStyle = 'grey';
            ctx.stroke();
        }
    }]);

    return Board;
}();
},{"./Cell.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = exports.Cell = function () {
    function Cell(x, y, val) {
        _classCallCheck(this, Cell);

        this.x = x;
        this.y = y;
        this.val = val;
        this.setColor();
    }

    _createClass(Cell, [{
        key: "toString",
        value: function toString() {
            return this.val;
        }
    }, {
        key: "setColor",
        value: function setColor() {
            if (this.val == 1) {
                this.color = "#000000";
            } else {
                this.color = "#ffffff";
            }
        }
    }, {
        key: "click",
        value: function click() {
            this.val = !this.val;
            this.setColor();
            this.drawCell();
            return this;
        }
    }, {
        key: "drawCell",
        value: function drawCell() {
            var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.gridSize;
            var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.ctx;

            // console.log(this);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x * size, this.y * size, size, size);
            return this;
        }
    }, {
        key: "nextTourValue",
        value: function nextTourValue() {
            if (this.val == 1) {
                if (this.getNeighbourCount() > 3 || this.getNeighbourCount() < 2) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                if (this.getNeighbourCount() == 3) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }, {
        key: "getNeighbourCount",
        value: function getNeighbourCount() {
            var mod = function mod(x, n) {
                return (x % n + n) % n;
            }; //modulo func for negative nbs;
            var cells = [[[]]];
            var neigbours = 0;

            if (window.periodity) {
                neigbours = 0;
                for (var i = -1; i <= 1; i++) {
                    cells[i + 1] = [[]];
                    for (var j = -1; j <= 1; j++) {
                        cells[i + 1][j + 1] = [];
                        cells[i + 1][j + 1][0] = mod(this.y + i, window.yCells);
                        cells[i + 1][j + 1][1] = mod(this.x + j, window.xCells);

                        if (window.board.cellsArray[cells[i + 1][j + 1][0]][cells[i + 1][j + 1][1]].val == 1 && (i != 0 || j != 0)) {
                            ++neigbours;
                        }
                    }
                }
                // console.log(cells);
                // console.log("X:" + this.x + "Y:" + this.y + "Nbours:" + neigbours);
            } else {
                neigbours = 0;
                for (var _i = -1; _i <= 1; _i++) {
                    cells[_i + 1] = [[]];
                    for (var _j = -1; _j <= 1; _j++) {
                        cells[_i + 1][_j + 1] = [];
                        cells[_i + 1][_j + 1][0] = this.y + _i;
                        cells[_i + 1][_j + 1][1] = this.x + _j;
                        if (cells[_i + 1][_j + 1][0] > -1 && cells[_i + 1][_j + 1][1] > -1 && cells[_i + 1][_j + 1][0] < window.yCells && cells[_i + 1][_j + 1][1] < window.xCells && window.board.cellsArray[cells[_i + 1][_j + 1][0]][cells[_i + 1][_j + 1][1]].val == 1 && (_i != 0 || _j != 0)) {
                            ++neigbours;
                        }
                    }
                }
                // console.log(cells);
                // console.log("X:" + this.x + "Y:" + this.y + "!peroidityNbours:" + neigbours);
            }
            return neigbours;
        }
    }]);

    return Cell;
}();
},{}],3:[function(require,module,exports){
"use strict";

var _Cell = require("./Cell");

var _Board = require("./Board");

window.start = function () {
    window.xCells = document.getElementById("xCells").valueAsNumber;
    window.yCells = document.getElementById("yCells").valueAsNumber;
    window.gridSize = (window.innerWidth - 35) / xCells;
    window.canvas = document.getElementById("workingCanvas");
    window.ctx = canvas.getContext("2d");
    window.canvas.width = xCells * window.gridSize;
    window.canvas.height = yCells * window.gridSize;
    window.setPeroidity();
    window.speed = 1000 / document.getElementById("speedMultiplier").valueAsNumber;

    window.board = new _Board.Board(window.xCells, window.yCells, window.gridSize);

    board.drawGrid();
};

window.setPeroidity = function () {
    window.periodity = document.getElementById("peroid").checked;
};
var game;

window.run = function () {
    if (!game) {
        game = setInterval(function () {
            window.board.cellsArray = window.board.cellsArray.map(function (line, yIndex) {
                return line.map(function (cell, xIndex) {
                    return new _Cell.Cell(xIndex, yIndex, cell.nextTourValue());
                });
            });
            window.board.cellsArray.forEach(function (line) {
                return line.forEach(function (cell) {
                    return cell.drawCell();
                });
            });
            board.drawGrid();
        }, 1000 / document.getElementById("speedMultiplier").valueAsNumber);
        document.getElementById("startBtn").textContent = "STOP";
    } else {
        clearInterval(game);
        game = null;
        document.getElementById("startBtn").textContent = "Start";
    }
};

window.initState = function (i, j) {
    var type = document.getElementById("InitState").options[document.getElementById("InitState").selectedIndex].value;

    if (i != null && j != null) switch (type) {
        case "niezmienny":
            {
                window.board.cellsArray[i][j + 1].click();
                window.board.cellsArray[i][j + 2].click();
                window.board.cellsArray[i + 1][j].click();
                window.board.cellsArray[i + 1][j + 3].click();
                window.board.cellsArray[i + 2][j + 1].click();
                window.board.cellsArray[i + 2][j + 2].click();
            }
            break;
        case "oscy":
            {
                window.board.cellsArray[i][j + 1].click();
                window.board.cellsArray[i][j + 2].click();
                window.board.cellsArray[i][j + 3].click();
            }
            break;
        case "glider":
            {
                window.board.cellsArray[i][j + 1].click();
                window.board.cellsArray[i][j + 2].click();
                window.board.cellsArray[i + 1][j].click();
                window.board.cellsArray[i + 1][j + 1].click();
                window.board.cellsArray[i + 2][j + 2].click();
            }
            break;
        case "rand":
            {
                for (var k = i; k < i + 10; k++) {
                    for (var l = j; l < j + 10; l++) {
                        if (Math.floor(Math.random() * 2)) window.board.cellsArray[k][l].click();
                    }
                }
            }
            break;
        case "cell":
            {
                window.board.cellsArray[i][j].click();
            }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    start();
    document.getElementById("workingCanvas").addEventListener('click', function (event) {

        var xClickIndex = Math.floor(getCursorPosition(window.canvas, event)[0] / window.gridSize);
        var yClickIndex = Math.floor(getCursorPosition(window.canvas, event)[1] / window.gridSize);
        // console.log(`x:${xClickIndex} y:${yClickIndex}`);
        // console.log(window.board.cellsArray);


        //window.board.cellsArray[yClickIndex][xClickIndex].click().getNeighbourCount();
        initState(yClickIndex, xClickIndex);
    }, false);
});

function getCursorPosition(canvas, event) {
    var x, y;

    var canoffset = canvas.getBoundingClientRect();
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

    return [x, y];
}
},{"./Board":1,"./Cell":2}]},{},[3]);
