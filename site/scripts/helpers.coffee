Helpers = {}

#Usefull Functions
Helpers.checkBin = (n) ->
  /^[01]{1,64}$/.test n
Helpers.checkDec = (n) ->
  /^[0-9]{1,64}$/.test n
Helpers.checkHex = (n) ->
  /^[0-9A-Fa-f]{1,64}$/.test n
Helpers.pad = (s, z) ->
  s = "" + s
  (if s.length < z then Helpers.pad("0" + s, z) else s)
Helpers.unpad = (s) ->
  s = "" + s
  s.replace /^0+/, ""

#Decimal operations
Helpers.Dec2Bin = (n) ->
  return 0  if not Helpers.checkDec(n) or n < 0
  n.toString 2
Helpers.Dec2Hex = (n) ->
  return 0  if not Helpers.checkDec(n) or n < 0
  n.toString 16

#Binary Operations
Helpers.Bin2Dec = (n) ->
  return 0  unless Helpers.checkBin(n)
  parseInt(n, 2).toString 10
Helpers.Bin2Hex = (n) ->
  return 0  unless Helpers.checkBin(n)
  parseInt(n, 2).toString 16

#Hexadecimal Operations
Helpers.Hex2Bin = (n) ->
  return 0  unless Helpers.checkHex(n)
  parseInt(n, 16).toString 2
Helpers.Hex2Dec = (n) ->
  return 0  unless Helpers.checkHex(n)
  parseInt(n, 16).toString 10
  
window.helpers = Helpers