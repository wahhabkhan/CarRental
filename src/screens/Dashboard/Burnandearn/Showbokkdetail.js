import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,ScrollView,Image, TouchableOpacity} from 'react-native'
import { hp, wp } from '../../../FontResponsiveness/FontResponsiveness';
import {Button,AppTheme,Container,iconPath} from '../../../components/index';
import ImagePicker from 'react-native-image-crop-picker';
import {openDatabase} from 'react-native-sqlite-storage';

const Showbokkdetail = (props) => {
    console.log(props.route.params.item.phonenumber);
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
    const [Cnic, setCnic] = useState(props.route.params.item.cnic);
const [name, setname] = useState(props.route.params.item.name);
const [phonenumber, setphonenumber] = useState(props.route.params.item.phonenumber.toString());
const [cnicpicfront, setcnicpicfront] = useState(props.route.params.item.cnicfront);
const [cnicpicback, setcnicpicback] = useState(props.route.params.item.cnicback);

const [guarantor1Cnic, setguarantor1Cnic] = useState(props.route.params.item.guranter1cnic);

const [guarantorcnicpicfront, setg1front] = useState(props.route.params.item.guranter1cnicfront);
const [nameguarantor1, setnameguarantor1] = useState(props.route.params.item.gurantar1name);
const [guarantor1cnicpicback, setg1back] = useState(props.route.params.item.guranter1cnicback);


const [guarantor2Cnic, setguarantor2Cnic] = useState(props.route.params.item.guranter2cnic);
const [guarantor2cnicpicfront, setg2front] = useState(props.route.params.item.guranter2cnicfront);
const [nameguarantor2, setnameguarantor2] = useState(props.route.params.item.nameguarantor2);
const [guarantor2cnicpicback, setg2back] = useState(props.route.params.item.guranter2cnicback);
const [errormessage, seterrormessage] = useState('');
const [error, seterror] = useState(false);


  return (
    <Container backgroundColor={AppTheme.background}>
        <ScrollView style={{paddingBottom:hp(6)}}>

    <View style={styles.inputView}>
    <Text style={styles.txtstyle}>User Detail</Text>

<TextInput
style={styles.input}
onChangeText={setname}
value={name}
placeholder="Full name"
placeholderTextColor={'white'}
editable={false}
color={'white'}



/>
<TextInput
style={styles.input}
value={phonenumber}
placeholder="Phone Number"
placeholderTextColor={'white'}
editable={false}
color={'white'}




/>
<TextInput
style={styles.input}
onChangeText={setCnic}
value={Cnic}
placeholder="Cnic Number"
placeholderTextColor={'white'}
editable={false}
color={'white'}




/>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Customer Cnic Front</Text>
    <View>
      {cnicpicfront==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:cnicpicfront}} style={styles.Cnic} />

    }

    </View>
    

    </View>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Customer Cnic Back</Text>
    <View>
    {cnicpicback==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:cnicpicback}} style={styles.Cnic} />

    }
      
  
    </View>
    

    </View>
</View>
  <TextInput
style={styles.input}
onChangeText={setnameguarantor1}
value={nameguarantor1}
placeholder="Guarantor 1 Name"
placeholderTextColor={'white'}
color={'white'}


editable={false}

/>
  
<TextInput
style={styles.input}
onChangeText={setguarantor1Cnic}
value={guarantor1Cnic}
placeholder="Guarantor 1 Cnic"
placeholderTextColor={'white'}
editable={false}
color={'white'}



/>

<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 1 Cnic Front</Text>
    <View>

    {guarantorcnicpicfront==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantorcnicpicfront}} style={styles.Cnic} />

    }

    </View>
    

    </View>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 1 Cnic Back</Text>
    <View>
    {guarantor1cnicpicback==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantor1cnicpicback}} style={styles.Cnic} />

    }
    </View>
    

    </View>
</View>
<TextInput
style={styles.input}
onChangeText={setnameguarantor2}
value={nameguarantor2}
placeholder="Guarantor 2 Name"
placeholderTextColor={'white'}
editable={false}
color={'white'}



/>
  
<TextInput
style={styles.input}
onChangeText={setguarantor2Cnic}
value={guarantor2Cnic}
placeholder="Guarantor 2 Cnic"
placeholderTextColor={'red'}
color={'white'}

editable={false}

/>
<View style={styles.cnicdesign}>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 2 Cnic Front</Text>
    <View>
    {guarantor2cnicpicfront==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantor2cnicpicfront}} style={styles.Cnic} />

    }
    </View>
    

    </View>
    <View style={styles.viewcnic}>
    <Text style={styles.txtstyle}>Guarantor 2 Cnic Back</Text>
    <View>
    {guarantor2cnicpicback==''?
    <Image source={ iconPath.Cnic} style={styles.Cnic} />
:
     
    <Image source={{uri:guarantor2cnicpicback}} style={styles.Cnic} />

    }
    </View>
    

    </View>
</View>
</View>


            </ScrollView>   
  
    </Container>
  )
}

export default Showbokkdetail

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