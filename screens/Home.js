import React, {useState, useEffect} from 'react'
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
        Spinner
    } from 'native-base'
import {
    StyleSheet,
    ScrollView   
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import {useIsFocused} from '@react-navigation/native'




const Home=({navigation,route})=>{
    const[listOfTasks,setListOfTasks]=useState([])

    const [loading, setLoading]=useState(false)

    const isFocused = useIsFocused()

    const getList=async ()=>{
        setLoading(true)

        const storedValue=await AsyncStorage.getItem('@task_list');

        if(!storedValue){
            setListOfTasks([])
        }

        const list=JSON.parse(storedValue)
        setListOfTasks(list)

        setLoading(false)

    } 

    const deleteTasks=async (id)=>{
        const newList=listOfTasks.filter((list)=> list.id!==id)
        await AsyncStorage.setItem('@task_list',JSON.stringify(newList))

        setListOfTasks(newList)
    }

    const markComplete = async (id)=>{
        
        const newArr =listOfTasks.map((list)=>{
            if(list.id==id){
                list.taskStatus=!list.taskStatus
            }
            return list
        })

        await AsyncStorage.setItem('@task_list',JSON.stringify(newArr))
        setListOfTasks(newArr)
    }

    useEffect(()=>{
        getList();
    }, [isFocused  ])

    if(loading){
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2" />
            </Container>
        )
    }
    return(
        <ScrollView contentContainerStyle={styles.container}>
            {listOfTasks.length==0? (
                <Container style={styles.container}>
                    <H1 style={styles.heading}>
                        Task list is empty. Please add some task
                    </H1>
                </Container>
            ):(
                <>
                <H1 style={styles.heading}>Next Task to do</H1>
                    <List>
                        {listOfTasks.map((tasks)=>(
                            <ListItem style={styles.listItem} noBorder
                            key={tasks.id}
                            >
                            <Left>
                                <Button
                                style={styles.actionButton}
                                danger
                                onPress={()=> deleteTasks(tasks.id)}
                                >
                                    <Icon name="trash" active/>
                                </Button>
                                <Button
                                style={styles.actionButton}
                                onPress={()=>{
                                    navigation.navigate('Edit', {tasks})
                                }}
                                >
                                    <Icon
                                    active
                                    name="edit" type="Feather"/>
                                </Button>
                            </Left> 
                            <Body>
                                <Title style={styles.seasonName}>
                                    {tasks.task}
                                </Title >
                                <Text note
                                
                                >
                                    {tasks.details}
                                </Text>

                            </Body>
                            <Right>
                                <CheckBox
                                checked={tasks.taskStatus}
                                onPress={()=>markComplete(tasks.id)}
                                />
                            </Right>
                        </ListItem>
                        ))}
                    </List>
                
                </>
            )}
            <Fab
            style={{backgroundColor: "#5067FF"}}
            position="bottomRight"
            onPress={()=>navigation.navigate('Add')}
            >
                <Icon  name="add" />
            </Fab>
        </ScrollView>
    )
}


export default Home

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
      marginLeft:10
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });
  