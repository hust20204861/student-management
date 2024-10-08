import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Dimensions, Modal, PanResponder, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderUsersLike from './RenderUsersLike';
import RenderItem from './RenderItem';
  
const DataRenderer = ({ data, loadingStates, refreshing, onRefresh, loadMore, contentType }) => {
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  let url = '/api/school/v1/parent/interaction/liked-users';
  let url1 = '/api/school/v1/parent/interaction/liked-users';

  const handleGetUsersLike = async(item) => {
    setSelectedItem(item);
    setIsShowUsers(true);
  }
  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsShowUsers(false);
      setSelectedItem(null);
    });
  };

  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.6; 
  const translateY = useRef(new Animated.Value(modalHeight)).current; // Ban đầu modal chiếm 40% chiều cao
  const maxModalHeight = screenHeight * 0.15;
  // PanResponder để xử lý cử chỉ kéo
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // Khi kéo xuống (dy > 0), modal sẽ di chuyển theo
        if (gestureState.dy > 0) {
          translateY.setValue(modalHeight + gestureState.dy); // Di chuyển xuống theo cử chỉ
        } else if (gestureState.dy < 0) {
          // Khi kéo lên, modal không được kéo lên vượt quá giới hạn maxModalHeight (0)
          translateY.setValue(Math.max(maxModalHeight, modalHeight + gestureState.dy));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) {
          // Nếu kéo xuống quá xa, modal đóng lại
          Animated.timing(translateY, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsShowUsers(false));
        } else if (gestureState.dy < -150) {
          // Nếu kéo lên đủ xa, giữ modal ở trạng thái tối đa (top)
          Animated.spring(translateY, {
            toValue: maxModalHeight,
            useNativeDriver: true,
          }).start();
        } else {
          // Nếu kéo không đủ xa, đưa modal về vị trí cũ (40% chiều cao)
          Animated.spring(translateY, {
            toValue: modalHeight,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isShowUsers) {
      Animated.spring(translateY, {
        toValue: modalHeight,
        useNativeDriver: true,
      }).start();
    }
  }, [isShowUsers]);
  
  return (
    <View style={{ backgroundColor:"#c7c8c9",}}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} loadingStates={loadingStates} handleGetUsersLike={() => handleGetUsersLike(item)} contentType={contentType}/>} 
        keyExtractor={(item) => item.Id.toString()} 
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
      />
      <Modal visible={isShowUsers}
            transparent={true}
            onRequestClose={handleClose}>
              {/* <TouchableWithoutFeedback onPress={handleClose}> */}
           <View style={{ flex: 1, justifyContent: 'flex-end' }}>
           <Animated.View
            style={{
              position: 'absolute',
              height: screenHeight,
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              transform: [{ translateY }],
            }}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity onPress={handleClose} style={{  width: 0.9 * Dimensions.get('window').width, 
                                                              justifyContent:'center', 
                                                              alignItems:'center',
                                                              borderBottomWidth:1, 
                                                              borderBottomColor:'gray'}}>
            <Icon name="minus" size={40} style={{color:'black'}}/> 
            </TouchableOpacity>
            <RenderUsersLike
              item={selectedItem}
              url={url}
              url1={url1}
              contentType={contentType}
            />
             </Animated.View>
           </View>
           {/* </TouchableWithoutFeedback> */}
      </Modal>
    </View>
  );
};

export default DataRenderer;

