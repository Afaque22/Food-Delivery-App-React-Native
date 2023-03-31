import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import DrawerNav from './components/DrawerNav';
import Menu from './components/Menu';
import Cart from './components/Cart';
import MyStore from './components/redux toolkit/MyStore';
import { Provider} from 'react-redux';
import Splash from './components/Splash';
import SearchTabs from './components/SearchTabs';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Provider store={MyStore}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' 
      screenOptions={{title: 'HungerBase', headerTintColor:'white', headerStyle:{backgroundColor:'#e17055'}}}>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup}  />
        <Stack.Screen name='UserInfo' component={UserInfo}   />
         <Stack.Screen name='DrawerNav' component={DrawerNav} options={{headerShown:false}} />
         <Stack.Screen name='Menu' component={Menu} options={{title:'Menu'}}  /> 
         <Stack.Screen name='Cart' component={Cart} options={{title:'Cart'}}  />  
         <Stack.Screen name='SearchTabs' component={SearchTabs}  />  
         
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}


export default StackNavigator;
