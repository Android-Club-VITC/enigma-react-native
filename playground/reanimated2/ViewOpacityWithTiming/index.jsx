import React, { useEffect } from "react";
import { Button } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";

export default function ViewOpacityWithTiming() {
  // value kept in the ui thread, used to hold data to animate/ change over time
  const animatedOpacity = useSharedValue(0);

  // declarative 'worklet' function that is trigerred whenever any of the sharedValue changes
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      width: animatedOpacity.value * 200,
    };
  });

  useEffect(() => {
    // async call from js thread to ui thread running the separate js vm (feature by reanimated)
    animatedOpacity.value = withTiming(1);
  }, []);

  return (
    <Animated.View
      style={{
        backgroundColor: "#f76b8a",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            height: 100,
            backgroundColor: "#eaf6f6",
            padding: 20,
            marginBottom: 20,
            borderRadius: 20,
            elevation: 20,
          },
          animatedStyle,
        ]}
      >
        <Animated.Text
          style={{ color: "#f76b8a", fontSize: 15, fontWeight: "bold" }}
        >
          Hello World!
        </Animated.Text>
      </Animated.View>
      <Button
        title="animate"
        onPress={() => {
          // async call from js thread to ui thread to update shared variable value, and the two events are triggered serially
          animatedOpacity.value = withSequence(withTiming(0), withTiming(1));
        }}
      />
    </Animated.View>
  );
}
