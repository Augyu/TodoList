import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  FlatList,
} from 'react-native'

export default function List() {
  const [data, setData] = useState([
    { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'Buy coffee' },
    { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Clean the house' },
    { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Walk the dog' },
  ])
  return (
    <View>
      <Text style={styles.TopTitle}>TODO LIST</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={styles.item} keyExtractor={(item) => item.id}>
            {item.title}{' '}
          </Text>
        )}></FlatList>
      <TextInput style={styles.Textbox}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  TopTitle: {
    fontSize: 32,
  },
  Textbox: {
    height: 32,
    width: 100,
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 16,
  },
  item: {
    marginTop: 5,
  },
})
