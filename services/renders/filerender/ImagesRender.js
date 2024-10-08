import React from "react";
import { Image, View, TouchableOpacity, ScrollView, Text, Modal, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect, useRef } from "react";
import styles from "../../../styles/style";
import ImageFullRender from "./ImageFullRender";
import RNFS from 'react-native-fs'
import * as Progress from 'react-native-progress';
const directoryPath = `${RNFS.DocumentDirectoryPath}/saved_images`;
const saveImageToFile = async (fileUrl, fileName) => {
    const filePath = `${directoryPath}/${fileName}`;
    try {
        const fileExists = await RNFS.exists(filePath);
        if (fileExists) {
            // console.log(`File đã tồn tại: ${filePath}. Bỏ qua tải xuống.`);
            return;
        }
      const downloadResult = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: filePath,
      }).promise;
  
      if (downloadResult.statusCode === 200) {
        console.log(`Ảnh đã được lưu: ${filePath}`);
      } else {
        console.log('Tải xuống ảnh thất bại:', downloadResult.statusCode);
      }
    } catch (error) {
      console.error('Lỗi khi tải xuống ảnh:', error);
    }
  };

  const manageImageStorage = async () => {
    try {
      const files = await RNFS.readDir(directoryPath); 
      if (files.length > 50) {
        const oldestFile = files[0]; 
        await RNFS.unlink(oldestFile.path); 
        console.log(`Đã xóa tệp cũ nhất: ${oldestFile.path}`);
      }
    } catch (error) {
      console.error('Lỗi khi quản lý bộ nhớ ảnh:', error);
    }
  };

