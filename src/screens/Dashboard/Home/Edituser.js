import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity,Text,TouchableWithoutFeedback,TextInput,Keyboard } from 'react-native';
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import {Button,AppTheme,Loader} from '../../../components/index';
import {openDatabase} from 'react-native-sqlite-storage';
import { connect } from "react-redux";
import { adduserinfo } from '../../../redux/actions/userDataAction';
import Toast from 'react-native-simple-toast';


const Edituser = (props) => {
    console.log(props.user);
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
const [emailInput, setEmailInput] = useState(props.user.email);
const [passwordInput, setPasswordInput] = useState(props.user.password);
const [name, setname] = useState(props.user.name);
const [phonenumber, setphonenumber] = useState(props.user.phonenumber.toString());
const [eror, seteror] = useState(false);
const [erormessage, seterormessage] = useState('');
const [loading, setloading] = useState(false);
  const registeruser=()=>{
  

    if(!emailInput || !passwordInput || !name || !phonenumber){
      seteror(true)
      seterormessage('Please Fill all field')

    }

    else{
     
    //   setloading(true)
    try {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Users set name=?,email=?,phonenumber=?,password=? where id=?',
          [name,emailInput,phonenumber,passwordInput,props.user.id],
          (tx, res) => {
  
    console.log('redddddd');
  if(res.rowsAffected>0){

    db.transaction(async tx => {
      tx.executeSql(
        'SELECT * FROM Users where id=?',
        [props.user.id],
        async (tx, results) => {
       console.log('jhghjgjhgjhgj',results.rows.item(0))
       if (results.rows.length>0) { 
        props.adduserinfo(results.rows.item(0))
         Toast.show('Record Edit.')

        props.navigation.goBack()

       }
        })})
  
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
            {'Update your account'}
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

          

          
          <View style={{marginTop:hp(40)}}>
           
           <Button
           title={'Update'}
           onPress={()=>registeruser()}
           />
      <Loader loading={loading} />
                    
                        </View>
        </View>
       
      </TouchableWithoutFeedback>
     
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    adduserinfo: (data) => dispatch(adduserinfo(data)),
  }
}
const mapStateToProps = (state) => {
  console.log('state===>>>', state)
  return {
    user: state.userdataReducer.user,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Edituser)

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

