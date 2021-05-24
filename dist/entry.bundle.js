/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tsg = __webpack_require__(1);
var cos = Math.cos, sin = Math.sin, pi = Math.PI;
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.create = function (x, y) {
        return new Vector(x, y);
    };
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    };
    Vector.prototype.sub = function (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    };
    Vector.prototype.mul = function (s) {
        return new Vector(this.x * s, this.y * s);
    };
    Vector.prototype.perp = function () {
        return new Vector(this.y, -this.x);
    };
    Vector.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.norm = function () {
        return this.mul(1 / this.mag());
    };
    Vector.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector.prototype.neg = function () {
        return new Vector(-this.x, -this.y);
    };
    Vector.prototype.moveTo = function (ctx) {
        ctx.moveTo(this.x, this.y);
        return this;
    };
    Vector.prototype.lineTo = function (ctx) {
        ctx.lineTo(this.x, this.y);
        return this;
    };
    Vector.prototype.label = function (ctx, caption) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
        ctx.font = "Arial 10px";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(caption, this.x - 10, this.y - 10);
        return this;
    };
    return Vector;
}());
var XZ = 100;
var toRadians = pi / 180;
var toDegrees = 180 / pi;
var X = new Vector(30, 30);
var Y = new Vector(230, 30);
var Z = new Vector(30, 30 + XZ);
var MyScene = {
    setup: function () {
        this.W = new Vector(230 + XZ * cos(pi - toRadians * 140), 30 + XZ * sin(pi - toRadians * 140));
        this.lockRadius = true;
    },
    update: function (ctx, time, size) {
        this.size = size;
        ctx.fillStyle = "#EEE";
        ctx.fillRect(0, 0, size.width, size.height);
        ctx.strokeStyle = "black";
        ctx.save();
        ctx.translate(160, 260);
        ctx.beginPath();
        var W = this.W;
        X.label(ctx, 'X');
        Y.label(ctx, 'Y');
        Z.label(ctx, 'Z');
        W.label(ctx, 'W');
        X.moveTo(ctx);
        Y.lineTo(ctx);
        X.moveTo(ctx);
        Z.lineTo(ctx);
        Y.moveTo(ctx);
        W.lineTo(ctx);
        W.moveTo(ctx);
        Z.lineTo(ctx);
        var P = Z.add(W.sub(Z).mul(.5)).moveTo(ctx).label(ctx, 'P');
        var Pa = Z.add(W.sub(Z).mul(.5)).add(W.sub(Z).perp().mul(-2)).moveTo(ctx).label(ctx, 'P');
        var Pp = Z.add(W.sub(Z).mul(.5)).add(W.sub(Z).perp().mul(2)).lineTo(ctx).label(ctx, 'Pp');
        var Q = X.add(Y.sub(X).mul(.5)).add(Y.sub(X).perp().mul(0)).moveTo(ctx).label(ctx, 'Q');
        var Qa = X.add(Y.sub(X).mul(.5)).add(Y.sub(X).perp().mul(-2)).moveTo(ctx).label(ctx, 'Qa');
        var Qp = X.add(Y.sub(X).mul(.5)).add(Y.sub(X).perp().mul(2)).lineTo(ctx).label(ctx, 'Qp');
        var A1 = Pp.y - Pa.y;
        var B1 = Pa.x - Pp.x;
        var C1 = A1 * Pa.x + B1 * Pa.y;
        var A2 = Qp.y - Qa.y;
        var B2 = Qa.x - Qp.x;
        var C2 = A2 * Qa.x + B2 * Qa.y;
        var det = A1 * B2 - A2 * B1;
        if (det == 0) {
        }
        else {
            var ix = (B2 * C1 - B1 * C2) / det;
            var iy = (A1 * C2 - A2 * C1) / det;
        }
        var I = new Vector(ix, iy).label(ctx, 'I');
        X.moveTo(ctx);
        I.lineTo(ctx);
        Y.moveTo(ctx);
        I.lineTo(ctx);
        Z.moveTo(ctx);
        I.lineTo(ctx);
        W.moveTo(ctx);
        I.lineTo(ctx);
        ctx.stroke();
        ctx.restore();
    },
    mousemove: function (ev) {
        if (ev.buttons) {
            var ang = Math.round(Math.acos(X.sub(Y).norm().dot(this.W.sub(Y).norm())) * toDegrees);
            this.angle.innerHTML = "∡XYW =  " + ang + "°";
            this.angle.innerHTML += "<br> <span style='text-decoration: overline;'>XZ</span> = 100";
            this.angle.innerHTML += "<br> <span style='text-decoration: overline;'>YW</span> = " + Math.round(this.W.sub(Y).mag());
            var M = new Vector(ev.offsetX - 160, ev.offsetY - 260);
            this.W = M.sub(new Vector(230, 30));
            if (this.lockRadius)
                this.W = this.W.norm().mul(100);
            this.W = this.W.add(new Vector(230, 30));
        }
    },
    p: HTMLElement,
    overlayUI: function (dom) {
        this.angle = document.createElement('p');
        var ang = Math.round(Math.acos(X.sub(Y).norm().dot(this.W.sub(Y).norm())) * toDegrees);
        this.angle.innerHTML = "∡XYW =  " + ang + "°";
        this.angle.innerHTML += "<br> <span style='text-decoration: overline;'>XZ</span> = 100";
        this.angle.innerHTML += "<br> <span style='text-decoration: overline;'>YW</span> = " + Math.round(this.W.sub(Y).mag());
        this.angle.style.userSelect = "none";
        this.angle.style.marginTop = "10px";
        this.angle.style.marginLeft = "10px";
        dom.appendChild(this.angle);
        var LR_Label = document.createElement("span");
        LR_Label.innerText = "lock radius";
        LR_Label.style.marginLeft = "10px";
        dom.appendChild(LR_Label);
        this.lockRadiusInput = document.createElement("input");
        this.lockRadiusInput.type = "checkbox";
        this.lockRadiusInput.checked = true;
        this.lockRadiusInput.addEventListener('change', (function (ev) {
            this.lockRadius = ev.target.checked;
        }).bind(this));
        dom.appendChild(this.lockRadiusInput);
    },
    ui: function (dom) {
    }
};
tsg.run(MyScene, { w: 0, h: 0 }, 1);
//# sourceMappingURL=scene.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.run = function (scene, size, quality) {
    var width, height;
    function setCanvasDimensions() {
        if (size.w == 0)
            width = document.body.clientWidth;
        else
            width = size.w;
        if (size.h == 0)
            height = document.body.clientHeight;
        else
            height = size.h;
        canvas.width = res * width;
        canvas.height = res * height;
    }
    var cumulativeOffset = function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return {
            top: top,
            left: left
        };
    };
    function anim() {
        ctx.save();
        ctx.scale(res, res);
        scene.update(ctx, { elapsed: (Date.now() - initTime) / 1000, delta: (Date.now() - prevTime) / 1000 }, { width: width, height: height });
        ctx.restore();
        prevTime = Date.now();
        window.requestAnimationFrame(anim);
    }
    var canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    if (size.w)
        canvas.style.width = size.w + "px";
    else
        canvas.style.width = "100vw";
    if (size.h)
        canvas.style.height = size.h + "px";
    else
        canvas.style.height = "100vh";
    document.body.appendChild(canvas);
    var overlay = document.createElement("div");
    overlay.style.width = canvas.style.width;
    overlay.style.height = canvas.style.height;
    overlay.style.position = "absolute";
    var offset = cumulativeOffset(canvas);
    overlay.style.top = offset.top + "px";
    overlay.style.left = offset.left + "px";
    overlay.style.width = canvas.offsetWidth + "px";
    overlay.style.height = canvas.offsetHeight + "px";
    overlay.style.overflow = "scroll";
    document.body.appendChild(overlay);
    var res = quality;
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    var ctx = canvas.getContext('2d');
    scene.setup();
    scene.overlayUI(overlay);
    scene.ui(document.body);
    var initTime = Date.now();
    var prevTime = Date.now();
    window.requestAnimationFrame(anim);
    for (var i in window) {
        if (i.substring(0, 2) == "on") {
            var eventName = i.substring(2);
            if (scene[eventName])
                document.body.addEventListener(eventName, scene[eventName].bind(scene));
        }
    }
};
//# sourceMappingURL=tsg.js.map

/***/ })
/******/ ]);
