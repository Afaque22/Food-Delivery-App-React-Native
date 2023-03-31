import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TextInput,TouchableOpacity,ActivityIndicator } from 'react-native';
import {useDispatch } from 'react-redux';
import { addCartItem } from './redux toolkit/CartSlice';


const None = () => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [oldproducts, setoldProducts] = useState([]);
  const [searchtxt, setsearchtxt] = useState('')
  const [loader, setloader] = useState(false)
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setoldProducts(json)
      })
  };

  const searchFilterFunction = (text) => {
    if (text) {
      // console.log(oldproducts)
      const newData = oldproducts.filter((item) => {
        console.log(item.title)

        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setProducts(newData);
      // console.log(newData)
      setsearchtxt(text);
    } else {
      setProducts(oldproducts);
      setsearchtxt(text);
    }
  };

  

  return (
    <View>
    
      <Text style={{ color: 'black', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Products List</Text>
      <View style={{ backgroundColor: 'white', borderRadius: 25, color: 'black', height: 40, margin: 15, flexDirection: 'row' }}>
        <Image style={{ width: 20, height: 20, tintColor: 'grey', marginStart: 10, marginTop: 10, marginRight: 10 }} source={require('../assets/search.png')} />
        <TextInput placeholder='Search' placeholderTextColor={'grey'} style={{ color: 'black', width: '80%' }} onChangeText={(text) => searchFilterFunction(text)} value={searchtxt} />
      </View>
      <FlatList data={products} renderItem={({ item }) => {
        if (item != null) {
          return <View style={style1.itemView}>
          <Image source={{ uri: item.image }} style={style1.productImage} />
          <View>
            <Text style={{ color: 'black' }}>{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</Text>
            <Text style={{ color: 'black', marginTop: 5 }}>{item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description}</Text>
            <Text style={{ color: 'black', marginTop: 10 }}>{'Rs. ' + item.price}</Text>
          </View>
        </View>
        }
      }} />
        {/* <View style={{alignSelf:'center',justifyContent:'center',position:'absolute', left: 0,right: 0,top: 0,bottom: 0,}}>
        <ActivityIndicator animating={loader} size={'large'} />
        </View> */}
    </View>

  )
}

export default None;

const style1 = StyleSheet.create({
  container: {
    flex: 1
  },
  itemView: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  productImage: {
    width: 100,
    height: 100
  }
})


