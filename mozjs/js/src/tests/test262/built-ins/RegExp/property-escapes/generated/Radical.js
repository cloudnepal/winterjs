// Copyright 2020 Mathias Bynens. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Mathias Bynens
description: >
  Unicode property escapes for `Radical`
info: |
  Generated by https://github.com/mathiasbynens/unicode-property-escapes-tests
  Unicode v13.0.0
esid: sec-static-semantics-unicodematchproperty-p
features: [regexp-unicode-property-escapes]
includes: [regExpUtils.js]
---*/

const matchSymbols = buildString({
  loneCodePoints: [],
  ranges: [
    [0x002E80, 0x002E99],
    [0x002E9B, 0x002EF3],
    [0x002F00, 0x002FD5]
  ]
});
testPropertyEscapes(
  /^\p{Radical}+$/u,
  matchSymbols,
  "\\p{Radical}"
);

const nonMatchSymbols = buildString({
  loneCodePoints: [
    0x002E9A
  ],
  ranges: [
    [0x00DC00, 0x00DFFF],
    [0x000000, 0x002E7F],
    [0x002EF4, 0x002EFF],
    [0x002FD6, 0x00DBFF],
    [0x00E000, 0x10FFFF]
  ]
});
testPropertyEscapes(
  /^\P{Radical}+$/u,
  nonMatchSymbols,
  "\\P{Radical}"
);

reportCompare(0, 0);
