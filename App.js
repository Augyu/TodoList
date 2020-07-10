import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, ListView, TextInput } from 'react-native'
import List from './src/components/List'

export default function App() {
  return (
    <View style={styles.container}>
      <List />
      {/* <Text style={styles.TopTitle}>TODO LIST</Text> */}
      {/* <TextInput style={styles.Textbox} value={value}></TextInput>*/}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 32,
    paddingLeft: 16,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
})
