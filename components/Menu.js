import { View, Text, Image, FlatList, TouchableOpacity,ActivityIndicator ,Alert} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import database from '@react-native-firebase/database'
import RBSheet from "react-native-raw-bottom-sheet";
import Styles from './Styles'
import { addCartItem,clearList,gettingUID } from './redux toolkit/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import Home from './Home';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Menu = (props) => {

  const [menuData, setMenuData] = useState([]);
  const arrMenuData = [];

  const route = useRoute()

  const resItemData = route.params?.resItemData


  useEffect(() => {

    getMenuData();
    

  }, [])

  const getMenuData = () => {

    database()
      .ref(`/Restraunts/${resItemData.uid}/Menu`)
      .on('value', snapshot => {
        arrMenuData.push(snapshot.val())
        const flatdata = arrMenuData.flatMap(item => {

          return item
              .map(v => ({ ...v, uid: resItemData.uid,resName: resItemData.resName, address : resItemData.address }))

      })
      setMenuData(flatdata)
      // console.log(menuData)

      });
  }

  
  

  const refRBSheet = useRef();
  const [dialogData, setDialogData] = useState([])
  const [quant, setquant] = useState(1)


  const dispatch = useDispatch();
  const addedItems = useSelector(state => state.cart.cart);

  let sum = 0
  let id = undefined
  addedItems.forEach(element);
  function element(item) {
    mul = item.price * item.quantity
    sum += mul;
    id = item.uid
  }
  

  const checkCart =() =>{

    // if (addedItems.length>1) {

      // addedItems.filter((item) => {      
        if (addedItems.length>0 && id != resItemData.uid) {
          Alert.alert('Remove your previous items?',
            'You still have products from another restaurant, Shall we start over with a fresh cart?',[
              { text: 'No', onPress: ()=> null },
              { text : 'Remove', onPress: () => dispatch(clearList(dialogData))}
            ])
        }else{
          dispatch(addCartItem(dialogData))
          
        }
      // }
    //  } )
    }
    

  // console.log(result.uid)

  return (
    <View style={{ flex: 1}}>
      <View style={{backgroundColor:'white'}}>
      <Image source={{ uri: resItemData.resImage }} style={{ width: '100%', height: 150}} />    
      <Text style={{ color: 'black', fontSize: 25, marginStart: 20, fontWeight: 'bold', marginTop: 20 }}>{resItemData.resName}</Text>
      <Text style={{ color: 'black', fontSize: 18, marginStart: 20, marginBottom: 10 }}>{resItemData.address}</Text>
      </View>
      {menuData.length > 0 ? (
        <FlatList data={menuData} renderItem={({ item }) => {
          if (item != null) {
            return <TouchableOpacity onPress={() => { refRBSheet.current.open(), setDialogData(item) }}>
              <View style={{ width: '95%', height: 100, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'black', marginStart: 10, marginTop: 15, fontSize: 20, fontWeight: 'bold' }}>{item.itemName}</Text>
                  <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15 }}>{item.desc}</Text>
                  <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15 }}>{'Rs. ' + item.price}</Text>
                </View>
                <Image source={{ uri: item.menuImage }} style={{ width: 100, height: 100 }} />
              </View>
            </TouchableOpacity>
            
          }
        }} />) :
        <FlatList data={[1, 1, 1, 1, 1]} renderItem={(item) => {
          return (
            <View style={{ width: '95%', height: 100, alignSelf: 'center', marginTop: 10,flexDirection:'row' }}>
              <View style={{flex:1}}>
              <ShimmerPlaceholder style={{ marginStart: 10 }} />
              <ShimmerPlaceholder style={{ margin: 10 }} />
              <ShimmerPlaceholder style={{ marginStart: 10 }} />
              </View>
              <ShimmerPlaceholder style={{width: 100, height: 100  }} />
            </View>
          )
        }} />}


      {addedItems.length > 0 ? (<View style={{ backgroundColor: 'white', position: 'absolute', width: '95%', height: '10%', bottom: 0,marginBottom:10,alignSelf:'center',justifyContent:'center' }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
          <View style={{ backgroundColor: '#e17055', width: '90%', height: '65%', borderRadius: 5, alignSelf: 'center', margin: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginStart: 10, fontSize: 18 }}>{`(${addedItems.length})`}</Text>
            <Text style={{ marginLeft: '23%', color: 'white', fontSize: 16 }}>View your cart</Text>
            <Text style={{ textAlign: 'right', flex: 1, color: 'white', fontSize: 16, marginEnd: 15 }}>{'Rs. ' + sum}</Text>
          </View>
        </TouchableOpacity>
      </View>) : null}


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        
        customStyles={{ wrapper: { backgroundColor: "transparent", borderRadius: 50 }, draggableIcon: { backgroundColor: '#e17055' } }}>
        <View>
          <Image source={{ uri: dialogData.menuImage }} style={{ width: '100%', height: 120 }} />
          <Text style={{ color: 'black', marginStart: 10, marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>{dialogData.itemName}</Text>
          <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15 }}>{dialogData.desc}</Text>
          <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15 }}>{'Rs. ' + dialogData.price}</Text>
          <TouchableOpacity style={[Styles.buttonStyle]} onPress={() => {checkCart(), refRBSheet.current.close()}} >
            <Text style={{ color: 'white', textAlign: 'center' }}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
     
    </View>
  )
      }
export default Menu;




