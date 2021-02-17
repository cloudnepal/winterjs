// |reftest| shell-option(--enable-private-fields) skip-if(!xulRuntime.shell) async -- requires shell-options
// This file was procedurally generated from the following sources:
// - src/class-elements/private-field-usage.case
// - src/class-elements/productions/cls-expr-after-same-line-static-async-method.template
/*---
description: PrivateName CallExpression usage (private field) (field definitions after a static async method in the same line)
esid: prod-FieldDefinition
features: [class-fields-private, class, class-fields-public, async-functions]
flags: [generated, async]
includes: [propertyHelper.js]
info: |
    Updated Productions

    CallExpression[Yield, Await]:
      CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await]
      SuperCall[?Yield, ?Await]
      CallExpression[?Yield, ?Await]Arguments[?Yield, ?Await]
      CallExpression[?Yield, ?Await][Expression[+In, ?Yield, ?Await]]
      CallExpression[?Yield, ?Await].IdentifierName
      CallExpression[?Yield, ?Await]TemplateLiteral[?Yield, ?Await]
      CallExpression[?Yield, ?Await].PrivateName

---*/


var C = class {
  static async m() { return 42; } #m = 'test262';;
  method() {
    return this.#m;
  }
}

var c = new C();

assert.sameValue(Object.hasOwnProperty.call(c, "m"), false);
assert.sameValue(Object.hasOwnProperty.call(C.prototype, "m"), false);

verifyProperty(C, "m", {
  enumerable: false,
  configurable: true,
  writable: true,
}, {restore: true});

C.m().then(function(v) {
  assert.sameValue(v, 42);

  function assertions() {
    // Cover $DONE handler for async cases.
    function $DONE(error) {
      if (error) {
        throw new Test262Error('Test262:AsyncTestFailure')
      }
    }
    assert.sameValue(c.method(), 'test262');
  }

  return Promise.resolve(assertions());
}).then($DONE, $DONE);
