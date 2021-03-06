import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBarIOS
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { CheckBox } from 'react-native-elements'
import { default as UUID } from 'uuid'
import TodoItem from '../../constants/TodoItem'
import Status from '../../constants/Status'

import * as firebase from 'firebase'
import { firebaseConfig } from '../config/config'

const app = firebase.initializeApp(firebaseConfig)
const db = app.database()

export default function List() {
  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList] = useState([])


  /*
  const addItemToArray = () => {
    if (inputText === '') return
    const newItem = [
      ...todoList,
      { key: UUID.v4(), title: inputText, status: Status.Active }
    ]
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
  */

  const addItemToDB = (input) =>{
    if (input === '') return
    const itemId = UUID.v4()
    db.ref('/'+itemId).set({
    title: input
    })
    setInputText('')
  }
/*
  const getDBitem = () =>{
    setTodoList([])
    initData()
    db.ref('/').on('value',(snapshot) => {
    snapshot.forEach((child)=>{
        const newItem = [...todoList, { key:child.key,title: child.child('title').val() }]
        setTodoList(newItem)
        console.log(newItem)
    })
    })
    console.log(todoList)
    return todoList
  }
*/
  const getDBitem = () =>{
    initData()
    db.ref('/').once('value',(snapshot) => {
    snapshot.forEach((child)=>{
        const newItem = [...todoList, { key:child.key,title: child.child("title").val() }]
        setTodoList(newItem)
    })
    })
    return todoList
  }
  //初始值(判斷若DB為空)
  const initData = () =>{
    db.ref('/').on('value',(snapshot) => {
    if ( snapshot.val() === null ){
        addItemToDB('買咖啡')
        addItemToDB('買牛奶')
    }
    })
  }

  const handleStatusChange = (item) => {
    let oldArray = [...todoList]
    const prevIndex = oldArray.findIndex((_) => _.key === item.key)
    oldArray[prevIndex].status =
      oldArray[prevIndex].status === Status.Complete
        ? Status.Active
        : Status.Complete
    setTodoList(oldArray)
  }

  const handleCheck = (item) => {
    return item.status === Status.Complete ? true : false
  }

  const renderItem = ({ item }) => (
    <View style={styles.rowFront}>
      <CheckBox
        checked={handleCheck(item)}
        onPress={() => handleStatusChange(item)}
        title={item.title}
      />
    </View>
  )

  const renderHiddenItem = (data, rowMap) => (
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
  )

  return (
    <View style={styles.container}>
      <Text style={styles.TopTitle}>TO DO LIST</Text>
      <TextInput
        style={styles.Textbox}
        placeholder="請輸入代辦事項"
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      <Button title="新增" onPress={() =>getDBitem()} />
      <SwipeListView
        useFlatList
        data={todoList}
        leftOpenValue={75}
        rightOpenValue={-75}
        renderHiddenItem={ (data,rowMap) => (
          <View style={styles.rowBack}>
          <TouchableOpacity style={styles.backBtn}
            onPress = {()=>storeHighScore(data.item.key,data.item.title)} >
            <Text style={styles.backTextWhite}>刪除</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn}
            onPress = {()=>handleRemoveItem(rowMap,data.item.key)} >
            <Text style={styles.backTextWhite}>刪除</Text>
          </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.rowFront}>
          <Text style={styles.item}>{item.title}</Text>
          </View>
        )}
        >
      </SwipeListView>
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
  backBtn: {
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
