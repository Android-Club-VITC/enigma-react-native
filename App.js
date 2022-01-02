import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

import OpacityScaleFL from './components/FlatList/OpacityScaleFL';
import CarouselFL from './components/FlatList/CarouselFL';
import InstaStories from './components/InstaStories';
import MiuiSlider from './components/MiuiSlider';

import ViewOpacityWithTiming from './playground/reanimated2/ViewOpacityWithTiming';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={styles.container}>
        {/* <OpacityScaleFL /> */}
        {/* <CarouselFL /> */}
        {/* <InstaStories /> */}
        <MiuiSlider />
        {/* <ViewOpacityWithTiming /> */}
      </View>        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center"
  },
});
