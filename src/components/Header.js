import React from 'react';
import { View, StyleSheet, Image ,Text,TouchableOpacity} from 'react-native';
import { iconPath } from '../Constants/iconandImages';
import { wp } from '../FontResponsiveness/FontResponsiveness';
import { AppTheme } from '../theme/theme';
import Icons from 'react-native-vector-icons/dist/FontAwesome5';

const Header = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.toprowView}>
                <View>
                    <Image source={iconPath.nabanaIcon} style={styles.nabanaicon} />
                </View>
                <View style={styles.notificationProfilecontainer}>
                    <View>
                      <Text style={{color:AppTheme.textColorWhite,marginLeft:10}}>{props.name}</Text>
                    </View>
<TouchableOpacity onPress={props.onPress}>
              <Icons name="user-edit" size={25} color={AppTheme.iconcolor} />
                   
                 </TouchableOpacity>  
<TouchableOpacity onPress={props.logout}>
<Image source={iconPath.logout} style={styles.icons}  />

                   
                 </TouchableOpacity>  
                </View>
                
            </View>
            

        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: AppTheme.tabBackGroundcolor,
        borderBottomLeftRadius: wp(10),
        paddingHorizontal:wp(3)

    },
    toprowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center'
    },
    notificationProfilecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth:0,
        width:wp(35),
        alignItems:"center",
        marginRight:5

    },
    nabanaicon: {
        width: wp(30),
        height: wp(15),
        resizeMode: 'contain'
    },
    notificationimage: {
        width: wp(8),
        height: wp(8)
    },
    profileImage: {
        width: wp(8),
        height: wp(8),
        marginLeft: 5,
        borderRadius: 30
    },
    icons:{width:25,height:25},


});

