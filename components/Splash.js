import { View, Text } from 'react-native'
import React,{useEffect,useRef} from 'react'
import { firebase } from '@react-native-firebase/auth';
import Lottie from 'lottie-react-native'





const Splash = (props) => {

    const animationRef = useRef()
    useEffect(() => {
        setTimeout(() => {
                 if (firebase.auth().currentUser!=null) {
                    props.navigation.replace('DrawerNav')
                 }else{
                    props.navigation.replace('Login')
                 }
        }, 2500);

    }, [])
    return (
        <View style={{flex:1,backgroundColor:'#e17055'}}>
            <View style={{alignSelf:'center',justifyContent:'center',marginTop:'50%'}}>
            <Text style={{fontSize:40,fontWeight:'bold',color:'white'}}>HungerBase</Text>
            </View>

            <Lottie 
            ref={animationRef} 
            source={require('../assets/animation/90016-order-food.json')}
            loop={false}
            autoPlay={true}
            />
            
        </View>
    )
}

export default Splash