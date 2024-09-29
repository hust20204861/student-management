import React, { useState } from 'react';
import {  View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Video from 'react-native-video';
import styles from '../../styles/style';

export const VideosRender = ({item}) => {
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
              source={item[0].original.url}
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



