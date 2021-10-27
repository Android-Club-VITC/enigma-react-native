import React, { useEffect } from "react";
import { Text, Button } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";

export default function TextOpacityWithTiming() {
  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      width: animatedOpacity.value * 200,
    };
  });

  useEffect(() => {
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
          { height: 100, backgroundColor: "#eaf6f6", padding: 20, marginBottom: 20, borderRadius: 20, elevation: 20 },
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
          animatedOpacity.value = withSequence(withTiming(0), withTiming(1));
        }}
      />
    </Animated.View>
  );
}
