parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QCba":[function(require,module,exports) {
"use strict";var e=function(){function e(){var t=document.getElementById("ticks");e.showResult(t)}return e.prototype.doWork=function(t){var n=t.target;if(e.isTickInput(n)){var i=n;e.showResult(i)}},e.showResult=function(t){var n=e.getTickInputValueAsNumber(t),i=document.getElementById("datetime");if(i){var r=e.parseTicks(n);if(r){var s=(r=r.replace(/([0-9]+)/g,"<b>$1</b>")).indexOf("T"),u=r.substr(0,s),a=r.substr(s+1);i.innerHTML=u+"<span class='pad'>T</span>"+a}}},e.parseTicks=function(t){if(isNaN(t))return"____-__-__T__:__:__.____Z";var n=(t-e.epochTicks)/e.ticksPerMillisecond;return n>e.maxDateMilliseconds?"9999-99-99T99:99:99:9999Z":new Date(n).toISOString()},e.isTickInput=function(e){return"INPUT"==e.tagName&&"ticks"==e.id},e.getTickInputValueAsNumber=function(e){var t=e.value;return Number(t)},e.epochTicks=621355968e9,e.ticksPerMillisecond=1e4,e.maxDateMilliseconds=864e13,e}();window.onload=function(){var t=new e;document.addEventListener("keyup",t.doWork)};
},{}]},{},["QCba"], null)
//# sourceMappingURL=src.0b68d832.js.map