import React from 'react';
import { SafeAreaView, Image, Dimensions, StatusBar, View } from 'react-native';
import { AppTheme } from '../theme/theme';
function Container(props) {
    return (
        <SafeAreaView style={[styles.container, props.style]}>
            <StatusBar
                backgroundColor={props.backgroundColor}
                barStyle="light-content"
            />
            {props.children}
        </SafeAreaView>
    );
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: AppTheme.background
    },
};
export default Container;