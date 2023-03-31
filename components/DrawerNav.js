import React, { useState,useEffect } from "react";
import { View, Text, Image,ScrollView } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import {
      createDrawerNavigator,
      DrawerContentScrollView,
      DrawerItemList,
      DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import None from './None';
import Home from './Home';
import database from '@react-native-firebase/database'
import Orders from "./Orders";



const CustomDrawerContent = (props)=> {

      
      const [userName, setUserName] = useState(null)
      const [img, setImg] = useState(null)
      useEffect(() => {

            database().ref(`/User/${firebase.auth().currentUser.uid}`)
                  .on('value', snapshot => {
                        if (snapshot.exists()) {                 
                        setUserName(snapshot.val().name)
                        setImg(snapshot.val().fStorageImg)
                        console.log(snapshot.val())
                  }else{
                        props.navigation.navigate('UserInfo')
                  }

                  })
      }, [])

      return (
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor:'#e17055' }}>
                  <View style={{ marginBottom: 40, flexDirection: 'column', alignItems: 'center' }}>
                        {img!=null?
                              <Image source={{ uri: img }} style={{ width: 70, height: 70, backgroundColor: 'white', borderRadius: 35, marginTop: 25 }} /> :
                               <Text>User Image Not Found</Text> }
                               
                        <Text style={{ marginTop: 20, color: 'white',fontWeight:'bold' }}>{userName}</Text>
                        <Text style={{ color: 'white' }}>{firebase.auth().currentUser.email}</Text>
                  </View>
                  <View style={{ backgroundColor: 'white',paddingTop:10,flex:1}}> 
                        <DrawerItemList {...props} />
                        
                        <DrawerItem  label="Help" icon={({}) => (<Image source={require('../assets/interrogation.png')}style={{ height: 20, width: 20,marginRight:-20}}
                         resizeMode="contain"/>)} onPress={() => alert('Link to help')}/>
                        <DrawerItem label="Logout" icon={({}) => (<Image source={require('../assets/signout.png')}style={{ height: 20, width: 20,marginRight:-20}}
                         resizeMode="contain"/>)} onPress={ () => {
                                    firebase.auth().signOut().then(() =>  props.navigation.reset({ index: 0, routes: [{ name: "Login" }], }),console.log('User signed out!'))}} />
                                    
                                    
                  </View>
                  
            </DrawerContentScrollView>
      );
}

const Drawer = createDrawerNavigator()
const MyDrawer = () => {
      return (

            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>} screenOptions={{drawerActiveBackgroundColor:'#fab1a0' ,drawerActiveTintColor:'white',drawerStyle:{width:'77%'}}}>
                  <Drawer.Screen name="Home" component={Home} options={{ headerShown: true, headerTintColor: 'white', headerStyle: {backgroundColor: '#e17055'} , drawerIcon: () => (<Image source={require('../assets/home.png')} style={{width:20,height:20,marginRight:-20}}/>) }}/>
                  <Drawer.Screen name="None" component={None} options={{ headerShown: true, headerTintColor: 'white', headerStyle: { backgroundColor: '#e17055' } , drawerIcon: () => (<Image source={require('../assets/tags.png')} style={{width:20,height:20,marginRight:-20}}/>)}} />
                  <Drawer.Screen name="Orders" component={Orders} options={{ headerShown: true, headerTintColor: 'white', headerStyle: { backgroundColor: '#e17055' } , drawerIcon: () => (<Image source={require('../assets/listcheck.png')} style={{width:20,height:20,marginRight:-20}}/>)}} />
            </Drawer.Navigator>

      );
}

const DrawerNav = () => {
      return (
            <MyDrawer />
      )
}

export default DrawerNav;