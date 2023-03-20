# Sensors

Events and data from sensors

```cards
input.onButtonPressed(Button.A, () => {

});
input.onGesture(Gesture.Shake, () => {

});
input.onPinPressed(TouchPin.P0, () => {

});
input.buttonIsPressed(Button.A);
input.isGesture(Gesture.Shake);
input.compassHeading();
input.pinIsPressed(TouchPin.P0);
input.temperature();
input.acceleration(Dimension.X);
input.lightLevel();
input.rotation(Rotation.Pitch);
input.magneticForce(Dimension.X);
input.runningTime();
input.runningTimeMicros();
input.setAccelerometerRange(AcceleratorRange.OneG);
```

## See also

[onGesture](/docs/reference/input/on-gesture), [onPinPressed](/docs/reference/input/on-pin-pressed),
[is gesture](/docs/reference/input/is-gesture), [pinIsPressed](/docs/reference/input/pin-is-pressed), [temperature](/docs/reference/input/temperature), [acceleration](/docs/reference/input/acceleration), [lightLevel](/docs/reference/input/light-level), [rotation](/docs/reference/input/rotation), [runningTime](/docs/reference/input/running-time), [setAccelerometerRange](/docs/reference/input/set-accelerometer-range),
