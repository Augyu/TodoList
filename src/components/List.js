import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import TodoItem from '../../constants/TodoItem'

export default function List() {
  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState([
    { title: '買咖啡' },
    { title: '買牛奶' },
  ])

  const addItemToArray = () => {
    if (inputText === '') return
    const newItem = [...todoList, { title: inputText }]
    setInputText('')
    setTodoList(newItem)
  }

  const handleRemoveItem = (index) => {
    const oldArray = todoList
    const newItem = oldArray.slice(index, 1)
    setTodoList(oldArray)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TopTitle}>TO DO LIST</Text>
      <SwipeListView
        useFlatList
        data={todoList}
        leftOpenValue={75}
        rightOpenValue={-75}
        renderHiddenRow={(data) => (
          <View style={styles.rowBack}>
            <Text>刪除</Text>
            <Text>刪除</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.title}</Text>
        )}></SwipeListView>
      <TextInput
        style={styles.Textbox}
        placeholder="請輸入代辦事項"
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      <Button title="新增" onPress={() => addItemToArray()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  TopTitle: {
    fontSize: 32,
  },
  Textbox: {
    fontSize: 16,
    height: 32,
  },
  item: {
    paddingTop: 8,
    fontSize: 16,
  },
})
