import { StatusBar } from 'expo-status-bar'
import React,{Component}from 'react'
import { StyleSheet, Text, View, ListView,TextInput,Button,FlatList} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import List from './src/components/List'


export default class MainActivity extends Component {
  
  constructor(props){

      super(props)
      this.state = {
        inputtext  : '',
        ListArray : [{title:"買咖啡"},{title:"買牛奶"}]
      }
  }

  AddItemToArray =()=> {
    const newItem = [...this.state.ListArray,this.state.inputtext]
    this.setState({ListArray:newItem,inputtext:''})
  }

  handleRemoveItem=(index)=>{
    const oldArray = this.state.ListArray
    const newItem = oldArray.slice(index,1)
    this.setState({ListArray:newItem})
  }
  
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.TopTitle}>TO DO LIST</Text>
        <SwipeListView
          useFlatList
          data={this.state.ListArray}
          leftOpenValue={75}
          rightOpenValue={-75}
          renderHiddenRow={ data => (
            <View style={styles.rowBack}>
                <Text>刪除</Text>
                <Text>刪除</Text>
            </View>
          )}
          renderItem={({item}) => (
            <Text style={styles.item}>
              {item.title}
            </Text>
          )}
          ></SwipeListView>
        <TextInput 
          style={styles.Textbox} 
          placeholder = "請輸入文字"  
          onChangeText={text => this.setState({ inputtext : {title:text}})} 
          value = {this.state.inputtext}
        />
        <Button title="加入" onPress={this.AddItemToArray} />
        {/*<List />*/}
        {/* <Text style={styles.TopTitle}>TODO LIST</Text> */}
        {/* <TextInput style={styles.Textbox} value={value}></TextInput>*/}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 64,
    paddingBottom : 400,
    paddingLeft: 16,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  TopTitle: {
    fontSize: 32,
  },
  Textbox: {
    fontSize : 16,
    height: 32,
    width: 100,
  },
  item: {
    marginTop: 5,
    fontSize : 24
  }
})
