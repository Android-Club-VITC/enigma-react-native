import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function TextOpacityWithTiming() {
  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      width: animatedOpacity.value * 200,
    };
  });

  //   useEffect(() => {
  //     animatedOpacity.value = withTiming(1);
  //   }, []);

  return (
    <Animated.View
      style={{
        backgroundColor: "#f76b8a",
        flex: 1,
      }}
    >
      <Animated.View
        style={[
          { height: 100, backgroundColor: "#eaf6f6", padding: 20 },
          animatedStyle,
        ]}
      >
        <Animated.Text
          style={{ color: "#f76b8a", fontSize: 15, fontWeight: 10 }}
        >
          Hello World!
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}
