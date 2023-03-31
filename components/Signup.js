import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import Styles from './Styles';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


const Signup = (props) => {


    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [loader, setloader] = useState(false)


        useEffect(() => {
            GoogleSignin.configure({
                webClientId: '724624577656-m7dj2n10fg0c5165hfrmp6upbfhfbfkd.apps.googleusercontent.com',
            });
        }, [])
    
        const googleLogIn = async () => {
            setloader(true)
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
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

    const sign = () => {
        setloader(true)
        if (password != confirmPassword) {
            setloader(false)
            alert("Password does not match")
        } else if (email == null || email =='') {
            setloader(false)
            alert('Email must not be empty') 
            }else if(password == null || password == ''){
                setloader(false)
                alert('Password must not be empty')
            }else{
           auth().createUserWithEmailAndPassword( email, password)
                .then((userCredential) => {
                    setloader(false)
                    props.navigation.navigate('UserInfo')
                     
                })
                .catch((error) => {
                    setloader(false)
                    const errorMessage = error.message;
                    alert(errorMessage);
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                });
        };

    };
    
    return (
        <View style={Styles.container}>

            <Text style={Styles.welcomeTxt}>Create Account</Text>

            <View style={Styles.view2}>

                <Text style={Styles.loginTxt}>Signup</Text>

                <View style={Styles.textBox}>
                    <Image source={require('../assets/email.png')} style={Styles.inputImg} />
                    <TextInput style={{width:'90%'}} value={email} placeholder="Email" placeholderTextColor={'darkgrey'} color={'black'} onChangeText={(text) => setEmail(text)} />
                </View>

                <View style={Styles.textBox}>
                    <Image source={require('../assets/padlock.png')} style={Styles.inputImg} />
                    <TextInput style={{width:'90%'}} value={password} secureTextEntry={true} placeholder="Password" placeholderTextColor={'darkgrey'} color={'black'} onChangeText={(text) => setPassword(text)} />
                </View>

                <View style={Styles.textBox}>
                    <Image source={require('../assets/padlock.png')} style={Styles.inputImg} />
                    <TextInput style={{width:'90%'}} value={confirmPassword} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor={'darkgrey'} color={'black'} onChangeText={(text) => setConfirmPassword(text)} />
                </View>

                <TouchableOpacity style={[Styles.buttonStyle]} onPress={() => sign()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Signup</Text>
                </TouchableOpacity>
                <ActivityIndicator size={'large'} animating={loader} color={'#fab1a0' }/>
                <Text style={{ textAlign: 'center', marginTop: 40, color: '#fab1a0'}}>OR</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => googleLogIn().then(res => { console.log(res), props.navigation.replace('UserInfo') }).catch(error => alert(error))}>
                        <Image source={require('../assets/google.png')} style={{ width: 40, height: 40, marginRight: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => facebookLogIn().then(res => { console.log(res), props.navigation.replace('UserInfo') }).catch(error => alert(error))}>
                        <Image source={require('../assets/facebook.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default Signup;