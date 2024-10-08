import React, { useState } from "react";
import { View, Modal, TouchableWithoutFeedback, Dimensions, ScrollView, Image, Text } from "react-native";
import ImageView from 'react-native-image-view';
import styles from "../../../styles/style"; 

const ImageFullRender = ({ item, isFullScreen, handleModalClose, currentImageIndex }) => {
    
    const imagesForView = item.map(img => ({
        source: { uri: img.large.url }, 
        width: img.large.width,
        height: img.large.height,
    }));
    console.log(imagesForView,"hhhhhhhh")

    return (
        <Modal visible={isFullScreen} transparent={true} onRequestClose={handleModalClose}>
        <View >
            {/* Sử dụng ImageView thay vì ScrollView */}
            <ImageView
                images={imagesForView} // Cung cấp danh sách hình ảnh
                imageIndex={currentImageIndex} // Chỉ số hình ảnh hiện tại
                isVisible={isFullScreen} // Kiểm soát hiển thị modal
                onClose={handleModalClose} // Hàm đóng modal
                useNativeDriver = {false}
                renderFooter={(currentImage) => (
                    <View >
                        <Text>{currentImage.title || 'Image'}</Text>
                    </View>
                )}
            />
        </View>
    </Modal>
    );
};

export default ImageFullRender;
