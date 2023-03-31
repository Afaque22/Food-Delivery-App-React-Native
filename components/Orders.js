import { View, Text,TouchableOpacity, FlatList, Image,SectionList} from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Orders = () => {

    const [ordersData, setOrdersData] = useState([])

    useEffect(() => {
      retrieveData()
    }, [])
    
    const arr = []
    const retrieveData = async () => {
        try {
          const data = await AsyncStorage.getItem('ordersData');
          if (data !== null) {
            // We have data!!
            console.log(JSON.parse(data))
          }
        } catch (error) {
          console.log(error)
        }
      }
    
    //   console.log(ordersData)

  return (
    <View>
       <FlatList data={ordersData} renderItem={({item})=>{
        if (item!=null) {
            return(
                <View style={{width:'95%',height:200,alignSelf:'center',backgroundColor:'grey',margin:5}}>
                    <Image source={require('../assets/res.jpeg')} style={{width:'100%',height:100,alignSelf:'center'}}/>
                    <Text style={{color:'black'}}>{item.name}</Text>
                    <Text style={{color:'black'}}>{item.address}</Text>
                    <Text style={{color:'black'}}>{item.itemName}</Text>
                </View>
            )
            
        }
       }}/>
       {/* <SectionList
       sections={ordersData}
       keyExtractor={(item, index) => item + index}
       renderItem={({item})=> {
        if (item!=null) {
            return(
                <View style={{width:'90%',height:200}}>
                    <Image source={require('../assets/res.jpeg')} style={{width:'100%',height:100}}/>
                    <Text>{}</Text>
                </View>
            )
       }
    }
       } renderSectionHeader={({section: {resName}}) => (
        <Text style={{color:'black'}}>{resName}</Text>
      )}/> */}
    </View>
  )
}

export default Orders