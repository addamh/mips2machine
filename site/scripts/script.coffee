samples =
  js: [
    """
    /* Type here! */

    add $1, $2, $3
    slt $2, $2, $2
    
    """
  ]
  coffee: [
    """
    # Type here!

    00000101
    01000011
    00000010
    01000100
    00000000
    11000011
    00000100
    11000100
    00000100
    01000110
    01100000
    10000111
    00000000
    10001000
    01111000
    00001010
    00000110
    11001010
    00000000
    00000000
    """
  ]

randomFrom = (arr) ->
  arr[parseInt(Math.random() * arr.length)]

# Makes an Ace field out of a given <pre> ID.
#
activate = (id, options) ->
  editor = ace.edit(id)
  s = editor.getSession()

  editor.setTheme "ace/theme/clouds"

  if options.type == "javascript"
    JavaScriptMode = require("ace/mode/javascript").Mode
    editor.getSession().setMode new JavaScriptMode()

  else if options.type == "coffeescript"
    CoffeeMode = require("ace/mode/coffee").Mode
    editor.getSession().setMode new CoffeeMode()

  editor.getSession().setTabSize (options['tabSize'] || 4)
  editor.getSession().setUseSoftTabs true

  editor.renderer.setShowPrintMargin false
  editor.renderer.setHScrollBarAlwaysVisible false
  editor.renderer.setShowGutter false

  editor.setReadOnly true  if options.readonly
  editor.setHighlightActiveLine false  if options.noActiveLine

  editor

activate_mips2machine = ->
  editor = activate("mips2machine_editor", type: "javascript")
  output = activate("mips2machine_output", type: "coffeescript", tabSize: 2, noActiveLine: true)

  onchange = ->
    input = editor.getSession().getValue()

    try
      out = Mips2machine.build(input)
      $("#mips2machine .error").hide()
      output.getSession().setValue out

    catch e
      $("#mips2machine .error").html "#{e}"
      $("#mips2machine .error").show()

  editor.getSession().on "change", onchange
  editor.getSession().setValue randomFrom(samples.js)

  onchange()

coffeejs_is_active = false

activate_machine2mips = ->
  return  if coffeejs_is_active

  coffeejs_is_active = true

  editor = activate("machine2mips_editor", type: "coffeescript", tabSize: 2)
  output = activate("machine2mips_output", type: "javascript", noActiveLine: true)

  onchange = ->
    input = editor.getSession().getValue()

    try
      out = Mips2machine.build(input)
      $("#machine2mips .error").hide()
      output.getSession().setValue out

    catch e
      $("#machine2mips .error").html "#{e}"
      $("#machine2mips .error").show()

  editor.getSession().on "change", onchange
  editor.getSession().setValue randomFrom(samples.coffee)

  onchange()

# Tab switcher
#
$("#tabs a").live "click", ->
  target = $(this).attr("href").substr(1)
  $form  = $("form#" + target)

  # Activate the entry field
  $("#editors form").hide()
  $("##{target}").show()
  activate_machine2mips()  if target == 'machine2mips'

  # Text field focus
  $("##{target} .editor textarea").focus()

  # Activate the tab button
  $("#tabs a").removeClass "active"
  $(this).addClass "active"

  false

# Automatically resize the editor panes
$(window).resize ->
  h = $(window).height() - 95
  h = 500  if h < 500

  $("#editors").css height: h
  $("#editors form").css height: h

# The "more info" button
$("p.more-info a").live 'click', ->
  $("body").animate scrollTop: ($("#info").offset().top - 10), 1000

  false

$(window).trigger 'resize'
$ ->
  activate_mips2machine()
  $("#mips2machine .editor textarea").focus()
  $(window).trigger 'resize'
