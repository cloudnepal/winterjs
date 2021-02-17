// Copyright 2020 Mathias Bynens. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Mathias Bynens
description: >
  Unicode property escapes for `Script=Lycian`
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
    [0x010280, 0x01029C]
  ]
});
testPropertyEscapes(
  /^\p{Script=Lycian}+$/u,
  matchSymbols,
  "\\p{Script=Lycian}"
);
testPropertyEscapes(
  /^\p{Script=Lyci}+$/u,
  matchSymbols,
  "\\p{Script=Lyci}"
);
testPropertyEscapes(
  /^\p{sc=Lycian}+$/u,
  matchSymbols,
  "\\p{sc=Lycian}"
);
testPropertyEscapes(
  /^\p{sc=Lyci}+$/u,
  matchSymbols,
  "\\p{sc=Lyci}"
);

const nonMatchSymbols = buildString({
  loneCodePoints: [],
  ranges: [
    [0x00DC00, 0x00DFFF],
    [0x000000, 0x00DBFF],
    [0x00E000, 0x01027F],
    [0x01029D, 0x10FFFF]
  ]
});
testPropertyEscapes(
  /^\P{Script=Lycian}+$/u,
  nonMatchSymbols,
  "\\P{Script=Lycian}"
);
testPropertyEscapes(
  /^\P{Script=Lyci}+$/u,
  nonMatchSymbols,
  "\\P{Script=Lyci}"
);
testPropertyEscapes(
  /^\P{sc=Lycian}+$/u,
  nonMatchSymbols,
  "\\P{sc=Lycian}"
);
testPropertyEscapes(
  /^\P{sc=Lyci}+$/u,
  nonMatchSymbols,
  "\\P{sc=Lyci}"
);

reportCompare(0, 0);
