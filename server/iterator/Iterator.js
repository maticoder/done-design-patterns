"use strict";
exports.__esModule = true;
exports.Iterator = void 0;
var Iterator = /** @class */ (function () {
    function Iterator(items) {
        this.index = 0;
        this.items = items;
    }
    Iterator.prototype.first = function () {
        this.reset();
        return this.next();
    };
    Iterator.prototype.next = function () {
        return this.items[this.index++];
    };
    Iterator.prototype.hasNext = function () {
        return this.index <= this.items.length;
    };
    Iterator.prototype.reset = function () {
        this.index = 0;
    };
    Iterator.prototype.each = function (callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    };
    return Iterator;
}());
exports.Iterator = Iterator;
