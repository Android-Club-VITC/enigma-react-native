import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import OpacityScaleFL from './components/FlatList/OpacityScaleFL';
import CarouselFL from './components/FlatList/CarouselFL';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <OpacityScaleFL /> */}
        <CarouselFL />
      </View>        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
