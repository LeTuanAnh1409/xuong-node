var CODE_LENGTH = 3

function normalize(code) {
}

function check(toCheck, accept) {
  toCheck = toCheck + ''
  if (toCheck.length !== accept.length) {
    return false
  }
  for (var i = 0; i < toCheck.length; i++) {
    if (accept.charAt(i) === "x") {
      continue
    } else if (toCheck.charAt(i) === accept.charAt(i)) {
      continue
    } else {
      return false
    }
  }
  return true
}

var normalize = module.exports.normalize = function(code) {
  code = code + ""
  return code.length === CODE_LENGTH ? code : code + new Array(CODE_LENGTH - code.length + 1).join("x")
}

var accept = module.exports.accept = function() {
  var args = Array.prototype.slice.call(arguments)
  var toCheck = args.shift()
  var checkVals = args.map(normalize).map(check.bind(this, toCheck))
  for (var i = 0; i < checkVals.length; i++) {
    if (checkVals[i]) return true
  }
  return false
}
