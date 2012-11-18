var Builder, Code, Node, Transformer, Typenames, Types, UnsupportedError, blockTrim, buildMips, exports, indentLines, isSingleLine, ltrim, p, paren, parser, rtrim, strEscape, strRepeat, trim, truthy, unreserve, unshift, _, _ref, _ref1,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

buildMips = function(str, opts) {
  return "SHIT MIPS";
};

UnsupportedError = (function() {

  function UnsupportedError(str, src) {
    this.message = str;
    this.cursor = src.start;
    this.line = src.lineno;
    this.source = src.tokenizer.source;
  }

  UnsupportedError.prototype.toString = function() {
    return this.message;
  };

  return UnsupportedError;

})();

this.Machine2mips = exports = {
  VERSION: '0.1.0',
  build: buildMips,
  UnsupportedError: UnsupportedError
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = exports;
}
