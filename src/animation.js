// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(shared, scope, testing) {

  scope.Animation = function(target, effectInput, timingInput) {
    var animationNode = scope.AnimationNode(shared.normalizeTimingInput(timingInput));
    var effect = scope.convertEffectInput(effectInput);
    var timeFraction;
    var animation = function() {
      WEB_ANIMATIONS_TESTING && console.assert(typeof timeFraction !== 'undefined');
      effect(target, timeFraction);
    };
    // Returns whether the animation is in effect or not after the timing update.
    animation.update = function(localTime) {
      timeFraction = animationNode(localTime);
      return timeFraction !== null;
    };
    animation.clear = function() {
      effect(target, null);
    };
    animation.totalDuration = animationNode.totalDuration;
    return animation;
  };

  scope.NullAnimation = function(clear) {
    var nullAnimation = function() {
      if (clear) {
        clear();
        clear = null;
      }
    };
    nullAnimation.update = function() {
      return null;
    };
    nullAnimation.totalDuration = 0;
    return nullAnimation;
  };

})(webAnimationsShared, webAnimationsMinifill, webAnimationsTesting);
