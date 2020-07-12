import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import List from './src/components/List'

export default class MainActivity extends Component {
  render() {
    return (
      <View style={styles.container}>
        <List />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
})
