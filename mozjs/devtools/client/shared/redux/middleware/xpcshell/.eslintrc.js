/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

module.exports = {
  // Extend from the shared list of defined globals for mochitests.
  extends: "../../../../../.eslintrc.mochitests.js",
  globals: {
    run_test: true,
    run_next_test: true,
    equal: true,
    do_print: true,
  },
  rules: {
    // Stop giving errors for run_test
    camelcase: "off",
  },
};
