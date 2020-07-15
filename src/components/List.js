import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { default as UUID } from 'uuid'
import TodoItem from '../../constants/TodoItem'

export default function List() {
  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState([
    { key: UUID.v4(), title: '買咖啡' },
    { key: UUID.v4(), title: '買牛奶' }
  ])

  const addItemToArray = () => {
    if (inputText === '') return
    const newItem = [...todoList, { key: UUID.v4(), title: inputText }]
    setInputText('')
    setTodoList(newItem)
  }

  const handleRemoveItem = (rowMap, rowKey) => {
    rowMap[rowKey].closeRow()
    const oldArray = [...todoList]
    const prevIndex = oldArray.findIndex((item) => item.key === rowKey)
    oldArray.splice(prevIndex, 1)
    setTodoList(oldArray)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TopTitle}>TO DO LIST</Text>
      <TextInput
        style={styles.Textbox}
        placeholder="請輸入代辦事項"
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      <Button title="新增" onPress={() => addItemToArray()} />
      <SwipeListView
        useFlatList
        data={todoList}
        leftOpenValue={75}
        rightOpenValue={-75}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.backRightBtn}
              onPress={() => handleRemoveItem(rowMap, data.item.key)}>
              <Text style={styles.backTextWhite}>刪除</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backRightBtn}
              onPress={() => handleRemoveItem(rowMap, data.item.key)}>
              <Text style={styles.backTextWhite}>刪除</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.rowFront}>
            <Text style={styles.item}>{item.title}</Text>
          </View>
        )}></SwipeListView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  TopTitle: {
    fontSize: 32
  },
  Textbox: {
    fontSize: 16,
    height: 32
  },
  item: {
    paddingTop: 8,
    fontSize: 16
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backRightBtn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 50
  },
  backTextWhite: {
    color: '#FFF'
  }
})
