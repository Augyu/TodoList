import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ListView, TextInput } from 'react-native';

export default function App() {

  const [value] = ""
  const [test] = "ABCD"

  return (
    <View style={styles.container}>
      <Text style={styles.TopTitle} >TO DO LIST</Text>
      <TextInput style = {styles.Textbox} value = {value}></TextInput>
      <Text> {test} </Text>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  TopTitle : {
    fontSize:30,
  },
  Textbox :{
    height : 40 ,
    width : 300 ,
    borderColor : '#000000', 
    borderWidth: 1,
  }
});
