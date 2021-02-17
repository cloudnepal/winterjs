// |reftest| shell-option(--enable-private-methods) skip-if(!xulRuntime.shell) async -- requires shell-options
// This file was procedurally generated from the following sources:
// - src/async-functions/returns-async-function-returns-newtarget.case
// - src/async-functions/evaluation/async-class-expr-static-private-method.template
/*---
description: Async function returns an async function. (Static private async method as a ClassExpression element)
esid: prod-AsyncMethod
features: [async-functions, class-static-methods-private]
flags: [generated, async]
info: |
    ClassElement :
      static PrivateMethodDefinition

    MethodDefinition :
      AsyncMethod

    Async Function Definitions

    AsyncMethod :
      async [no LineTerminator here] # PropertyName ( UniqueFormalParameters ) { AsyncFunctionBody }

---*/
let count = 0;


var C = class {
  static async #method(x) {
    return async function() { return new.target; };
  }
  static async method(x) {
    return this.#method(x);
  }
}
// Stores a reference `asyncFn` for case evaluation
let asyncFn = C.method.bind(C);

asyncFn(1).then(retFn => {
  count++;
  return retFn();
}).then(result => {
  assert.sameValue(result, undefined);
  assert.sameValue(count, 1);
}).then($DONE, $DONE);
