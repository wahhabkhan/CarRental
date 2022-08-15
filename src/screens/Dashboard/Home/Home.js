import React, { useState,useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image ,FlatList,TextInput,TouchableOpacity} from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { iconPath } from '../../../Constants/iconandImages';
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import ResponsiveText from '../../../components/RnText';
import {Button,AppTheme} from '../../../components/index';
import {openDatabase} from 'react-native-sqlite-storage';
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';


const Home = (props) => {
console.log(props.user.name);
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
const [search, setSearch] = useState('');
const [filteredDataSource, setFilteredDataSource] = useState('');
const [masterDataSource, setMasterDataSource] = useState('');
const [totalrating, settotalrating] = useState([]);
const [itemid, setitemid] = useState('');

const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
      console.log('jhhhjhhjhj', item.carname);

        const itemData = item.carname
          ? item.carname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('jhhhjhhjhj', newData);
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

const getcar=()=>{
    db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM Cars',
          [],
          async (tx, results) => {
            let temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i))
            }
            setFilteredDataSource(temp)
            setMasterDataSource(temp)
console.log('dhdhkfhdskhfdjkhf',temp);
          })})

}
const gettotalrating=(item)=>{
    if (itemid==item) {
        setitemid('')
    } else {
        setitemid(item)
    }
    db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM Bookcar where carid=?',
          [item],
          async (tx, results) => {
            let temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i))
            }
            settotalrating(temp);
        })})}
       const renderrating=({item})=>{
        console.log('====================================');
        console.log(item);
        console.log('====================================');
        return(
            <View>
            {item.rating>0?

            <View style={{borderWidth:0,borderColor:'red',alignItems:'center',marginHorizontal:wp(5)}}>
 <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h4"
                  
                >
                    {item.name}
                
                    </ResponsiveText> 
                    <View style={{marginTop:10,flexDirection:'row',borderWidth:0,justifyContent:'space-between',}}>
             {item.rating<=0?
             <View>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </View>
:
             <View >
                <Image source={iconPath.fillstar} style={styles.icons}  />
</View>
    }

{item.rating<=1?
             <View>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </View>
:
             <View>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</View>
    }


{item.rating<=2?
             <View>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </View>
:
             <View>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</View>
    }


{item.rating<=3?
             <View>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </View>
:
             <View>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</View>
    }

{item.rating<=4?
             <View>
                 <Image source={iconPath.unfilstar} style={styles.icons}  />
             </View>
:
             <View>
                <Image source={iconPath.fillstar} style={styles.icons}  />
</View>
    }
                            </View>
    
            </View>
               :null}
                </View>
        )
       }
    const renderItem=({item,index})=>{
    
        return(
            <View style={styles.recentmainview}>
                <View style={{borderWidth:0}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.imageview}>
                    <Image source={{uri:item.Carimage}} style={styles.carimage} resizeMode='cover'/>
                    <Image source={{uri:item.img2}} style={styles.carimage} resizeMode='cover'/>
                    <Image source={{uri:item.img3}} style={styles.carimage} resizeMode='cover'/>
                    <Image source={{uri:item.img4}} style={styles.carimage} resizeMode='cover'/>
                    </View>
                    </ScrollView>
                    <View style={styles.rowview}>
                        <View>
                    <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h4"
                >
                    {item.carname}
                    <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h5"
                >
                    {'   '}{item.carmodal}
                    </ResponsiveText> 
                  
            
                </ResponsiveText> 

                <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h3"
                >
                    {item.carprice}{' : '}{'One Day'}
                </ResponsiveText> 
                </View>
                <View style={{borderWidth:1,padding:10,borderRadius:8,borderColor:AppTheme.bordercolor,backgroundColor:AppTheme.tabBackGroundcolor,alignItems:'center',justifyContent:'center'}}>
                    <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h5"
                >
                    {item.carmake}
                </ResponsiveText> 
                </View>
                    </View>
                 <TouchableOpacity onPress={()=>gettotalrating(item.id)} style={{borderWidth:0,alignItems:'flex-end',marginVertical:10}}>  
                
                {itemid==item.id?
                 <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h3"
                >
                    {'Hide Rating:'}
                </ResponsiveText>   
                :
                 <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h3"
                >
                    {'Show Rating:'}
                </ResponsiveText>   
    }
             
                    </TouchableOpacity>
{itemid==item.id &&(
                    <FlatList
                    data={totalrating}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderrating}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                
                />
                )}
                {totalrating=='' &&itemid==item.id&&(
                         <ResponsiveText
                         color={AppTheme.textColorWhite}
                         size="h3"
                     >
                         {'No Rated'}
                     </ResponsiveText>   
                )}
                    <View style={styles.book}>


                    <Button
           title={'Book Now'}
           onPress={()=>props.navigation.navigate('Bookcar',
          {
            item:item,
           userid: props.user.id
        }
           )}
           />
                    </View>
                </View>
                        
                            </View>
        )
    }
    return (
        <Container backgroundColor={AppTheme.tabBackGroundcolor}>
            <View style={styles.mainContainer}>
                <Header profileImage={"https://www.adobe.com/express/create/media_11b1adffc91b8e6206e56adab00fa2bb4da3e694a.jpeg?width=400&format=jpeg&optimize=medium"}
                name={props.user.name}
                onPress={()=>props.navigation.navigate('Edituser')} 
         
          logout={()=>{props.navigation.navigate('Login'), Toast.show('User Logout.')}} />
            </View>
            <View style={styles.inputview}>
            <TextInput
                     placeholder="Search Cars"
                     onChangeText={(text)=>searchFilterFunction(text)}
                       
                        value={search}
                      
                        width={wp(79)}
                        height={hp(6)}
                        paddingLeft={10}
                        placeholderTextColor={AppTheme.textColorWhite}
                        color={AppTheme.textColorWhite}
                      
                    />
                    </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.Fullcontainer}>
               



               <View style={{  paddingBottom:hp(6)}}>
               <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                
                />
               </View>

                {/* <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h5"
                >
                    {'Popular Courses'}
                </ResponsiveText>

                <ResponsiveText
                    color={AppTheme.textColorWhite}
                    size="h5"
                >
                    {'Recently Added'}
                </ResponsiveText> */}
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
  export default connect(mapStateToProps)(Home)
  

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: AppTheme.background
    },
    Fullcontainer: {
        flex: 1,
        paddingHorizontal: wp(5),
        backgroundColor: AppTheme.background,
      

    },
    booktxt:{
        borderWidth:0,
        alignItems:'center',
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    carimage:{
        width:wp(80),
        height:hp(26),
        marginLeft:30
    },
    icons:{width:25,height:25,marginLeft:5},

    inputview:{ 
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:20,
        paddingLeft:15,
        marginTop:20,
        borderColor:AppTheme.bordercolor,
    backgroundColor:AppTheme.background,
    marginHorizontal:wp(8),
    marginBottom:20
    },
    imageview:{
        borderWidth:0,
        borderColor:'red',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:wp(4),
        flexDirection:'row',
        borderWidth:0
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



