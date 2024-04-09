sc = require("./index")
assert = require("assert")

describe("status code", function() {
  describe("normalize", function() {
    it("should properly normalize a prefix to the masked format", function() {
      assert.equal(sc.normalize(2), "2xx")
      assert.equal(sc.normalize(20), "20x")
      assert.equal(sc.normalize("2xx"), "2xx")
      assert.equal(sc.normalize("20x"), "20x")
    })
  })
  describe("accept", function() {
    it("should accept status codes, by prefix, when they match", function() {
      assert(sc.accept(200, 2))
      assert(sc.accept(201, 20))
    })
    it("should reject status codes, by prefix, when they don't match", function() {
      assert(!sc.accept(300, 2))
      assert(!sc.accept(301, 20))
      assert(!sc.accept(324, 30))
    })
    it("should support checking multiple ranges of status codes", function() {
      assert(sc.accept(201, 2, 3))
      assert(sc.accept(304, 2, 3))
      assert(sc.accept(201, 20, 30))
      assert(sc.accept(304, 20, 30))
      assert(sc.accept(201, 2, 3, 4))
      assert(!sc.accept(500, 2, 3, 4))
      assert(!sc.accept(500, 20, 30, 40))
    })
    it("should accept status codes, using a mask, then they match", function() {
      assert(sc.accept(200, "2xx"))
      assert(sc.accept(200, "20x"))
      assert(sc.accept(300, "3xx"))
      assert(sc.accept(300, "30x"))
    })
    it("should reject status codes, using a mask, then they don't match", function() {
      assert(sc.accept(200, "2xx"))
      assert(sc.accept(200, "20x"))
      assert(sc.accept(300, "3xx"))
      assert(sc.accept(300, "30x"))
    })
    it("should work for combinations of both", function() {
      assert(sc.accept(200, "2xx", 3))
      assert(sc.accept(200, 2, "3xx"))
      assert(!sc.accept(500, 2, 3, "4xx"))
    })
  })

})

