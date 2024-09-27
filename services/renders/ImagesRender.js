import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, ScrollView, Text, Modal, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/style";


export const ImagesRender = ({item}) => {
        const [imageOrientation, setImageOrientation] = useState({ isHorizontal: false, isVertical: false, isSquare: false });
        useEffect(() => {
            if (Array.isArray(item) && item.length > 0) {
                Image.getSize(
                    item[0],
                    (width, height) => {
                        const isHorizontal = width > height;
                        const isVertical = height > width;
                        const isSquare = width === height;
    
                        setImageOrientation({ isHorizontal, isVertical, isSquare });
                    },
                    (error) => {
                        console.error('Failed to get image size:', error);
                    }
                );
            }
        }, [item]);



        

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





    // const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    // const handleDimensionsChange = ({ window }) => {
    //     console.log("sddsgvdsf")
    //     setDimensions(window);
    // };
    // useEffect(() => {
    //     const subscription = Dimensions.addEventListener('change', handleDimensionsChange);

    //     return () => {
    //         subscription?.remove();
    //     };
    // }, []);
    // const isPortrait = dimensions.height >= dimensions.width; 
    




    const renderByCount = () => {
        const imageCount = item.length 
        switch (imageCount){
            case 0: 
            return null;
            case 1:
                return (
                        <TouchableOpacity style={styles.singleImage} onPress={() => handleImagePress(0)}>
                            <Image source={{ uri: item[0] }} style={styles.image} />
                        </TouchableOpacity>
                );
            case 2:
                return (
                    <View>
                        {imageOrientation.isHorizontal && (
                            <View style={{flexDirection: 'colum',}}>
                                <TouchableOpacity style={styles.twoimageHorizontal0} onPress={() => handleImagePress(0)}>
                                    <Image source={{ uri: item[0] }}  style={styles.image}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.twoimageHorizontal} onPress={() => handleImagePress(1)}>
                                    <Image source={{ uri: item[1] }} style={styles.image} />
                                </TouchableOpacity>
                            </View>
                        )}
                        {imageOrientation.isVertical && (
                            <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.twoimageVertical0} onPress={() => handleImagePress(0)}>
                                    <Image source={{ uri: item[0] }} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.twoimageVertical} onPress={() => handleImagePress(1)}>
                                    <Image source={{ uri: item[1] }} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                        )}
                        {imageOrientation.isSquare && (
                            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.twoimageSquare0} onPress={() => handleImagePress(0)}>
                                    <Image source={{ uri: item[0] }} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.twoimageSquare} onPress={() => handleImagePress(1)}>
                                    <Image source={{ uri: item[1] }} style={styles.image} />
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
                                <Image source={{ uri: item[0] }} style={styles.image} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                            <TouchableOpacity style={styles.threeimageHorizontal} onPress={() => handleImagePress(1)}>
                                <Image source={{ uri: item[1] }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.threeimageHorizontal} onPress={() => handleImagePress(2)}>
                                <Image source={{ uri: item[2] }} style={styles.image} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isVertical && (
                        <View  style={{flexDirection:'row'}}>
                            <TouchableOpacity  style={styles.threeimageVertical0} onPress={() => handleImagePress(0)}>
                                <Image source={{ uri: item[0] }} style={styles.image} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'colum'}}>
                            <TouchableOpacity style={styles.threeimageVertical} onPress={() => handleImagePress(1)}>
                                <Image source={{ uri: item[1] }}  style={styles.image}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.threeimageVertical} onPress={() => handleImagePress(2)}>
                                <Image source={{ uri: item[2] }} style={styles.image} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isSquare && (
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity style={styles.threeimageSquare0} onPress={() => handleImagePress(0)}>
                                <Image source={{ uri: item[0] }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.threeimageSquare} onPress={() => handleImagePress(1)}>
                                <Image source={{ uri: item[1] }} style={styles.image}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.threeimageSquare} onPress={() => handleImagePress(2)}>
                                <Image source={{ uri: item[2] }}  style={styles.image}/>
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
                                <Image source={{ uri: item[0] }}  style={styles.image}/>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(1)}>
                                <Image source={{ uri: item[1] }}  style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(2)}>
                                <Image source={{ uri: item[2] }}   style={styles.image}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(3)}>
                                <Image source={{ uri: item[3] }}  style={styles.image} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isVertical && (
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={styles.fourimageVertical0} onPress={() => handleImagePress(0)}>
                                <Image source={{ uri: item[0] }} style={styles.image} />
                            </TouchableOpacity>
                            <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                            <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(1)}>
                                <Image source={{ uri: item[1] }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(2)}>
                                <Image source={{ uri: item[2] }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(3)}>
                                <Image source={{ uri: item[3] }} style={styles.image} />
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {imageOrientation.isSquare && (
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            <TouchableOpacity style={styles.fourimageSquare0} onPress={() => handleImagePress(0)}>
                                <Image source={{ uri: item[0] }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(1)}>
                                <Image source={{ uri: item[1] }} style={styles.image}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(2)}>
                                <Image source={{ uri: item[2] }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(3)}>
                                <Image source={{ uri: item[3] }}  style={styles.image}/>
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
                            <Image source={{ uri: item[0] }}  style={styles.image}/>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: item[1] }}  style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: item[2] }}   style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageHorizontal} onPress={() => handleImagePress(3)}>
                            <Image source={{ uri: item[3] }}  style={styles.image}/>
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
                            <Image source={{ uri: item[0] }} style={styles.image} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'colum', justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: item[1] }} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: item[2] }} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageVertical} onPress={() => handleImagePress(3)}>
                            <Image source={{ uri: item[3] }}  style={styles.image}/>
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
                            <Image source={{ uri: item[0] }} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(1)}>
                            <Image source={{ uri: item[1] }} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(2)}>
                            <Image source={{ uri: item[2] }} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourimageSquare} onPress={() => handleImagePress(3)}>
                            <Image source={{ uri: item[3] }}  style={styles.image}/>
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
                            item.map((uri, index) => (
                                <View key={index} style={styles.fullScreenImageContainer}>

                                <TouchableOpacity  onPress={handleModalClose}>
                                    <Image source={{ uri }} style={[styles.fullScreenImage,]} />
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
                                <Image source={{ uri: item }} style={styles.fullScreenImage} />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                   
                </View>
            </Modal>
        </View>
       
    );
}


