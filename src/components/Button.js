import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppTheme,iconPath,ResponsiveText } from './index';
import { hp, wp } from '../FontResponsiveness/FontResponsiveness';

const Button = (props) => {
  return (
    <View style={styles.mainContainer}>

        <TouchableOpacity onPress={props.onPress} style={{borderWidth:0}}>
    <Image source={iconPath.buttonimg} style={styles.btnstyle} resizeMode='contain'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onPress} style={{borderWidth:0}}>
    <View style={styles.btntitle}>
        <Text style={styles.titlestyle}>{props.title}</Text>
    </View>
 </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: AppTheme.background,
        borderWidth:0,
        alignItems:'center',
        
      
    },
    btnstyle:{borderWidth:0,width:wp(90),height:hp(8)},

    btntitle:{position:'absolute',alignItems:'center',alignSelf:'center',bottom:hp(2.8)},
    titlestyle:{color:AppTheme.textColorWhite,fontSize:18,fontWeight:'500'}
  
})