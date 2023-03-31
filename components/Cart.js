import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity,clearList } from './redux toolkit/CartSlice'
import Styles from './Styles'
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Cart = () => {

  const [loader, setloader] = useState(false)
  const [offData, setoffData] = useState([])

  let cartData = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch();

  let sum = 0
  let id = undefined
  cartData.forEach(element);
  function element(item) {
    mul = item.price * item.quantity
    sum += mul;
    id = item.uid
    console.log(item)
  }  
  

  const OrderData = async () => {
    setoffData(cartData.concat({sum : sum, length:cartData.length}))
    
    setloader(true)
    database().ref(`/Orders/${id}`).push()
      .set({
        totalAmount: sum,
        NoOfItems: cartData.length,
        order: cartData
      }).then(() => alert("Order Placed Successfully"), setloader(false), dispatch(clearList()))
  }
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{alignSelf:'center',justifyContent:'center',position:'absolute', left: 0,right: 0,top: 0,bottom: 0,}}>
        <ActivityIndicator animating={loader} size={'large'} color={'#fab1a0' }/>
        </View>
      <FlatList data={cartData} renderItem={({ item }) => {
        if (item != null) {
          return <View style={{ width: '95%', marginTop: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', borderRadius: 15 }}>
            <Image source={{ uri: item.menuImage }} style={{ width: 70, height: 70, borderRadius: 10, marginTop: 13, marginBottom: 13, marginStart: 10 }} />
            <View>
              <Text style={{ color: 'black', fontSize: 18, marginLeft: 10, marginRight: 5 }}>{item.itemName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, marginLeft: 10}}>
                <TouchableOpacity onPress={() => { dispatch(decrementQuantity(item))}}>
                  <Image source={require('../assets/minus.png')} style={{ tintColor: '#fab1a0', width: 18, height: 18, marginLeft: 5 , borderLeftWidth:1, borderRightWidth:1,borderColor:'black' }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 18, marginLeft: 5, marginRight: 5 }}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => { dispatch(incrementQuantity(item))}} >
                  <Image source={require('../assets/add.png')} style={{ tintColor: '#fab1a0', width: 18, height: 18 }} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: 'black', fontSize: 18, flex: 1, textAlign: 'right', marginEnd: 20, marginTop: 40 }}>{item.total != undefined ? 'Rs. ' + item.total : 'Rs. ' + item.price}</Text>
          </View>
        }
        
      }} />
      {cartData.length > 0 ? (
        <View style={{ backgroundColor: '#f6f6f6', width: '95%', height: '20%', position: 'absolute', bottom: 0, borderRadius: 15, alignSelf: 'center', marginBottom: 10}}>
          <LinearGradient
            colors={['#fab1a0', '#ececec', '#e2e2e2']}
          >
            <View style={{ flexDirection: 'row', marginTop: 20}}>
              <Text style={{ color: 'black', marginStart: 20, fontSize: 20 }}>Total:</Text>
              <Text style={{ color: 'black', flex: 1, textAlign: 'right', marginEnd: 20, fontSize: 20, fontWeight: 'bold' }}>{'Rs. ' + sum}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Text style={{ color: 'black', marginStart: 20, fontSize: 13 }}>No Of Items:</Text>
              <Text style={{ color: 'black', flex: 1, textAlign: 'right', marginEnd: 20, fontSize: 13, fontWeight: 'bold' }}>{cartData.length}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={[Styles.buttonStyle]} onPress={() => { OrderData(),SaveOffData()}} >
                <Text style={{ color: 'white', textAlign: 'center' }}>Place Your Order</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      ) : null}
    </View>

  )
}

export default Cart