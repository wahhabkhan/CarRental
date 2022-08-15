
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
import { connect } from "react-redux";

const Mybookingstatus = (props) => {
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

React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
        getcar()
    });

    return unsubscribe;
  }, [props.navigation]);
const [data, setdata] = useState([]);
const [rating, setrating] = useState(0);
const updaterating=(rate,item)=>{


    db.transaction(tx => {
setrating(rate)

        tx.executeSql(
          'UPDATE Bookcar set rating=? where id=?',
          [rate,item],
          (tx, res) => {
console.log(res,'jjhhjgghjgj');
            getcar()

          })})
}
const getcar=()=>{


    db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM Bookcar where userid=? ',
          [props.user.id],
          async (tx, results) => {
            let temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i))
            }
   setdata(temp)
console.log('temp,temp',temp);
          })})



}



    const renderItem=({item,index})=>{
        console.log('ite,,,,',item.rating);
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
                   
                 

                <View onPress={()=>props.navigation.navigate('Showbokkdetail',{
                    item:item
                })} style={{borderWidth:1,padding:12,borderRadius:8,borderColor:AppTheme.bordercolor,backgroundColor:item.status=='Pending'?'yellow':item.status=='Accepted'?'green':'red',alignItems:'center',justifyContent:'center'}}>
                    <ResponsiveText
                    color={'black'}
                    size="h5"
                >
                    {item.status}
                </ResponsiveText> 
                </View>
                    </View>

                    {
                        item.status=='Accepted'? 
                        <View style={{marginHorizontal:wp(10),marginTop:20,alignItems:'center',flexDirection:'row',borderWidth:0,justifyContent:'space-between',width:wp(40),alignSelf:'center'}}>
             {item.rating<=0?
             <TouchableOpacity onPress={()=>updaterating(1,item.id)}>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </TouchableOpacity>
:
             <TouchableOpacity onPress={()=>updaterating(0,item.id)}>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</TouchableOpacity>
    }

{item.rating<=1?
             <TouchableOpacity onPress={()=>updaterating(2,item.id)}>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </TouchableOpacity>
:
             <TouchableOpacity onPress={()=>updaterating(1,item.id)}>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</TouchableOpacity>
    }


{item.rating<=2?
             <TouchableOpacity onPress={()=>updaterating(3,item.id)}>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </TouchableOpacity>
:
             <TouchableOpacity onPress={()=>updaterating(2,item.id)}>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</TouchableOpacity>
    }


{item.rating<=3?
             <TouchableOpacity onPress={()=>updaterating(4,item.id)}>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </TouchableOpacity>
:
             <TouchableOpacity onPress={()=>updaterating(3,item.id)}>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</TouchableOpacity>
    }

{item.rating<=4?
             <TouchableOpacity onPress={()=>updaterating(5,item.id)}>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </TouchableOpacity>
:
             <TouchableOpacity onPress={()=>updaterating(4,item.id)}>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</TouchableOpacity>
    }
                            </View>
                             :null
                     }
                  
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


const mapStateToProps = (state) => {
    console.log('state===>>>', state)
    return {
      user: state.userdataReducer.user,
    }
  }
  export default connect(mapStateToProps)(Mybookingstatus)

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
    ,
    icons:{width:25,height:25},

});

