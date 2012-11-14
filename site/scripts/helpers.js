(function() {
  var Helpers;

  Helpers = {};

  Helpers.checkBin = function(n) {
    return /^[01]{1,64}$/.test(n);
  };

  Helpers.checkDec = function(n) {
    return /^[0-9]{1,64}$/.test(n);
  };

  Helpers.checkHex = function(n) {
    return /^[0-9A-Fa-f]{1,64}$/.test(n);
  };

  Helpers.pad = function(s, z) {
    s = "" + s;
    if (s.length < z) {
      return Helpers.pad("0" + s, z);
    } else {
      return s;
    }
  };

  Helpers.unpad = function(s) {
    s = "" + s;
    return s.replace(/^0+/, "");
  };

  Helpers.Dec2Bin = function(n) {
    if (!Helpers.checkDec(n) || n < 0) {
      return 0;
    }
    return n.toString(2);
  };

  Helpers.Dec2Hex = function(n) {
    if (!Helpers.checkDec(n) || n < 0) {
      return 0;
    }
    return n.toString(16);
  };

  Helpers.Bin2Dec = function(n) {
    if (!Helpers.checkBin(n)) {
      return 0;
    }
    return parseInt(n, 2).toString(10);
  };

  Helpers.Bin2Hex = function(n) {
    if (!Helpers.checkBin(n)) {
      return 0;
    }
    return parseInt(n, 2).toString(16);
  };

  Helpers.Hex2Bin = function(n) {
    if (!Helpers.checkHex(n)) {
      return 0;
    }
    return parseInt(n, 16).toString(2);
  };

  Helpers.Hex2Dec = function(n) {
    if (!Helpers.checkHex(n)) {
      return 0;
    }
    return parseInt(n, 16).toString(10);
  };

  window.helpers = Helpers;

}).call(this);
