var UnsupportedError, buildMachine, exports,  _;

_ = this._ || require('underscore');

buildMachine = function(str, opts) {
  
  window.shit = str;
  var input_array = str.split("\n");
  var command_array = [];
  var output_string = "";
  var map = {
              add  : "0", 
              addi : "4", 
              sub  : "1", 
              subi : "5", 
              and  : "2", 
              or   : "3", 
              slt  : "7", 
              lw   : "8", 
              sw   : "C", 
              bne  : "9", 
              jmp  : "B"
            };
  
  $.each(input_array, function(index, value) {
    // Ignore comment blocks
    var re = new RegExp("^\/.+\/$", "g");
    if(re.test(value) == true || value.length == 0){ return true; }
    command_array.push(value)
  });
  
  $.each(command_array, function(index, value) {
    pieces = value.split(" ");
    pattern = /^\$|^R/g;
    if(pieces.length == 4 && pattern.test(pieces[3]) === true){ // R-Type
      op = pieces[0];
      if(map[op] === undefined){
        throw new UnsupportedError(op + " not implemented on " + value);
      }
      
      /*
      00000101 05
      01000011 43
      
      Instruction -> 4305
      */
      
      rd = parseInt(pieces[1].replace(",","").replace("$", "").replace("R", ""));
      if(rd % 1 != 0){
        throw new UnsupportedError(rd + " is not a number on " + value);
      }

      rs = parseInt(pieces[2].replace(",","").replace("$", "").replace("R", ""));
      if(rs % 1 != 0){
        throw new UnsupportedError(rs + " is not a number on " + value);
      }
      
      rt = parseInt(pieces[3].replace(",","").replace("$", "").replace("R", ""));
      if(rt % 1 != 0){
        throw new UnsupportedError(rt + " is not a number on " + value);
      }
      
      // Break into binary instructions
      op_bin = window.helpers.pad(window.helpers.Hex2Bin(map[op]), 4)
      rd_bin = window.helpers.pad(window.helpers.Dec2Bin(rd), 4)
      rs_bin = window.helpers.pad(window.helpers.Dec2Bin(rs), 4)
      rt_bin = window.helpers.pad(window.helpers.Dec2Bin(rt), 4)

      bin_command = ""+rs_bin+rt_bin+"\n"+op_bin+rd_bin+"\n";

      output_string = output_string + bin_command;
      
    } else if(pieces.length == 4 && pattern.test(pieces[3]) === false){ // I-Type
      op = pieces[0];
      if(map[op] === undefined){
        throw new UnsupportedError(op + " not implemented on " + value);
      }
      
      /*
      00000101 05
      01000011 43
      
      Instruction -> 4305
      */
      
      rd = parseInt(pieces[1].replace(",","").replace("$", "").replace("R", ""));
      if(rd % 1 != 0){
        throw new UnsupportedError(rd + " is not a number on " + value);
      }

      rs = parseInt(pieces[2].replace(",","").replace("$", "").replace("R", ""));
      if(rs % 1 != 0){
        throw new UnsupportedError(rs + " is not a number on " + value);
      }
      
      imm = parseInt(pieces[3]);
      if(imm % 1 != 0){
        throw new UnsupportedError(rt + " is not a number on " + value);
      }
      
      // Break into binary instructions
      op_bin = window.helpers.pad(window.helpers.Hex2Bin(map[op]), 4)
      rd_bin = window.helpers.pad(window.helpers.Dec2Bin(rd), 4)
      rs_bin = window.helpers.pad(window.helpers.Dec2Bin(rs), 4)
      imm_bin = window.helpers.pad(window.helpers.Dec2Bin(imm), 4)

      bin_command = ""+rs_bin+imm_bin+"\n"+op_bin+rd_bin+"\n";

      output_string = output_string + bin_command;
    }
  });
  
  return output_string;
};

UnsupportedError = (function() {

  function UnsupportedError(str) {
    this.message = str;
  }

  UnsupportedError.prototype.toString = function() {
    return this.message;
  };

  return UnsupportedError;

})();

this.Mips2machine = exports = {
  VERSION: '0.1.0',
  build: buildMachine,
  UnsupportedError: UnsupportedError
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = exports;
}
