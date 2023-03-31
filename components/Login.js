import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    TextInput, TouchableOpacity, View,ActivityIndicator
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Styles from './Styles';



const Login = (props) => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '724624577656-m7dj2n10fg0c5165hfrmp6upbfhfbfkd.apps.googleusercontent.com',
        });
    }, [])

    const googleLogIn = async () => {
        setloader(true)
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn().catch(()=> setloader(false))
        console.log(idToken)

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
         setloader(false)
        return auth().signInWithCredential(googleCredential);
        
    };

    const facebookLogIn = async () => {
        setloader(true)
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
        setloader(false)

        return auth().signInWithCredential(facebookCredential);

    };

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loader,setloader] = useState(false);



    const log = () => {
        setloader(true)
        if (email == null || email == '') {
            setloader(false)
            alert('Email must not be empty')
        } else if (password == null || password == '') {
            setloader(false)
            alert('Password must not be empty')
        } else {
            auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    setloader(false)
                    props.navigation.replace('DrawerNav')


                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setloader(false)
                    alert(errorMessage);
                    setEmail('')
                    setPassword('')
                })
        }
    }    


        return (<View style={Styles.container}>

            <Text style={Styles.welcomeTxt}>Welcome!</Text>

            <View style={Styles.view2}>

                <Text style={Styles.loginTxt}>Login</Text>

                <View style={Styles.textBox}>
                    <Image source={require('../assets/email.png')} style={Styles.inputImg} />
                    <TextInput style={{width:'90%'}} value={email} placeholder="Email" placeholderTextColor={'darkgrey'} color={'black'} onChangeText={(text) => setEmail(text)} />
                </View>
                <View style={Styles.textBox}>
                    <Image source={require('../assets/padlock.png')} style={Styles.inputImg} />
                    <TextInput style={{width:'90%'}}  value={password} secureTextEntry={true} placeholder="Password" placeholderTextColor={'darkgrey'} color={'black'} onChangeText={(text) => setPassword(text)} />
                </View>
                <TouchableOpacity style={[Styles.buttonStyle]} onPress={() => log()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={{ textAlign: 'right', marginEnd: 20,color:'#fab1a0' }}>Forget Password?</Text>
                </TouchableOpacity>
                <ActivityIndicator size={'large'} animating={loader} color={'#fab1a0' }/>
                <Text style={{ textAlign: 'center', marginTop: 40, color: '#fab1a0' }}>OR</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => { setloader(true), googleLogIn().then(res => { console.log(res), props.navigation.replace('DrawerNav') }).catch(error => alert(error))}}>
                        <Image source={require('../assets/google.png')} style={{ width: 40, height: 40, marginRight: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>  facebookLogIn().then(res => { console.log(res), props.navigation.replace('DrawerNav') }).catch(error => alert(error))}>
                        <Image source={require('../assets/facebook.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity
                        onPress={() =>  props.navigation.navigate('Signup')} style={{ alignItems: 'center', width: '100%',flexDirection:'column',flex:1,justifyContent:'flex-end'}}>
                        <Text style={{ margin: 10, fontSize: 15, color: '#fab1a0' }}>Don't have an Account?</Text>
                    </TouchableOpacity>

            </View>

        </View>);
    }
    export default Login;