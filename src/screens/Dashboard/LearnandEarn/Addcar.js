import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,ScrollView,Image, TouchableOpacity} from 'react-native'
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import {Button,AppTheme,Container,iconPath,Loader} from '../../../components/index';
import ImagePicker from 'react-native-image-crop-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';

const Addcar = (props) => {

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
const [name, setname] = useState('');
const [carmake, setcarmake] = useState('');
const [carmodal, setcarmodal] = useState('');
const [carprice, setcarprice] = useState('');
const [carpic2, setcarpic2] = useState('');
const [carpic3, setcarpic3] = useState('');
const [carpic4, setcarpic4] = useState('');
const [carpic, setcarpic] = useState('');
const [eror, seteror] = useState(false);
const [erormessage, seterormessage] = useState('');
const [loading, setloading] = useState(false);

const carimage=(id)=>{
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        if(id==1){
        setcarpic(image.path)
        }
        else if(id==2){
          setcarpic2(image.path)

        }
        else if(id==3){
          setcarpic3(image.path)

        }
        else{
          setcarpic4(image.path)

        }

      });
}
const Addnewcar=()=>{

    if(!carmake || !carmodal || !name || !carpic || !carprice){
        seteror(true)
        seterormessage('Please Fill all field')
  
      }
      else{
        try {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO Cars(Carimage,carname,carmake,carmodal,carprice,img2,img3,img4) VALUES (?,?,?,?,?,?,?,?)',
                [carpic,name,carmake,carmodal,carprice,carpic2,carpic3,carpic4],
                (tx, res) => {
        
          console.log('redddddd',res.rowsAffected);
        if(res.rowsAffected>0){
          Toast.show('Car added successfully.')
        
          props.navigation.navigate('BottomTab')
          setloading(false)
        
        
        }
        else{
          setloading(false)
        
        }
        
                })})
          } catch (error) {
          setloading(false)
          console.log('error==',error);
            
          }
   
      }
}


  return (
    <Container backgroundColor={AppTheme.background}>
        <ScrollView style={{paddingBottom:hp(6)}}>

    <View style={styles.inputView}>
    <Text style={styles.txtstyle}>Add New Car</Text>
    {eror==true&&(
          <Text style={{...styles.txtstyle,color:'red',marginTop:hp(5)}}>
            {erormessage}
          </Text>
          )}
<TextInput
style={styles.input}
onChangeText={setname}
value={name}
placeholder="Car name"
placeholderTextColor={'gray'}

/>
<TextInput
style={styles.input}
onChangeText={setcarmake}
value={carmake}
placeholder="Car make"
placeholderTextColor={'gray'}


/>
<TextInput
style={styles.input}
onChangeText={setcarmodal}
value={carmodal}
placeholder="Car Modal"
placeholderTextColor={'gray'}


/>

  <TextInput
style={styles.input}
onChangeText={setcarprice}
value={carprice}
placeholder="Car rent"
placeholderTextColor={'gray'}


/>
<View style={styles.rowview}>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Car Image 1</Text>
    <TouchableOpacity onPress={()=>carimage(1)}>
      {carpic==''?
    // <Image source={ iconPath.Cnic} style={styles.Cnic} />
    <Image source={{uri:'https://cutewallpaper.org/24/car-logo-png/silhouette-tuning-car-buckle-material-sports-highdefinition-car-logo-icon-png-transparent-png-transparent-png-image-pngitem.png'}} style={styles.Cnic} />

:
     
    <Image source={{uri:carpic}} style={styles.Cnic} />

    }

    </TouchableOpacity>
   

    </View>
 
</View>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Car Image 2</Text>
    <TouchableOpacity onPress={()=>carimage(2)}>
      {carpic2==''?
    // <Image source={ iconPath.Cnic} style={styles.Cnic} />
    <Image source={{uri:'https://cutewallpaper.org/24/car-logo-png/silhouette-tuning-car-buckle-material-sports-highdefinition-car-logo-icon-png-transparent-png-transparent-png-image-pngitem.png'}} style={styles.Cnic} />

:
     
    <Image source={{uri:carpic2}} style={styles.Cnic} />

    }

    </TouchableOpacity>
   

    </View>
 
</View>
</View>
<View style={styles.rowview}>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Car Image 3</Text>
    <TouchableOpacity onPress={()=>carimage(3)}>
      {carpic3==''?
    // <Image source={ iconPath.Cnic} style={styles.Cnic} />
    <Image source={{uri:'https://cutewallpaper.org/24/car-logo-png/silhouette-tuning-car-buckle-material-sports-highdefinition-car-logo-icon-png-transparent-png-transparent-png-image-pngitem.png'}} style={styles.Cnic} />

:
     
    <Image source={{uri:carpic3}} style={styles.Cnic} />

    }

    </TouchableOpacity>
   

    </View>
 
</View>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Car Image 4</Text>
    <TouchableOpacity onPress={()=>carimage(4)}>
      {carpic4==''?
    // <Image source={ iconPath.Cnic} style={styles.Cnic} />
    <Image source={{uri:'https://cutewallpaper.org/24/car-logo-png/silhouette-tuning-car-buckle-material-sports-highdefinition-car-logo-icon-png-transparent-png-transparent-png-image-pngitem.png'}} style={styles.Cnic} />

:
     
    <Image source={{uri:carpic4}} style={styles.Cnic} />

    }

    </TouchableOpacity>
   

    </View>
 
</View>
</View>
</View>
<View style={{borderWidth:0,alignSelf:'center'}}>
<Button
           title={'Add Car'}
           onPress={()=>Addnewcar()}
           />
            </View> 


            </ScrollView>   
           

      <Loader loading={loading} />

    </Container>
  )
}

export default Addcar

const styles = StyleSheet.create({

    inputView: {
        marginTop: hp(5),
        width: '90%',
        alignSelf: 'center',
        borderWidth:0,
        marginBottom:hp(10)
        
      },
      txtstyle:{
        borderWidth:0,
        fontSize:13,
        fontWeight:'bold',
        color:AppTheme.textColorWhite

      },
      input:{
        borderWidth:0,
        paddingLeft:10,
        borderColor:AppTheme.bordercolor,
        backgroundColor:AppTheme.texinputbackground,
        borderRadius:8,
        marginTop:20,
       
    
      },
      rowview:{
        flexDirection:'row',justifyContent:'space-between'
      },
      Cnic:{
        borderRadius:hp(1),
        width:wp(40),
        height:hp(15),
        marginTop:10
      },
      viewcnic:{
        borderWidth:0,
        alignItems:'center'
      },
      cnicdesign:{
        borderWidth:0,
        flexDirection:'row',
        borderColor:'red',
        justifyContent:'space-between',
        marginHorizontal:wp(2),
        marginTop:20
      }
})