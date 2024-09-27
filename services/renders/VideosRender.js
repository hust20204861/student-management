import React, { useState, useRef, useEffect } from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, Text } from 'react-native';
import Video from 'react-native-video';
import styles from '../../styles/style';

export const VideosRender = () => {
    const item = require('../../assets/domdom.mp4')
    
console.log(item,"hh")
    //chuyển đổi mode khi màn hình nhỏ và lớn
    // const [isFullScreen, setIsFullScreen] = useState(false);
    // const toggleFullScreen = () => {
    //   setIsFullScreen(!isFullScreen);
    // };

const renderByCount = () => {
    return (
        <View >
            <View style={styles.renderVideo}>
            <TouchableWithoutFeedback>
            <Video
              source={item}
              style={styles.video}
            //   resizeMode={!isFullScreen ? 'contain' : 'contain'}
              resizeMode='contain'
              paused={true}
              controls={true}
            //   onFullscreenPlayerWillPresent={toggleFullScreen} 
            //   onFullscreenPlayerDidDismiss={toggleFullScreen} 
            />
            </TouchableWithoutFeedback>
            </View>
        </View>
      );
}

    return (
        <View style={styles.container}>
            {renderByCount()}
        </View>
    );
};



