import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;


  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
            <LottieView
              style={styles.lottieStyle}
              source={require('../../loading.json')}
              autoPlay={true}
              loop={true}
              speed={2}
            />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:'transparent'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: 120,
    width: 120,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  
  lottieStyle:{
    width:70,
    height:70,


  
  }
});

export default Loader;