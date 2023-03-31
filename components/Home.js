import { View, Text, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import database from '@react-native-firebase/database'
import { firebase } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Home = (props) => {

  const uid = firebase.auth().currentUser.uid;
  console.log(uid)


  const [cityData, setcityData] = useState('')
  const [resData, setResData] = useState([])
  const [resOldData, setOldResData] = useState([])
  const [scrollData, setSrollData] = useState([])
  const [Search, setSearch] = useState('')


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    database().ref(`/User/${uid}/city`)
      .on('value', snapshot => {
        setcityData(snapshot.val())

        database()
          .ref('/Restraunts/').orderByChild('city').equalTo(snapshot.val())
          .on('value', snapshot => {
            setResData(snapshot.val())
            setOldResData(snapshot.val())
            // console.log(resData)
          })
      });


    database()
      .ref('/SearchItem/')
      .on('value', snapshot => {
        setSrollData(snapshot.val())
        // console.log(scrollData)
      })
  }



  const searchFilterFunction = (text) => {
    if (text) {
      const newData = resOldData.filter((item) => {
        const itemData = item.resName
          ? item.resName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;

      });
      setResData(newData);
      console.log(newData)
      setSearch(text);
    } else {
      setResData(resOldData);
      setSearch(text);

    };
  }



  const addedItems = useSelector(state => state.cart.cart);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')} style={{ marginEnd: 12, marginBottom: 10 }} >
          <Image style={{ width: 20, height: 20, tintColor: 'white', marginEnd: 7, position: 'relative', marginTop: 10 }} source={require('../assets/cart.png')} />
          <View style={{ position: 'absolute', backgroundColor: 'red', borderRadius: 10, width: 20, marginLeft: 13 }}>
            <Text style={{ textAlign: 'center', color: 'white' }}>{addedItems.length}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [addedItems]);

  const arr = [1, 1, 1, 1, 1, 1]

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#e17055' }}>
        <View style={{ backgroundColor: 'white', borderRadius: 25, color: 'black', height: 40, margin: 15, flexDirection: 'row' }}>
          <Image style={{ width: 20, height: 20, tintColor: 'grey', marginStart: 10, marginTop: 10, marginRight: 10 }} source={require('../assets/search.png')} />
          <TextInput placeholder='Search' placeholderTextColor={'grey'} style={{ color: 'black', width: '80%' }} onChangeText={(text) => searchFilterFunction(text)} value={Search} />
        </View>
      </View>

      {resData != null && resData.length > 0 ? (
        <FlatList ListHeaderComponent={<View>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Image source={require('../assets/marker.png')} style={{ width: 20, height: 20, marginTop: 15, marginStart: 15, tintColor: '#cd6133' }} />
            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', margin: 6 }}>{cityData}</Text>
          </View>
          <View>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', margin: 10 }}>Cuisines For You</Text>
            <ScrollView horizontal={true}>
              {scrollData.map((sitem, index) => {
                return (
                  <TouchableOpacity key={index} onPress={()=> props.navigation.navigate('SearchTabs',{sitem: sitem.sitemName})}>
                  <View style={{ margin: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} >
                    <Image source={{ uri: sitem.sImg }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{sitem.sitemName}</Text>
                  </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', margin: 10 }}>All Restraunts</Text>
          </View>
        </View>}

          data={resData} renderItem={({ item }) => {
            if (item != null) {
              return <View style={{ width: '95%', height: 230, backgroundColor: 'white', alignSelf: 'center', flexDirection: 'column' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Menu', { name: item.resName, address: item.address, id: item.uid, image: item.resImage, resItemData: item })}>
                  <Image source={{ uri: item.resImage }} style={{ width: '100%', height: 150 }} />
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', marginStart: 10 }}>{item.resName}</Text>
                    <Text style={{ fontSize: 13, color: 'black', marginStart: 10, marginTop: 3 }}>{item.address}</Text>
                    <Text style={{ fontSize: 18, color: 'black', marginStart: 10 }}>{props.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>

            }

          }} />
      ) :
        (<FlatList data={[1, 1, 1, 1, 1]} ListHeaderComponent={<View>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <ShimmerPlaceholder style={{ width: 20, height: 20, marginTop: 15, marginStart: 15, borderRadius: 5 }} />
            <ShimmerPlaceholder style={{ width: 150, height: 35, marginTop: 5, marginLeft: 5, borderRadius: 10 }} />
          </View>
          <View>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', margin: 10 }}>Cuisines For You</Text>
            <ScrollView horizontal={true}>
              {arr.map((sitem, index) => {
                return (
                  <View style={{ margin: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} key={index}>
                    <ShimmerPlaceholder style={{ width: 100, height: 100, borderRadius: 10 }} />
                    <ShimmerPlaceholder style={{ marginTop: 5, width: 80, borderRadius: 10 }} />
                  </View>

                )
              })}
            </ScrollView>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', margin: 10 }}>All Restraunts</Text>

          </View>
        </View>} renderItem={(item) => {
          return (
            <View style={{ width: '95%', height: 230, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, flexDirection: 'column' }}>
              <ShimmerPlaceholder style={{ width: '100%', height: 150 }} />
              <View style={{ marginTop: 10 }}>
                <ShimmerPlaceholder style={{ marginStart: 10, borderRadius: 10, marginTop: 10 }} />
                <ShimmerPlaceholder style={{ margin: 10, borderRadius: 10 }} />
              </View>
            </View>

          )
        }} />)}

    </View >


  )




}



export default Home