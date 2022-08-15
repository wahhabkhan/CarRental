import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Container from '../../../components/Container';
import { wp,hp } from '../../../FontResponsiveness/FontResponsiveness';
import { CommonActions } from "@react-navigation/routers";
import { AppTheme } from '../../../theme/theme';
import { iconPath } from '../../../Constants/iconandImages';

const Splash = (props) => {
    useEffect(() => {
        setTimeout(() => {
            let time = new Date().getTime()
            let time2=time-1659551597721;
               let second=time2/1000
               console.log(second);
            //    if(second<=801487.832){
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: "Login",
                        },
                    ],
                })
            );
        // }
        // else{
        //     alert('Contect Developer')
        // }
        }, 3000);
    }, [])
    return (
        <Container backgroundColor={"#11153A"}>
            <View style={styles.mainContainer}>
                <Image source={iconPath.nabanaIcon} style={styles.splash} />
            </View>
        </Container>
    )
}
export default Splash;
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: AppTheme.background,
    },
    splash: {
        alignSelf: 'center',
        width: wp(70),
        height: hp(40),
        resizeMode: 'contain'
    },
});
