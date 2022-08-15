
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image ,FlatList,TouchableOpacity} from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { iconPath } from '../../../Constants/iconandImages';
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import ResponsiveText from '../../../components/RnText';
import {Button,AppTheme} from '../../../components/index';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {openDatabase} from 'react-native-sqlite-storage';

const BurnandEarn = (props) => {
    console.log(props);
    const db = openDatabase(
        {name: 'carRental.db', createFromLocation: 1},
        successCB,
        errorCB,
        openCB,
      );
      const errorCB = err => {
        console.log('SQL Error: ' + err);
      };
    
      const successCB = () => {
        console.log('SQL executed fine');
      };
      const openCB = () => {
        console.log('Database OPENED');
      };
   let array=[
    {
    name:'Honda City',
    modal:'2020',
    make:'Honda',
    image:iconPath.hondacity,
    price:'5000'

   },
   {
    name:'Wagon R',
    modal:'2022',
    make:'Suzuki',
    image:iconPath.wagonr,
    price:'3000'
   },
]
React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
        getcar()
    });

    return unsubscribe;
  }, [props.navigation]);
const [data, setdata] = useState([]);
const getcar=()=>{

    db.transaction(async tx => {
        tx.executeSql(
          'SELECT userid FROM Loginuser',
          [],
          async (tx, res) => {
      console.log('====================================');
      console.log(res.rows.item(0).userid);
      console.log('====================================');
    db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM Bookcar',
          [],
          async (tx, results) => {
            let temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i))
            }
   setdata(temp)
console.log('temp,temp',temp);
          })})


        })})

}
const rejectrequest=(item)=>{
    console.log('id issss',item);
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE Bookcar set status=? where userid=? AND carid=? AND id=? ',
          ['Rejected',item.userid,item.carid,item.id],
          (tx, results) => {
            console.log(results);
if(results.rowsAffected>0){
    getcar()
}

          })})
}
const acceptrequest=(item)=>{
    console.log('id issss',item);
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE Bookcar set status=? where userid=? AND carid=? AND id=?',
          ['Accepted',item.userid,item.carid,item.id],
          (tx, results) => {
            console.log(results);
if(results.rowsAffected>0){
    getcar()
}

          })})
}

    const renderItem=({item,index})=>{
        console.log('ite,,,,',item.status=='Pending');
        return(
            <View style={styles.recentmainview}>
                <View style={{borderWidth:0}}>
                    <View style={styles.imageview}>
                        <View style={{borderWidth:0,justifyContent:'center'}}>
                        <ResponsiveText
                    color={'white'}
                    size="h5"
                >
                    {item.name}
                </ResponsiveText> 
                <ResponsiveText
                    color={'white'}
                    size="h5"
                >
                    {item.phonenumber}
                </ResponsiveText> 
                        </View>
                   
                 

                <TouchableOpacity onPress={()=>props.navigation.navigate('Showbokkdetail',{
                    item:item
                })} style={{borderWidth:1,padding:10,borderRadius:8,borderColor:AppTheme.bordercolor,backgroundColor:'yellow',alignItems:'center',justifyContent:'center'}}>
                    <ResponsiveText
                    color={'black'}
                    size="h5"
                >
                    {'Detail'}
                </ResponsiveText> 
                </TouchableOpacity>
                    </View>
                    {item.status=='Pending' &&(
                    <View>
                    <TouchableOpacity onPress={()=>acceptrequest(item)} style={{borderWidth:1,marginTop:10,padding:10,borderRadius:8,marginHorizontal:wp(6),borderColor:AppTheme.bordercolor,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
                    <ResponsiveText
                    color={'black'}
                    size="h5"
                >
                    {'Accept'}
                </ResponsiveText> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>rejectrequest(item)} style={{borderWidth:1,marginTop:10,marginHorizontal:wp(6),padding:10,borderRadius:8,borderColor:AppTheme.bordercolor,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
                    <ResponsiveText
                    color={'black'}
                    size="h5"
                >
                    {'Reject'}
                </ResponsiveText> 
                </TouchableOpacity>
                  
                  </View>
                  )}
                </View>
                        
                            </View>
        )
    }
    return (
        <Container backgroundColor={AppTheme.tabBackGroundcolor}>
     
        <ScrollView showsVerticalScrollIndicator={false}>
           



         
<View style={{  paddingBottom:hp(6)}}>
               <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                
                />
               </View>


           
        </ScrollView>
    </Container>
    )
}

export default BurnandEarn;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppTheme.background
    },
    addbtn:{
        borderWidth:0,
        marginTop:hp(10),
        marginHorizontal:wp(6),
        width:wp(10),
        alignItems:'center',
        alignSelf:'flex-end'
    },
    booktxt:{
        borderWidth:0,
        alignItems:'center',
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    carimage:{
        width:wp(30),
        height:hp(12),
        borderRadius:20
    },
    imageview:{
        borderWidth:0,
        borderColor:'red',
        marginTop:20,
        alignItems:'center',
        marginHorizontal:wp(6),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    topBannerContainer: {
        marginTop: wp(5),
        marginBottom: wp(5),
        borderColor: 'red',
        // borderWidth: 1
    },
    book:{
        borderWidth:0,
      
        alignItems:'center',
        marginTop:10
       
    },
    topbannerImage: {
        width: wp(96),
        height: wp(40)
    },
    rowview:{
        borderWidth:0,
        marginTop:15,
        justifyContent:'space-between',
        flexDirection:'row',
        marginHorizontal:wp(4)

    }
});

