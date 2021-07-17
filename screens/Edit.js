import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    ScrollView 
} from 'react-native'
import {Fab,
    Icon,
    List,
    ListItem,
    Left,
    Button,
    Body,
    Right,
    CheckBox,
    Title,
    H1,
    Subtitle,
    Container,
    Text,
    Spinner,
    Form,
    Item,
    Input
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'


const Edit=({navigation,route})=>{
    const [task, setTask]=useState('')
    const [details, setDetails]=useState('')
    const [id, setId]=useState(null)

    const update =async()=>{
        try {
            if(!task || !details){
                return alert("Please Enter value in both fields")
            }

            const detailsToUpdate={
                id,
                task,
                details,
                taskStatus: false
            }
            
            const storedValue=await AsyncStorage.getItem('@task_list')
            const list= await JSON.parse(storedValue)
            list.map((singleTask)=>{
                if(singleTask.id==id){
                    singleTask.task=task
                    singleTask.details=details
                }
                return singleTask
            })

            await AsyncStorage.setItem('@task_list',JSON.stringify(list))

            navigation.navigate("Home");


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        const {tasks}=route.params
        const {id, task, details}=tasks

        setId(id)
        setTask(task)
        setDetails(details)
    },[])
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
                    onPress={update}
                    >
                        <Text style={{color:"#eee"}}>
                            Update
                        </Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}

export default Edit

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