// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
(() => {

// Make sure we inline the callback, pick up all possible TurboFan
// optimizations.
function RunOptFastReduce(multiple) {
  // Use of variable multiple in the callback function forces
  // context creation without escape analysis.
  //
  // Also, the arrow function requires inlining based on
  // SharedFunctionInfo.
  result = array.reduce((p, v, i, a) => p + multiple);
}

// Don't optimize because I want to optimize RunOptFastMap with a parameter
// to be used in the callback.
%NeverOptimizeFunction(OptFastReduce);
function OptFastReduce() { RunOptFastReduce(3); }

DefineHigherOrderTests([
  // name, test function, setup function, user callback
  "DoubleReduce", mc("reduce"), DoubleSetup, (p, v, i, o) => p + v,
  "SmiReduce", mc("reduce"), SmiSetup, (p, v, i, a) => p + 1,
  "FastReduce", mc("reduce"), FastSetup, (p, v, i, a) => p + v,
  "OptFastReduce", OptFastReduce, FastSetup, undefined
]);

})();
