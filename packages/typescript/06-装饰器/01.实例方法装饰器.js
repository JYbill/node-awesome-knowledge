"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Description: class实例方法装饰器
 * @Author: 小钦var
 * @Date: 2023/3/18 11:27
 */
var Person = function () {
    var _a;
    var _staticExtraInitializers = [];
    var _instanceExtraInitializers = [];
    var _static_talk_decorators;
    var _say_decorators;
    var _lookThis_decorators;
    var _do_decorators;
    return _a = /** @class */ (function () {
            function Person(name) {
                this.name = (__runInitializers(this, _instanceExtraInitializers), name);
            }
            Person.prototype.say = function (word) {
                console.log("say: ", word);
                return word;
            };
            Person.talk = function (word) {
                console.log("say: ", word);
                return word;
            };
            Person.prototype.lookThis = function () {
                console.log("指向：", this);
            };
            Person.prototype.noBindLookThis = function () {
                console.log("未绑定指向", this);
            };
            Person.prototype.do = function (studyType) {
                console.log("我是do内容", studyType);
                return studyType + 1;
            };
            return Person;
        }()),
        (function () {
            _say_decorators = [logger];
            _static_talk_decorators = [logger];
            _lookThis_decorators = [bindThis];
            _do_decorators = [CustomLogger("xiaoqinvar Logger")];
            __esDecorate(_a, null, _static_talk_decorators, { kind: "method", name: "talk", static: true, private: false, access: { has: function (obj) { return "talk" in obj; }, get: function (obj) { return obj.talk; } } }, null, _staticExtraInitializers);
            __esDecorate(_a, null, _say_decorators, { kind: "method", name: "say", static: false, private: false, access: { has: function (obj) { return "say" in obj; }, get: function (obj) { return obj.say; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _lookThis_decorators, { kind: "method", name: "lookThis", static: false, private: false, access: { has: function (obj) { return "lookThis" in obj; }, get: function (obj) { return obj.lookThis; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _do_decorators, { kind: "method", name: "do", static: false, private: false, access: { has: function (obj) { return "do" in obj; }, get: function (obj) { return obj.do; } } }, null, _instanceExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
}();
exports.default = Person;
/**
 * @param originMethod 原始方法
 * @param _ctx 该方法的上下文信息：类型、方法名、是否是私有方法...
 */
function logger(originMethod, _ctx) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("LOGGER: before");
        console.log("this", this);
        console.log("args", args);
        var res = originMethod.call(undefined, "哈哈");
        console.log("res", res);
        console.log("LOGGER: after");
        return res;
    };
}
function bindThis(originMethod, _ctx) {
    var methodName = _ctx.name;
    // ⚠️ 它会在其他字段初始化之前添加逻辑
    _ctx.addInitializer(function () {
        this[methodName] = this[methodName].bind(this);
    });
}
function CustomLogger(prefix) {
    if (prefix === void 0) { prefix = "LOGGER"; }
    return function (originMethod, _ctx) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("".concat(prefix, ": before"));
            var res = originMethod.call.apply(originMethod, __spreadArray([this], args, false));
            console.log("".concat(prefix, ": res ").concat(res));
            console.log("".concat(prefix, ": after"));
            return res;
        };
    };
}
function main() {
    /* 实例方法 */
    // const person = new Person("xqv");
    // person.say("test");
    /* 静态方法 */
    // Person.talk("测试");
    /* ctx上下文的addInitializer方法 */
    // const person = new Person("小青蛙");
    // const look = person.lookThis;
    // look(); // Person { ... }
    // const noBindLook = person.noBindLookThis;
    // noBindLook(); // undefined
    /* 构造器函数 */
    // const person = new Person("");
    // person.do("学习ts5");
    // xiaoqinvar Logger: before
    // 我是do内容 学习ts5
    // xiaoqinvar Logger: res 学习ts51
    // xiaoqinvar Logger: after
}
main();
