import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity,Text,TouchableWithoutFeedback,TextInput,Keyboard } from 'react-native';
import { hp, wp } from '../../FontResponsiveness/FontResponsiveness';
import {Button,AppTheme} from '../../components/index';
import {openDatabase} from 'react-native-sqlite-storage';
import { connect } from "react-redux";
import { adduserinfo } from '../../redux/actions/userDataAction';
import Toast from 'react-native-simple-toast';

const Login = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, seterror] = useState(false);
    const [errormessage, seterrormessage] = useState('');

    const checkUser=(type)=>{
      if(type=='customer'){
                  
                      props.navigation.navigate('UserBottom')
                      Toast.show('Login Success.')
                  }
                  else{
                    props.navigation.navigate('BottomTab')
                    Toast.show('Login Success.')
                   
                  }
    }
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
    const loginuser=()=>{
      if(!emailInput || !passwordInput){
   seterrormessage('Enter email and password')

      }
      else{
      
console.log('emailInput',emailInput,'passwordInput',passwordInput);
if (emailInput=='admin@gmail.com') {
  
} else {
  
}
        try {
   
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Users where email=? AND password=?',
              [emailInput,passwordInput],
              (tx, results) => {   
                console.log('jkhkjhkjhkjh',results.rows.length)
            if (results.rows.length>0) {
                  
              props.adduserinfo(results.rows.item(0))
              console.log(results.rows.item(0).type)
              checkUser(results.rows.item(0).type)
             
            } else {
              
                seterrormessage('Invalid Email or Password')
                seterror(true)
            }
        

              })})

        } catch (error) {
          console.log('error=====>>',error);
        }

      


        // props.navigation.navigate('BottomTab')
      }
    }
    return (
        <View style={styles.mainContainer} >
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <Text style={styles.loginAccount}>
            {'Login to your account'}
          </Text>
          <Text style={{...styles.loginAccount,color:'red'}}>
            {errormessage}
          </Text>
          <View style={styles.inputView}>
          <TextInput
        style={styles.input}
        onChangeText={(text)=>{setEmailInput(text),seterrormessage('')}}
        value={emailInput}
        placeholder="Email"
placeholderTextColor={'gray'}
color={AppTheme.textColorWhite}

       
      />
            <View style={{marginTop: 10}}>
            <TextInput
        style={styles.input}
        onChangeText={(text)=>{setPasswordInput(text), seterrormessage('')}}
        value={passwordInput}
placeholderTextColor={'gray'}
color={AppTheme.textColorWhite}

        placeholder="Password"
       
      />
            </View>
            
          </View>

          

          <TouchableOpacity
            style={styles.haveAccount}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text
              style={{
                color: '#94959B',
              }}>{`Don't have an account?`}</Text>
            <Text style={styles.register}>
              {'Register'}
            </Text>
          </TouchableOpacity>
          <View style={{marginTop:hp(5)}}>
           
           <Button
           title={'Login'}
           onPress={()=>loginuser()}
           />
                    
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
        marginTop:hp(5)
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

