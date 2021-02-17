// This file was procedurally generated from the following sources:
// - src/computed-property-names/computed-property-name-from-condition-expression-false.case
// - src/computed-property-names/evaluation/class-declaration-fields.template
/*---
description: Computed property name from condition expression (ComputedPropertyName in ClassExpression)
esid: prod-ComputedPropertyName
features: [computed-property-names, class-fields-public, class-static-fields-public]
flags: [generated]
info: |
    ClassExpression:
      classBindingIdentifier opt ClassTail

    ClassTail:
      ClassHeritage opt { ClassBody opt }

    ClassBody:
      ClassElementList

    ClassElementList:
      ClassElement

    ClassElement:
      MethodDefinition

    MethodDefinition:
      PropertyName ...
      get PropertyName ...
      set PropertyName ...

    PropertyName:
      ComputedPropertyName

    ComputedPropertyName:
      [ AssignmentExpression ]
---*/


let C = class {
  [false ? 1 : 2] = 1;

  static [false ? 1 : 2] = 1;
};

let c = new C();

assert.sameValue(
  c[false ? 1 : 2],
  1
);
assert.sameValue(
  C[false ? 1 : 2],
  1
);
assert.sameValue(
  c[String(false ? 1 : 2)],
  1
);
assert.sameValue(
  C[String(false ? 1 : 2)],
  1
);

reportCompare(0, 0);
