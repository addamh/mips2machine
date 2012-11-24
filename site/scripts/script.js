(function() {
  var activate, activate_machine2mips, activate_mips2machine, coffeejs_is_active, randomFrom, samples;

  samples = {
    js: ["/* Type here! */\n\nadd $1, $2, $3\nslt $2, $2, $2\n"],
    coffee: ["# Type here!\n\n00000101\n01000011\n00000010\n01000100\n00000000\n11000011\n00000100\n11000100\n00000100\n01000110\n01100000\n10000111\n00000000\n10001000\n01111000\n00001010\n00000110\n11001010\n00000000\n00000000"]
  };

  randomFrom = function(arr) {
    return arr[parseInt(Math.random() * arr.length)];
  };

  activate = function(id, options) {
    var CoffeeMode, editor, s;
    editor = ace.edit(id);
    s = editor.getSession();
    editor.setTheme("ace/theme/clouds");
    if (options.type === "mips") {

    } else if (options.type === "machine") {
      CoffeeMode = require("ace/mode/coffee").Mode;
      editor.getSession().setMode(new CoffeeMode());
    }
    editor.getSession().setTabSize(options['tabSize'] || 4);
    editor.getSession().setUseSoftTabs(true);
    editor.renderer.setShowPrintMargin(false);
    editor.renderer.setHScrollBarAlwaysVisible(false);
    editor.renderer.setShowGutter(true);
    if (options.readonly) {
      editor.setReadOnly(true);
    }
    if (options.noActiveLine) {
      editor.setHighlightActiveLine(false);
    }
    return editor;
  };

  activate_mips2machine = function() {
    var editor, onchange, output;
    editor = activate("mips2machine_editor", {
      type: "mips"
    });
    output = activate("mips2machine_output", {
      type: "machine",
      tabSize: 2,
      noActiveLine: true
    });
    onchange = function() {
      var input, out;
      input = editor.getSession().getValue();
      try {
        out = Mips2machine.build(input);
        $("#mips2machine .error").hide();
        return output.getSession().setValue(out);
      } catch (e) {
        $("#mips2machine .error").html("" + e);
        return $("#mips2machine .error").show();
      }
    };
    editor.getSession().on("change", onchange);
    editor.getSession().setValue(randomFrom(samples.js));
    return onchange();
  };

  coffeejs_is_active = false;

  activate_machine2mips = function() {
    var editor, onchange, output;
    if (coffeejs_is_active) {
      return;
    }
    coffeejs_is_active = true;
    editor = activate("machine2mips_editor", {
      type: "machine",
      tabSize: 2
    });
    output = activate("machine2mips_output", {
      type: "mips",
      noActiveLine: true
    });
    onchange = function() {
      var input, out;
      input = editor.getSession().getValue();
      try {
        out = Mips2machine.build(input);
        $("#machine2mips .error").hide();
        return output.getSession().setValue(out);
      } catch (e) {
        $("#machine2mips .error").html("" + e);
        return $("#machine2mips .error").show();
      }
    };
    editor.getSession().on("change", onchange);
    editor.getSession().setValue(randomFrom(samples.coffee));
    return onchange();
  };

  $("#tabs a.tab").live("click", function() {
    var $form, target;
    target = $(this).attr("href").substr(1);
    $form = $("form#" + target);
    $("#editors form").hide();
    $("#" + target).show();
    if (target === 'machine2mips') {
      activate_machine2mips();
    }
    $("#" + target + " .editor textarea").focus();
    $("#tabs a.tab").removeClass("active");
    $(this).addClass("active");
    return false;
  });

  $(window).resize(function() {
    var h;
    h = $(window).height() - 95;
    if (h < 500) {
      h = 500;
    }
    $("#editors").css({
      height: h
    });
    return $("#editors form").css({
      height: h
    });
  });

  $("li.more-info a").live('click', function() {
    $("body").animate({
      scrollTop: $("#app_info").offset().top - 10
    }, 1000);
    return false;
  });

  $(window).trigger('resize');

  $(function() {
    activate_mips2machine();
    $("#mips2machine .editor textarea").focus();
    return $(window).trigger('resize');
  });

}).call(this);
