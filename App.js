import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import OpacityScaleFL from './components/FlatList/OpacityScaleFL';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <OpacityScaleFL />
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
