var UnsupportedError, buildMachine, exports,  _;

_ = this._ || require('underscore');

buildMips = function(str, opts) {
  window.str = str;
  var input_array = str.split("\n");
  var command_array = [];
  var output_string = "";
  var map = {
              0 : "add",
              4 : "addi",
              1 : "sub",
              5 : "subi",
              2 : "and",
              3 : "or",
              7 : "slt",
              8 : "lw",
              c : "sw",
              9 : "bne",
              b : "jmp"
            };
  
  $.each(input_array, function(index, value) {
    // Ignore comment blocks
    var re = new RegExp("^\/.+\/$", "g");
    if(re.test(value) == true || value.length == 0){ return true; }
    if((index+1) % 2 == 0){ 
      instruction = {
        op : value.substring(0, 4),
        rd : value.substring(4, 8),
        rs : input_array[index-1].substring(0, 4),
        rt : input_array[index-1].substring(4, 8)
      }
      command_array.push(instruction);
    }
  });
  
  window.shit = command_array;
  
  $.each(command_array, function(index, value) {

    if(value.op === "0000" && value.rd === "0000" && value.rs === "0000" && value.rt === "0000"){ 
      output_string = output_string + "nop\n";
      return true; 
    }
    
    op = window.helpers.Bin2Hex(value.op);
    rd = window.helpers.Bin2Dec(value.rd);
    rs = window.helpers.Bin2Dec(value.rs);
    rt = window.helpers.Bin2Dec(value.rt);
    
    if(op == "9" || op == "4" || op == "5"){
      mips_instruction = map[op] + " R" + rd + ", R" + rs + ", " + rt + "\n";
    } else if(op == "b"){
      mips_instruction = map[op] + " " + rt +"\n";
    } else if(op == "8" || op == "c"){
      mips_instruction = map[op] + " R" + rd + ", " + rt + "(R" + rs + ")\n";
    } else {
      mips_instruction = map[op] + " R" + rd + ", R" + rs + ", R" + rt + "\n"; 
    }
    output_string = output_string + mips_instruction;
  });


  return output_string;
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
