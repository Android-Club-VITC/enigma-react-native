import React, { useRef } from "react";
import {
  View,
  PanResponder
} from "react-native";

import Animated, {
    useSharedValue,
    useAnimatedStyle
  } from "react-native-reanimated";
  
export default function MiuiSlider() {
    
    const posX = useSharedValue(10);

    const updatePosX = (dx) => {
        let temp = posX.value + dx * 0.01
        temp = temp < 0? 0: temp > 100 ? 100: temp
        posX.value = temp
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, g) => updatePosX(g.dx)
        })
    ).current

    const animatedWidth = useAnimatedStyle(() => {
        return {
          width: posX.value + '%',
        }
    });

    return (
      <View style={{ backgroundColor: "lightgrey", justifyContent: "center", height: 50, borderRadius: 10, margin: 20 }} {...panResponder.panHandlers}>
          <Animated.View style={[{ height: "100%", backgroundColor: "red", borderRadius: 10 }, animatedWidth]}></Animated.View>
      </View>
    );
  }