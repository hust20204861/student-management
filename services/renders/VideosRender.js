import React, { useState } from 'react';
import {  View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Video from 'react-native-video';
import styles from '../../styles/style';
import Icon from 'react-native-vector-icons/FontAwesome';

export const VideosRender = ({item}) => {
    const [showIcon, setShowIcon] = useState(true)
    const [pause, setPause] = useState(true)
    const [control, setControl] = useState(false)
    const handleClick = () => {
        setPause(false);
        setShowIcon(false);
        setControl(true);
    }
    //chuyển đổi mode khi màn hình nhỏ và lớn
    // const [isFullScreen, setIsFullScreen] = useState(false);
    // const toggleFullScreen = () => {
    //   setIsFullScreen(!isFullScreen);
    // };

const renderByCount = () => {
    return (
        <View >
            <TouchableWithoutFeedback onPress={handleClick}>
            <View style={styles.renderVideo}>
            <Video
              source={{uri: item[0].original.url}}
              style={styles.video}
            //   resizeMode={!isFullScreen ? 'contain' : 'contain'}
              resizeMode='contain'
              paused={pause}
              controls={control}
            //   onFullscreenPlayerWillPresent={toggleFullScreen} 
            //   onFullscreenPlayerDidDismiss={toggleFullScreen} 
            />
            {showIcon && (<Icon name='play-circle' style={{color:'white', position: 'absolute',}} size={170}/>)}
            </View>
            </TouchableWithoutFeedback>
            
        </View>
      );
}

    return (
        <View style={styles.container}>
            {renderByCount()}
        </View>
    );
};



