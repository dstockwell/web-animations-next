suite('animation-node', function() {
  test('normalize timing input', function() {
    assert.equal(normalizeTimingInput(1).duration, 1);
    assert.equal(normalizeTimingInput(1).easing, 'linear');
    assert.equal(normalizeTimingInput(undefined).duration, 'auto');
    assert.equal(normalizeTimingInput({easing: 'ease'}).easing, 'ease');
  });
  test('conversion of timing functions', function() {
    var f = toTimingFunction('ease');
    var g = toTimingFunction('cubic-bezier(.25, 0.1, 0.25, 1.)');
    for (var i = 0; i < 1; i += 0.1) {
      assert.equal(f(i), g(i));
    }
    assert.closeTo(f(0.1844), 0.2601, 0.01);
    assert.closeTo(g(0.1844), 0.2601, 0.01);

    f = toTimingFunction('cubic-bezier(0, 1, 1, 0)');
    assert.closeTo(f(0.104), 0.392, 0.01);

    function isLinear(f) {
      assert.equal(f(0.1), 0.1);
      assert.equal(f(0.4), 0.4);
      assert.equal(f(0.9), 0.9);
    }

    f = toTimingFunction('cubic-bezier(0, 1, -1, 1)');
    isLinear(f);

    f = toTimingFunction('an elephant');
    isLinear(f);

    f = toTimingFunction('cubic-bezier(-1, 1, 1, 1)');
    isLinear(f);

    f = toTimingFunction('cubic-bezier(1, 1, 1)');
    isLinear(f);

    f = toTimingFunction('step(10, end)');
    assert.equal(f(0), 0);
    assert.equal(f(0.09), 0);
    assert.equal(f(0.1), 0.1);
    assert.equal(f(0.25), 0.2);
  });

});