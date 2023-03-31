import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import Styles from './Styles'
import { SelectList } from 'react-native-dropdown-select-list'
import database from '@react-native-firebase/database'
import { firebase } from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


const UserInfo = (props) => {

  const uid = firebase.auth().currentUser.uid

  const [name, setName] = useState(null);
  const [contactNo, setContactNo] = useState(null)
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null)
  const [address, setAddress] = useState(null)
  const [image, setImage] = useState(null)
  const [fStorageImg, setFStorageImg] = useState(null)
  const [cityData, setCityData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [loader, setloader] = useState(false)



  var provinceArr = []
  var citiesArr = []

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(response.assets[0].uri);
        setImage(response.assets[0].uri);

        const reference = storage().ref(`/userImages/${firebase.auth().currentUser.uid}`)
       setloader(true)

        await reference.putFile(response.assets[0].uri)

        const uri = await reference.getDownloadURL()
         setloader(false)
        console.log(uri)
        setFStorageImg(uri)

      }
    });
  };

  useEffect(() => {

    database()
      .ref('/DropDown/Provinces')
      .on('value', snapshot => {
        snapshot.forEach((child) => {
          provinceArr.push(child.key)
          setProvinceData(provinceArr)
        })
        // console.log(provinceData)
      });

  }, [])
  useEffect(() => {
    loadCities();
  }, [])

  const loadCities = (province) => {
    database()
      .ref(`/DropDown/Provinces/${province}`)
      .on('value', snapshot => {
        snapshot.forEach((child) => {
          citiesArr.push(child.key)
          setCityData(citiesArr)
        })
        // console.log(cityData)
      });
  }


  useEffect(() => {

    const img = firebase.auth().currentUser.photoURL
    const name = firebase.auth().currentUser.displayName
    if(img!=null && name !=null){
      setImage(img)
      setName(name)
      setFStorageImg(img)
    }   
  }, [])
  

  const addData = () => {

    if(name==null || contactNo==null || address==null || province==null || city==null || uid==null || fStorageImg ==null){
      alert('Please Insert Complete Details')
    }else{

    database()
      .ref(`/User/${uid}`)
      .set({
        name,
        contactNo,
        address,
        province,
        city,
        uid,
        fStorageImg
      })
      .then(() => alert('Account Created Successfully'), props.navigation.reset({ index: 0, routes: [{ name: "DrawerNav" }], }));
  }
}

  return (
    <View style={Styles.container}>
      <Text style={Styles.welcomeTxt}>User Information</Text>
      <View style={Styles.view2}>
        {image != null ?
          <TouchableOpacity onPress={selectImage}>
            <View style={{width: 80, height: 80,alignSelf: 'center', marginTop: 20,}}> 
            <Image source={{ uri: image}} style={{ width: '100%', height: '100%', borderWidth: 2, borderColor: '#fab1a0', backgroundColor: 'lightgrey'}} />
            <ActivityIndicator size={'large'} animating={loader} style={{alignSelf:'center',position:'absolute',left: 0,right: 0,top: 0,bottom: 0}} />
            </View>   
          </TouchableOpacity> : 
          <TouchableOpacity onPress={selectImage}>
            <Image source={require('../assets/user.png')} style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 20, borderWidth: 2, borderColor: '#fab1a0', backgroundColor: 'lightgrey',tintColor:'#e17055' }} />
          </TouchableOpacity>}

          {/* <ActivityIndicator size={'large'} animating={loader} style={{alignSelf:'center',justifyContent:'center',marginTop:5}} /> */}
        <View style={[Styles.textBox, { marginTop: 15}]}>
          <Image source={require('../assets/user.png')} style={Styles.inputImg} />
          <TextInput style={{ color: 'black',width:'90%' }} placeholderTextColor={'darkgrey'} value={name} placeholder='Name' onChangeText={(text) => setName(text)} />
        </View>
        <View style={[Styles.textBox, { marginTop: 10 }]}>
          <Image source={require('../assets/phone.png')} style={Styles.inputImg} />
          <TextInput style={{ color: 'black',width:'90%' }} placeholderTextColor={'darkgrey'} inputMode={'numeric'} value={contactNo} placeholder='Contact Number' onChangeText={(text) => setContactNo(text)} />
        </View>
        <View style={[Styles.textBox, { marginTop: 10 }]}>
          <Image source={require('../assets/marker.png')} style={Styles.inputImg} />
          <TextInput style={{ color: 'black',width:'90%' }} placeholderTextColor={'darkgrey'} value={address} placeholder='Address' onChangeText={(text) => setAddress(text)} />
        </View>

        <SelectList
          setSelected={(txt) => { setProvince(txt); loadCities(txt); }}
          data={provinceData}
          search={false}
          boxStyles={{ borderColor: '#fab1a0', backgroundColor: 'lightgrey', marginEnd: 20, marginStart: 20, marginTop: 10, height: 48 }}
          dropdownStyles={{ backgroundColor: 'lightgrey', borderColor: '#fab1a0', marginEnd: 20, marginStart: 20 }}
          dropdownTextStyles={{ color: 'black' }}
          inputStyles={{ color: 'black' }}
          placeholder='Select Province'
          save="text" />


        <SelectList
          setSelected={(val) => setCity(val)}
          data={cityData}
          boxStyles={{ borderColor: '#fab1a0', backgroundColor: 'lightgrey', marginEnd: 20, marginStart: 20, marginTop: 15, height: 48, marginBottom: 10 }}
          dropdownStyles={{ backgroundColor: 'lightgrey', borderColor: '#fab1a0', marginEnd: 20, marginStart: 20 }}
          dropdownTextStyles={{ color: 'black' }}
          inputStyles={{ color: 'black' }}
          placeholder=' Select City'
          search={false}
          save="value" />

        <TouchableOpacity style={[Styles.buttonStyle]} onPress={() => addData()}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
     
      </View>
      
    </View>

  )
}

export default UserInfo;