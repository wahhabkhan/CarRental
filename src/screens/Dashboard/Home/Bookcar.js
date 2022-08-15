import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,ScrollView,Image, TouchableOpacity} from 'react-native'
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import {Button,AppTheme,Container,iconPath} from '../../../components/index';
import ImagePicker from 'react-native-image-crop-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import { connect } from "react-redux";

const Bookcar = (props) => {
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
    const [Cnic, setCnic] = useState('');
const [name, setname] = useState('');
const [phonenumber, setphonenumber] = useState('');
const [cnicpicfront, setcnicpicfront] = useState('');
const [cnicpicback, setcnicpicback] = useState('');

const [guarantor1Cnic, setguarantor1Cnic] = useState('');

const [guarantorcnicpicfront, setg1front] = useState('');
const [nameguarantor1, setnameguarantor1] = useState('');
const [guarantor1cnicpicback, setg1back] = useState('');


const [guarantor2Cnic, setguarantor2Cnic] = useState('');
const [guarantor2cnicpicfront, setg2front] = useState('');
const [nameguarantor2, setnameguarantor2] = useState('');
const [guarantor2cnicpicback, setg2back] = useState('');
const [errormessage, seterrormessage] = useState('');
const [error, seterror] = useState(false);


const Carrbooking=()=>{
  
if(!name || !phonenumber ||!Cnic || !cnicpicfront || !cnicpicback
   ||!guarantor1Cnic || !guarantorcnicpicfront || !nameguarantor1 || !guarantor2Cnic 
   || !guarantor2cnicpicfront || !nameguarantor2 || !guarantor2cnicpicback ){
    seterror(true)
    seterrormessage('All field Require')
   }
   else{
    try {
      db.transaction(tx => {

        tx.executeSql(
          'INSERT INTO Bookcar(name,phonenumber,cnic,cnicfront,cnicback,gurantar1name,guranter1cnic,guranter1cnicfront,guranter1cnicback,guranter2cnic,guranter2cnicfront,guranter2cnicback,carid,userid,status,rating,nameguarantor2) VALUES (?,?,?,?,?,?,?,?,?,?,?  ,?,?,?,?,?,?)',
          [name,phonenumber,Cnic,cnicpicfront,cnicpicback,nameguarantor1,guarantor1Cnic,guarantorcnicpicfront,guarantor1cnicpicback,guarantor2Cnic,guarantor2cnicpicfront,guarantor2cnicpicback,props.route.params.item.id,props.user.id,'Pending',0,nameguarantor2],

          (tx, res) => {
            console.log('tx',tx)
  
    console.log('redddddd',res.rowsAffected);
  if(res.rowsAffected>0){
  
    props.navigation.goBack()
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

const mycninfront=()=>{
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        setcnicpicfront(image.path)
      });
}
const mycninback=()=>{
  ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setcnicpicback(image.path)
    });
}
const gurant1front=()=>{
  ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setg1front(image.path)
    });
}
const gurant1back=()=>{
  ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setg1back(image.path)
    });
  }
    const gurant2front=()=>{
      ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image);
          setg2front(image.path)
        });
    }
    const gurant2back=()=>{
      ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image);
          setg2back(image.path)
        });
      }

  return (
    <Container backgroundColor={AppTheme.background}>
        <ScrollView style={{paddingBottom:hp(6)}}>

    <View style={styles.inputView}>
    <Text style={styles.txtstyle}>Fill all requirment Carefully</Text>

<TextInput
style={styles.input}
onChangeText={setname}
value={name}
placeholder="Full name"
placeholderTextColor={'gray'}


/>
<TextInput
style={styles.input}
onChangeText={setphonenumber}
value={phonenumber}
placeholder="Phone Number"
placeholderTextColor={'gray'}


/>
<TextInput
style={styles.input}
onChangeText={setCnic}
value={Cnic}
placeholder="Cnic Number"
placeholderTextColor={'gray'}


/>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>your Cnic Front</Text>
    <TouchableOpacity onPress={()=>mycninfront()}>
      {cnicpicfront==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:cnicpicfront}} style={styles.Cnic} />

    }

    </TouchableOpacity>
    

    </View>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>your Cnic Back</Text>
    <TouchableOpacity onPress={()=>mycninback()}>
    {cnicpicback==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:cnicpicback}} style={styles.Cnic} />

    }
      
  
    </TouchableOpacity>
    

    </View>
</View>
  <TextInput
style={styles.input}
onChangeText={setnameguarantor1}
value={nameguarantor1}
placeholder="Guarantor 1 Name"
placeholderTextColor={'gray'}


/>
  
<TextInput
style={styles.input}
onChangeText={setguarantor1Cnic}
value={guarantor1Cnic}
placeholder="Guarantor 1 Cnic"
placeholderTextColor={'gray'}


/>

<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 1 Cnic Front</Text>
    <TouchableOpacity onPress={()=>gurant1front()}>

    {guarantorcnicpicfront==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantorcnicpicfront}} style={styles.Cnic} />

    }

    </TouchableOpacity>
    

    </View>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 1 Cnic Back</Text>
    <TouchableOpacity  onPress={()=>gurant1back()}>
    {guarantor1cnicpicback==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantor1cnicpicback}} style={styles.Cnic} />

    }
    </TouchableOpacity>
    

    </View>
</View>
<TextInput
style={styles.input}
onChangeText={setnameguarantor2}
value={nameguarantor2}
placeholder="Guarantor 2 Name"
placeholderTextColor={'gray'}


/>
  
<TextInput
style={styles.input}
onChangeText={setguarantor2Cnic}
value={guarantor2Cnic}
placeholder="Guarantor 2 Cnic"
placeholderTextColor={'gray'}


/>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 2 Cnic Front</Text>
    <TouchableOpacity  onPress={()=>gurant2front()}>
    {guarantor2cnicpicfront==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantor2cnicpicfront}} style={styles.Cnic} />

    }
    </TouchableOpacity>
    

    </View>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 2 Cnic Back</Text>
    <TouchableOpacity  onPress={()=>gurant2back()}>
    {guarantor2cnicpicback==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantor2cnicpicback}} style={styles.Cnic} />

    }
    </TouchableOpacity>
    

    </View>
</View>
</View>

<View style={{bottom:hp(0),marginTop:hp(6),position:'absolute',borderWidth:0,alignSelf:'center'}}>
<Button
           title={'Book Now'}
           onPress={()=>Carrbooking()}
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
export default connect(mapStateToProps)(Bookcar)


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