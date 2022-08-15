import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity,Text,TouchableWithoutFeedback,TextInput,Keyboard } from 'react-native';
import { hp, wp } from '../../FontResponsiveness/FontResponsiveness';
import {Button,AppTheme,Loader} from '../../components/index';
import {openDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';


const Signup = (props) => {
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
const [emailInput, setEmailInput] = useState('');
const [passwordInput, setPasswordInput] = useState('');
const [name, setname] = useState('');
const [phonenumber, setphonenumber] = useState('');
const [eror, seteror] = useState(false);
const [erormessage, seterormessage] = useState('');
const [loading, setloading] = useState(false);
  const registeruser=()=>{
    console.log('====================================');
    console.log(name,emailInput,phonenumber,passwordInput);
    console.log('====================================');
   

    if(!emailInput || !passwordInput || !name || !phonenumber){
      seteror(true)
      seterormessage('Please Fill all field')

    }

    else{
     
      setloading(true)
    try {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users(name,email,phonenumber,password,type) VALUES (?,?,?,?,?)',
          [name,emailInput,phonenumber,passwordInput,'customer'],
          (tx, res) => {
  
    console.log('redddddd',res.rowsAffected);
  if(res.rowsAffected>0){
    Toast.show('Register Success.')
  
    props.navigation.navigate('Login')
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
        <View style={styles.mainContainer} >
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <Text style={styles.loginAccount}>
            {'Create your account'}
          </Text>
          {eror==true&&(
          <Text style={{...styles.loginAccount,color:'red'}}>
            {erormessage}
          </Text>
          )}
          <View style={styles.inputView}>

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
        onChangeText={setEmailInput}
        value={emailInput}
        placeholder="Email"
placeholderTextColor={'gray'}

       
      />
         
            <TextInput
        style={styles.input}
        onChangeText={setPasswordInput}
        value={passwordInput}
        placeholder="Password"
placeholderTextColor={'gray'}

       
      />
            
            
          </View>

          

          <TouchableOpacity
            style={styles.haveAccount}
            onPress={() => props.navigation.navigate('Login')}>
            <Text
              style={{
                color: '#94959B',
              }}>{`Already have an account?`}</Text>
            <Text style={styles.register}>
              {'Login'}
            </Text>
          </TouchableOpacity>
          <View style={{marginTop:hp(5)}}>
           
           <Button
           title={'Register'}
           onPress={()=>registeruser()}
           />
      <Loader loading={loading} />
                    
                        </View>
        </View>
       
      </TouchableWithoutFeedback>
     
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppTheme.background
    },
    inputView: {
        top: hp(10),
        width: '90%',
        alignSelf: 'center',
        borderWidth:0
      },
      registerInputView: {
        top: hp(6),
        width: '90%',
        alignSelf: 'center',
      },
      register: {
        color: '#FC4070',
        marginLeft: 5,
        fontWeight:'bold'
      },
      forgotview:{
        borderWidth:0,
        marginHorizontal:wp(6),
        marginTop:hp(15),
        justifyContent:'center',
        alignItems:'center'
    
      },
      input:{
        borderWidth:1,
        paddingLeft:10,
        borderColor:AppTheme.bordercolor,
        backgroundColor:AppTheme.texinputbackground,
        borderRadius:8,
        marginTop:20
    
      },
      haveAccount: {
        marginTop: hp(20),
        alignSelf: 'center',
        flexDirection: 'row',
      },
      alreadyHaveAccount: {
        marginTop: 120,
        alignSelf: 'center',
        flexDirection: 'row',
      },
      loginAccount: {
        color: AppTheme.textColorWhite,
        marginTop: 40,
      
        fontSize: 18,
        
        alignSelf:'center'
      },
      splash: {
        alignSelf: 'center',
        width: wp(60),
        height: wp(20),
        resizeMode: 'contain',
      },
      appName: {
        alignSelf: 'center',
        fontSize: 4,
        // fontWeight:'bold'
      },
      box: {
        height: 100,
        width: 150,
        borderRadius: 5,
        marginVertical: 40,
        backgroundColor: '#61dafb',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      SetYourPin: {
        alignSelf: 'center',
        color: '#000',
        marginTop: 40,
        fontSize: 9,
      },
      application: {
        alignSelf: 'center',
        color: '#94959B',
        marginTop: 40,
        fontSize: 4,
      },
      errormessage:{
        fontSize:5,
        color:'red'
      },
      errorview:{
        borderWidth:0,
        marginHorizontal:wp(6),
        alignItems:'center',marginTop:hp(6)
      }
});