export const ImagesRender = React.memo(({item}) => {
    useEffect(() => {
        RNFS.mkdir(directoryPath).catch(err => console.log('Lỗi khi tạo thư mục:', err));
      }, []);
  useEffect(() => {
        item.forEach(async (img) => {
          const fileUrl = img.large.url.split('?')[0];
          const fileName = img.large.url.split('?')[0].split('_').pop();
          await saveImageToFile(fileUrl, fileName); 
          await manageImageStorage(); 
        });
      }, [item]);

    const [imageOrientation, setImageOrientation] = useState({ isHorizontal: false, isVertical: false, isSquare: false });
    useEffect(() => {
        if (Array.isArray(item) && item.length > 0) {
                    const isHorizontal = item[0].small.width > item[0].small.height;
                    const isVertical = item[0].small.height > item[0].small.width;
                    const isSquare = item[0].small.width === item[0].small.height;
                setImageOrientation({ isHorizontal, isVertical, isSquare });
        }
    }, [item]);
            
    const placeholder = "https://file.hstatic.net/200000397757/file/lazyload_e95df2e69ca44092831654bec491fb77_large.jpg"
    const [imageSources, setImageSources] = useState(new Array(item.length).fill(placeholder)); 
    
    useEffect(() => {
        //check xem file ảnh đã được lưu trước hay chưa
        const checkAndLoadImages = async () => {
            for (let index = 0; index < item.length; index++) {
                const img = item[index];
                const fileUrl = img.large.url;
                const fileName = fileUrl.split('?')[0].split('_').pop();
                const filePath = `${directoryPath}/${fileName}`;
    
                const fileExists = await RNFS.exists(filePath);
                //nếu đã có file ảnh, render từ file đã lưu ngay
                if (fileExists) {
                    setImageSources(prev => ({
                        ...prev,
                        [index]: `file://${filePath}`,
                    }));
                } else {
                    // setImageSources((prevSources) => ({
                    //     ...prevSources,
                    //     [index]: item[index].small.url,
                    //     }))

                    setImageSources((prevSources) => ({
                        ...prevSources,
                        [index]: item[index].large.url.split('?')[0]
                        }));       
                }
            }
        };
        checkAndLoadImages();
    }, [item]);

    const [isFullScreen, setFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const scrollViewRef = useRef(null);

    const handleImagePress = (index) => {
        setCurrentImageIndex(index); 
        setFullScreen(true); 
    };
    const handleModalClose = () => {
        setFullScreen(false); 
    };
    // const goToNextImage = () => {
    //     if (currentImageIndex < item.length - 1) {
    //         const nextIndex = currentImageIndex + 1;
    //         setCurrentImageIndex(nextIndex);
    //         scrollViewRef.current?.scrollTo({ x: nextIndex * Dimensions.get('window').width, animated: true });
    //     }
    // };
    // const goToPreviousImage = () => {
    //     if (currentImageIndex > 0) {
    //         const prevIndex = currentImageIndex - 1;
    //         setCurrentImageIndex(prevIndex);
    //         scrollViewRef.current?.scrollTo({ x: prevIndex * Dimensions.get('window').width, animated: true });
    //     }
    // };

    const renderByCount = () => {
    const imageCount = item.length 
    switch (imageCount){
        case 0: 
        return null;
        case 1:
            return (
            <TouchableOpacity key={0} style={styles.singleImage} onPress={() => handleImagePress(0)}>
                <Image source={{ uri: imageSources[0] }} style={styles.image}/>
            </TouchableOpacity>
            );
        case 2:
            return (
            <View>
                {imageOrientation.isHorizontal && (
                <View style={{flexDirection: 'colum',}}>
                <TouchableOpacity style={styles.twoimageHorizontal0} onPress={() => handleImagePress(0)}>
                <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.twoimageHorizontal} onPress={() => handleImagePress(1)}>
                <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                )}
                {imageOrientation.isVertical && (
                <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
                <TouchableOpacity style={styles.twoimageVertical0} onPress={() => handleImagePress(0)}>
                <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.twoimageVertical} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                )}
                {imageOrientation.isSquare && (
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <TouchableOpacity style={styles.twoimageSquare0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.twoimageSquare} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                )}
            </View>
            );
        case 3:
            return(
            <View>
                {imageOrientation.isHorizontal && (
                <View >
                <TouchableOpacity style={styles.threeimageHorizontal0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                <TouchableOpacity style={styles.threeimageHorizontal} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.threeimageHorizontal} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                </View>
                )}
                {imageOrientation.isVertical && (
                <View  style={{flexDirection:'row'}}>
                <TouchableOpacity  style={styles.threeimageVertical0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <View style={{flexDirection:'colum'}}>
                <TouchableOpacity style={styles.threeimageVertical} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.threeimageVertical} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                </View>
                )}
                {imageOrientation.isSquare && (
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.threeimageSquare0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.threeimageSquare} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.threeimageSquare} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                )}
            </View>
            )   
        case 4:
            return(
            <View>
                {imageOrientation.isHorizontal && (
                <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.fourimageHorizontal0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(3)}>
                    <Image source={{ uri: imageSources[3] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                </View>
                )}
                {imageOrientation.isVertical && (
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.fourimageVertical0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(3)}>
                    <Image source={{ uri: imageSources[3] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                </View>
                )}
                {imageOrientation.isSquare && (
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <TouchableOpacity style={styles.fourimageSquare0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(3)}>
                    <Image source={{ uri: imageSources[3] }} style={styles.image}/>
                </TouchableOpacity>
                </View>
                )}
            </View>
            ) 
        default: 
            return(
            <View>
                {imageOrientation.isHorizontal && (
                <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.fourimageHorizontal0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(3)}>
                    <Image source={{ uri: imageSources[3] }} style={styles.image}/>
                    <View style={styles.overlay}>
                        <Text style={styles.remainingText}>
                                    +{item.length - 4}
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
                </View>
                )}
                {imageOrientation.isVertical && (
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.fourimageVertical0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri:imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(3)}>
                    <Image source={{ uri: imageSources[3] }} style={styles.image}/>
                    <View style={styles.overlay}>
                        <Text style={styles.remainingText}>
                                    +{item.length - 4}
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
                </View>
                )}
                {imageOrientation.isSquare && (
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <TouchableOpacity style={styles.fourimageSquare0} onPress={() => handleImagePress(0)}>
                    <Image source={{ uri: imageSources[0] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(1)}>
                    <Image source={{ uri: imageSources[1] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(2)}>
                    <Image source={{ uri: imageSources[2] }} style={styles.image}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(3)}>
                    <Image source={{ uri: imageSources[3] }} style={styles.image}/>
                    <View style={styles.overlay}>
                        <Text style={styles.remainingText}>
                                    +{item.length - 4}
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
                )} 
            </View>
            ) 
    }

}
return (
    <View >
    {renderByCount()}
    <Modal visible={isFullScreen} 
            transparent={true} 
            onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
            <ScrollView  
            ref={scrollViewRef} 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            scrollEventThrottle={16}
            // onScroll={scrollHandler}
            contentOffset={{ x: currentImageIndex * Dimensions.get('window').width }}>
                {
                    item.map((img, index) => (
                        <View key={index} style={styles.fullScreenImageContainer}>

                        <TouchableWithoutFeedback  onPress={handleModalClose}>
                            <Image source={{ uri: img.large.url }} style={[styles.fullScreenImage,]} />
                        </TouchableWithoutFeedback>

                        {/* {currentImageIndex > 0 && (
                            <TouchableOpacity style={styles.navButtonPrevious} onPress={goToPreviousImage}>
                                <Icon name="chevron-left" size={30}/>
                            </TouchableOpacity>
                        )}
                        {currentImageIndex < item.length - 1 && (
                            <TouchableOpacity style={styles.navButtonNext} onPress={goToNextImage}>
                                <Icon name="chevron-right" size={30}/>
                            </TouchableOpacity>
                        )} */}
                        </View>
                    ))
               
                       }
            </ScrollView>
        </View>
    </Modal>
    </View>
    
);
})


