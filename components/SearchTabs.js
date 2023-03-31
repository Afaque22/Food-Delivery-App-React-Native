import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import database from '@react-native-firebase/database'
import { firebase } from '@react-native-firebase/auth';

const SearchTabs = (props) => {


    const route = useRoute();

    const uid = firebase.auth().currentUser.uid;
    const searchItem = route.params?.sitem

    useEffect(() => {
        props.navigation.setOptions({
            title: searchItem
        })
        setClick(searchItem)
    }, []);

    const [filterData, setfilterData] = useState([])
    const [scrollData, setSrollData] = useState([])
    const [flatState, setFlatState] = useState()
    const [Click, setClick] = useState()

    const arr = [];

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        database().ref(`/User/${uid}/city`)
            .on('value', snapshot => {
                database()
                    .ref('/Restraunts').orderByChild('city').equalTo(snapshot.val())
                    .on('value', snapshot => {
                        snapshot.forEach(child => {
                            arr.push(child.val())


                            const flatdata = arr.flatMap(item => {

                                return item.Menu
                                    .map(v => ({ ...v, resName: item.resName, uid: item.uid, resImage: item.resImage, address: item.address }))

                            })
                            console.log(flatdata)


                            if (searchItem) {
                                const newdata = flatdata.filter((item) => {

                                    const itemData = item.itemName
                                    const searchItemData = searchItem
                                    return itemData == searchItemData
                                })
                                setfilterData(newdata)
                            } else {
                                console.log('not found')
                            }
                            setFlatState(flatdata)
                        })
                    })

            })

        database()
            .ref('/SearchItem/')
            .on('value', snapshot => {
                setSrollData(snapshot.val())
                // console.log(scrollData)
            })
    }

    const scrollItem = (text) => {
        setClick(text)
        if (text) {
            const newdata = flatState.filter((item) => {

                const itemData = item.itemName
                const searchItemData = text
                return itemData == searchItemData
            })
            setfilterData(newdata)
        } else {
            console.log('not found')
        }
    }

    return (
        <View style={{ flex: 1 }} >
            <View >
                <ScrollView horizontal>
                    {scrollData.map((item, index) => {
                        return (
                            <View key={index}>
                            {Click == item.sitemName?
                            <TouchableOpacity  style={{ borderWidth: 1, borderRadius: 20, margin: 5, marginTop: 15, borderColor: 'lightgrey', backgroundColor: '#e17055' }}
                                onPress={() => {scrollItem(item.sitemName)}}>
                                <Text style={{ color: 'white', paddingStart: 15, paddingEnd: 15, padding: 5 }}>{item.sitemName}</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity key={index} style={{ borderWidth: 1, borderRadius: 20, margin: 5, marginTop: 15, borderColor: 'lightgrey', backgroundColor: 'white' }}
                                onPress={() => {scrollItem(item.sitemName)}}>
                                <Text style={{ color: 'black', paddingStart: 15, paddingEnd: 15, padding: 5 }}>{item.sitemName}</Text>
                            </TouchableOpacity>
                            }
                           </View>

                        )
                    })}

                </ScrollView>
                
            </View>
            <View style={{ flex: 1 }}>
                {filterData.length > 0 ? (
                    <FlatList data={filterData}
                        //  ListHeaderComponent={<View style={{}}>
                        //     <ScrollView horizontal>
                        //         {scrollData.map((item,index) =>{
                        //             return(        
                        //                     <TouchableOpacity key={index} style={{borderWidth:1,borderRadius:20,margin:5,marginTop:15,borderColor:'lightgrey',backgroundColor:'white'}}
                        //                     onPress={()=> scrollItem(item.sitemName)}>
                        //                         <Text style={{color:'black',paddingStart:15,paddingEnd:15,padding:5}}>{item.sitemName}</Text>
                        //                     </TouchableOpacity>

                        //             )
                        //         })}

                        //     </ScrollView>
                        // </View>}

                        renderItem={({ item }) => {
                            if (item != null)
                                return (
                                    <View style={{ width: '95%', height: 115, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('Menu', { resItemData: item })}>
                                                <Text style={{ color: 'black', marginStart: 10, marginTop: 5, fontSize: 20, fontWeight: 'bold' }}>{item.itemName}</Text>
                                                <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15 }}>{item.desc}</Text>
                                                <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15 }}>{'Rs. ' + item.price}</Text>
                                                <Text style={{ color: 'black', marginTop: 5, marginStart: 10, fontSize: 15, fontStyle: 'italic', fontWeight: 'bold' }}>{'From ' + item.resName}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Image source={{ uri: item.menuImage }} style={{ width: 110, height: '100%' }} />
                                    </View>
                                )
                        }} />
                ) :

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'lightgrey', fontWeight: 'bold', fontSize: 18 }}>Not Found</Text>
                        <Image source={require('../assets/emptybox.png')} style={{ width: 200, height: 200, tintColor: 'lightgrey' }} />
                    </View>
                }
            </View>
        </View>
    )
}

export default SearchTabs;