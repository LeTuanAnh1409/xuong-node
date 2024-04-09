# Status Code
Validate 3 digit status codes from text protocols (like HTTP, FTP, etc) using prefixes or simple strings

## How?
```JavaScript
var sc = require("statuscode")
// want to accept

var myStatusCode = resp.statusCode
// check for 2xx status codes using the prefix
var isValid = sc.accept(myStatusCode, 2)
// or like this
isValid = sc.accept(myStatusCode, "2xx")

// or only accept 20x
isValid = sc.accept(myStatusCode, 20)
// naturally also with text support
isValid = sc.accept(myStatusCode, "20x")


// want to accept 200 and 300?
isValid = sc.accept(myStatusCode, 2, 3)
// or this
isValid = sc.accept(myStatusCode, "2xx", "3xx")
```

