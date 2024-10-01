import React from "react";
import { Image, View, TouchableOpacity, ScrollView, Text, Modal, Dimensions, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/style";

export const ImagesRender = React.memo(({item}) => {

        const [imageOrientation, setImageOrientation] = useState({ isHorizontal: false, isVertical: false, isSquare: false });
        useEffect(() => {
            if (Array.isArray(item) && item.length > 0) {
                        const isHorizontal = item[0].small.width > item[0].small.height;
                        const isVertical = item[0].small.height > item[0].small.width;
                        const isSquare = item[0].small.width === item[0].small.height;
    
                        setImageOrientation({ isHorizontal, isVertical, isSquare });
            }
        }, [item]);

        // const loadImage = async (imageUrl) => {
        //     try {
        //       const startTime = Date.now(); 
        //       const response = await fetch(imageUrl);
        //       if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //       }
        //       const endTime = Date.now(); // End time
        //       const duration = (endTime - startTime) / 1000; 
        //       console.log(`Image load time: ${duration} seconds`);
        //     } catch (error) {
        //       console.error('Failed to load image:', error);
        //     }
        //   };
        //   loadImage(item[0].large.url);
          
        
        const placeholder = "https://file.hstatic.net/200000397757/file/lazyload_e95df2e69ca44092831654bec491fb77_large.jpg"

            const [imageSources, setImageSources] = useState(new Array(item.length).fill(placeholder)); 
            const [loadingState, setLoadingState] = useState({}); 
          
            useEffect(() => {
              const initialImageSources = {};
              const initialLoadingState = {};
          
              item.forEach((_, index) => {
                initialImageSources[index] = item[index].small.url;
                initialLoadingState[index] = {
                  small: true,
                  large: true,
                };
              });
              setImageSources(initialImageSources); 
              setLoadingState(initialLoadingState); 
            }, []);
            // Cập nhật source và trạng thái khi ảnh small tải xong
            const handleSmallImageLoad = (index) => {
              setLoadingState((prevState) => ({
                ...prevState,
                [index]: {
                  ...prevState[index],
                  small: false,

                },
              }));
            };
            // Cập nhật source và trạng thái khi ảnh large tải xong
            const handleLargeImageLoad = (index) => {
              setImageSources((prevSources) => ({
                ...prevSources,
                [index]: item[index].large.url,
              }));
              setLoadingState((prevState) => ({
                ...prevState,
                [index]: {
                  ...prevState[index],
                  large: false,
                },
              }));
            };
              

        
        const [isFullScreen, setFullScreen] = useState(false);
        const [currentImageIndex, setCurrentImageIndex] = useState(0); 
        const scrollViewRef = useRef(null);
        const isArray = Array.isArray(item);
    
        const handleImagePress = (index) => {
            setCurrentImageIndex(index); 
            setFullScreen(true); 
        };
    
        const handleModalClose = () => {
            setFullScreen(false); 
        };
        const goToNextImage = () => {
            if (currentImageIndex < item.length - 1) {
                const nextIndex = currentImageIndex + 1;
                setCurrentImageIndex(nextIndex);
                scrollViewRef.current?.scrollTo({ x: nextIndex * Dimensions.get('window').width, animated: true });
            }
        };
    const goToPreviousImage = () => {
        if (currentImageIndex > 0) {
            const prevIndex = currentImageIndex - 1;
            setCurrentImageIndex(prevIndex);
            scrollViewRef.current?.scrollTo({ x: prevIndex * Dimensions.get('window').width, animated: true });
        }
    };
    const renderByCount = () => {
        const imageCount = item.length 
        switch (imageCount){
            case 0: 
            return null;
            case 1:
                return (
                        <TouchableOpacity style={styles.singleImage} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                        </TouchableOpacity>
                );
            case 2:
                return (
                    <View>
                        {imageOrientation.isHorizontal && (
                            <View style={{flexDirection: 'colum',}}>
                                <TouchableOpacity style={styles.twoimageHorizontal0} onPress={() => handleImagePress(0)}>
                                    <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                                    <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.twoimageHorizontal} onPress={() => handleImagePress(1)}>
                                    <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                                    <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                                </TouchableOpacity>
                            </View>
                        )}
                        {imageOrientation.isVertical && (
                            <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.twoimageVertical0} onPress={() => handleImagePress(0)}>
                                    <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                                    <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.twoimageVertical} onPress={() => handleImagePress(1)}>
                                    <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                                    <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                                </TouchableOpacity>
                            </View>
                        )}
                        {imageOrientation.isSquare && (
                            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.twoimageSquare0} onPress={() => handleImagePress(0)}>
                                    <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                                    <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.twoimageSquare} onPress={() => handleImagePress(1)}>
                                    <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                                    <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
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
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                            <TouchableOpacity style={styles.threeimageHorizontal} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.threeimageHorizontal} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                            <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isVertical && (
                        <View  style={{flexDirection:'row'}}>
                            <TouchableOpacity  style={styles.threeimageVertical0} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'colum'}}>
                            <TouchableOpacity style={styles.threeimageVertical} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.threeimageVertical} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                            <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isSquare && (
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity style={styles.threeimageSquare0} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.threeimageSquare} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.threeimageSquare} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                            <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
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
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                            <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(3)}>
                            <Image source={{ uri: imageSources[3] }} style={styles.image} onLoad={() => handleSmallImageLoad(3)} />
                            <Image source={{ uri: item[3].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(3)} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isVertical && (
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={styles.fourimageVertical0} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                            <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                            <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(3)}>
                            <Image source={{ uri: imageSources[3] }} style={styles.image} onLoad={() => handleSmallImageLoad(3)} />
                            <Image source={{ uri: item[3].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(3)} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isSquare && (
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            <TouchableOpacity style={styles.fourimageSquare0} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                            <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(3)}>
                            <Image source={{ uri: imageSources[3] }} style={styles.image} onLoad={() => handleSmallImageLoad(3)} />
                            <Image source={{ uri: item[3].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(3)} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                ) 
            default: return(
                <View>
                {imageOrientation.isHorizontal && (
                    <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.fourimageHorizontal0} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                            <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                            <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(2)}>
                        <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                        <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(3)}>
                        <Image source={{ uri: imageSources[3] }} style={styles.image} onLoad={() => handleSmallImageLoad(3)} />
                        <Image source={{ uri: item[3].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(3)} />
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
                        <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                        <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(1)}>
                        <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                        <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(2)}>
                        <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                        <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(3)}>
                        <Image source={{ uri: imageSources[3] }} style={styles.image} onLoad={() => handleSmallImageLoad(3)} />
                        <Image source={{ uri: item[3].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(3)} />
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
                        <Image source={{ uri: imageSources[0] }} style={styles.image} onLoad={() => handleSmallImageLoad(0)} />
                        <Image source={{ uri: item[0].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(0)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(1)}>
                        <Image source={{ uri: imageSources[1] }} style={styles.image} onLoad={() => handleSmallImageLoad(1)} />
                        <Image source={{ uri: item[1].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(2)}>
                        <Image source={{ uri: imageSources[2] }} style={styles.image} onLoad={() => handleSmallImageLoad(2)} />
                        <Image source={{ uri: item[2].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(2)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(3)}>
                        <Image source={{ uri: imageSources[3] }} style={styles.image} onLoad={() => handleSmallImageLoad(3)} />
                        <Image source={{ uri: item[3].large.url }} style={[styles.hiddenImage]} onLoad={() => handleLargeImageLoad(3)} />
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
                    contentOffset={{ x: currentImageIndex * Dimensions.get('window').width }}>
                        {isArray ? (
                            item.map((img, index) => (
                                <View key={index} style={styles.fullScreenImageContainer}>

                                <TouchableOpacity  onPress={handleModalClose}>
                                    <Image source={{ uri: img.large.url }} style={[styles.fullScreenImage,]} />
                                </TouchableOpacity>

                {currentImageIndex > 0 && (
                    <TouchableOpacity style={styles.navButtonPrevious} onPress={goToPreviousImage}>
                        <Text style={styles.navButtonText}>{"<"}</Text>
                    </TouchableOpacity>
                )}
                {currentImageIndex < item.length - 1 && (
                    <TouchableOpacity style={styles.navButtonNext} onPress={goToNextImage}>
                        <Text style={styles.navButtonText}>{">"}</Text>
                    </TouchableOpacity>
                )}
                                </View>
                            ))
                        ) : (
                            <TouchableOpacity onPress={handleModalClose}>
                                <Image source={{ uri: item.large.url }} style={styles.fullScreenImage} />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                   
                </View>
            </Modal>
        </View>
       
    );
})


