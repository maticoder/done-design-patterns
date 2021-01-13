"use strict";
exports.__esModule = true;
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.subscribe = function (f) {
        this.observers.push(f);
    };
    Observable.prototype.unsubscribe = function (f) {
        this.observers = this.observers.filter(function (subscriber) { return subscriber !== f; });
    };
    Observable.prototype.notify = function (state) {
        this.observers.forEach(function (observer) { return observer(state); });
    };
    return Observable;
}());
exports["default"] = Observable;
