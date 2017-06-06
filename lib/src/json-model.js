"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonModelProperty = function (target, key) {
    var getter = function () {
        return this.__JsonModel__values[key];
    };
    var setter = function (newValue) {
        this.__JsonModel__values[key] = newValue;
        this.__JsonModel__history.push(this.toJson());
    };
    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: false,
        });
    }
};
var JsonModel = (function () {
    function JsonModel(json) {
        this.__JsonModel__original = json;
        this.__JsonModel__history = [];
        this.__JsonModel__values = {};
    }
    JsonModel.prototype.toJson = function () {
        var _this = this;
        return Object.keys(this.__JsonModel__values).reduce(function (json, key) {
            return (__assign({}, json, (_a = {}, _a[key] = (_this.__JsonModel__values)[key], _a)));
            var _a;
        }, {});
    };
    return JsonModel;
}());
exports.JsonModel = JsonModel;
