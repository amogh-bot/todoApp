import React, {useState} from 'react'
import {Text,
    StyleSheet,
    ScrollView
} from 'react-native'
import {
    Container,
    Form,
    Item,
    Input,
    Button,
    H1,
} from 'native-base'

import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'

const Add=({navigation})=>{
    const [task,setTask]=useState('')
    const[details,setDetails]=useState('')

    const addToList = async () =>{
        try {
            if(!task || !details){
                return alert('Please add both fields')
                //Assignment: add snackbar
            }

            const taskToAdd={
                id: shortid.generate(),
                task:task,
                details:details,
                taskStatus:false,

            }

            const storedValue=await AsyncStorage.getItem('@task_list')
            const prevList=await JSON.parse(storedValue)

            if (!prevList) {
                const newList=[taskToAdd]
                await AsyncStorage.setItem('@task_list', JSON.stringify(newList))
            }else{
                prevList.push(taskToAdd)
                await AsyncStorage.setItem('@task_list', JSON.stringify(prevList))
            }

            navigation.navigate('Home')


            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <H1 style={styles.heading}>
                    Add to Task List
                </H1>
                <Form>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Task"
                        style={{color:"#eee"}}
                        value={task}
                        onChangeText={(text)=>setTask(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Task Details"
                        style={{color:"#eee"}}
                        value={details}
                        onChangeText={(text)=>setDetails(text)}
                        />
                    </Item>
                    <Button rounded block
                    onPress={addToList}
                    >
                        <Text style={{color:"#eee"}}>
                            Add
                        </Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });
  