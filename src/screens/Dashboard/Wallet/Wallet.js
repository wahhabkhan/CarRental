import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image ,FlatList,TouchableOpacity} from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { iconPath } from '../../../Constants/iconandImages';
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import ResponsiveText from '../../../components/RnText';
import {Button,AppTheme} from '../../../components/index';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {openDatabase} from 'react-native-sqlite-storage';

const Wallet = (props) => {
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
        Getuser()
    });

    return unsubscribe;
  }, [props.navigation]);
const [data, setdata] = useState([]);
const Getuser=()=>{
    db.transaction(async tx => {
        tx.executeSql(
            'SELECT * FROM Users where type=?',
          ['customer'],
          async (tx, results) => {
            let temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i))
            }
   setdata(temp)
console.log(temp);
          })})

}
const deleteuser=(item)=>{
    console.log('id issss',item);
    db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  Users where id=?',
          [item],
          (tx, results) => {
if(results.rowsAffected>0){
    Getuser()
}

          })})
}

    const renderItem=({item,index})=>{
        return(
            <View style={styles.imageview}>
            
                  <View>
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
                    {item.email}
                </ResponsiveText> 
    
                <ResponsiveText
                    color={'white'}
                    size="h5"
                >
                    {item.phonenumber}
                </ResponsiveText> 
                  
              
                </View>
              <TouchableOpacity onPress={()=>deleteuser(item.id)}>
              <Icon name="remove-user" size={25} color={'red'} />

                </TouchableOpacity>
                    </View>
        )
    }
    return (
        <Container backgroundColor={AppTheme.tabBackGroundcolor}>
     
        <ScrollView showsVerticalScrollIndicator={false}>
           
      

<View style={styles.row}></View>

         
<View style={{  paddingBottom:hp(6),marginTop:hp(6)}}>
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

export default Wallet;

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
        marginTop:hp(3),
        marginHorizontal:wp(5),
        justifyContent:"space-between",
        flexDirection:'row',
        alignContent:"center",
        alignItems:"center"
       
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

