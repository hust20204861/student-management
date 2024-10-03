import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import Pdf from 'react-native-pdf'; 
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs'
import * as Progress from 'react-native-progress';

const PdfsRender = ({item}) => {
    const [isPdfVisible, setPdfVisible] = useState(false);
    const [pdfPath, setPdfPath] = useState('');
    const [loadDown, setLoadDown] = useState(false)
    const [progress, setProgress] = useState(0)

    const getFileExtension = (fileName) => {
        return fileName.split('.').pop(); 
    };
//Open and Close PDF file
const handlePress = async (filePath, fileName) => {
    const fileExtension = getFileExtension(fileName);
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`; 
    const fileExists = await RNFS.exists(localFilePath);
    if (fileExists) {
        setPdfPath(localFilePath);
        setPdfVisible(true);
    } else {
        setLoadDown(true);
        setProgress(0); 
        try {
            const response = await RNFS.downloadFile({
                fromUrl: filePath,
                toFile: localFilePath,
                progress: (res) => {
                    const progressValue = res.bytesWritten / res.contentLength; 
                    setProgress(progressValue); 
                },
            }).promise;

            if (response.statusCode === 200) {
                setPdfPath(localFilePath); 
                setPdfVisible(true);
            } else {
                Alert.alert('Lỗi', 'Không thể tải xuống file PDF.');
            }
        } catch (error) {
            console.error('Lỗi khi tải xuống file PDF:', error);
            Alert.alert('Lỗi', 'Không thể tải xuống file PDF.');
        } finally{
            setLoadDown(false);
        }
    }
};
    const closePdf = () => {
        setPdfVisible(false);
    };

    return (
        <View style={styles.container}>
            {item.map((file, index) => (
                <TouchableOpacity style={styles.attachmentContainer} key={index} onPress={() => handlePress(file.info.original.url, file.original_name)}>
                 <Icon name="file-pdf-o" size={30} style={{color:'red'}}/>
                 <View>
                 <Text style={styles.fileName}>{file.original_name}</Text>
                 { loadDown && <Progress.Bar progress={progress} width={300} style={{ position:'absolute', top:25, left:10}}/>}
                 </View>
             </TouchableOpacity>
            ))}
            <Modal visible={isPdfVisible} onRequestClose={closePdf} animationType="slide">
                <View style={{ flex: 1 }}>
                
                    <Pdf
                        source={{uri: pdfPath}}
                        trustAllCerts={false}
                        onLoadComplete={(numberOfPages) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log('PDF Error:', error);
                            Alert.alert('Error', 'Failed to load PDF: ' + error.message);
                        }}
                        style={styles.pdf}
                    />
                    <Icon
                        name="arrow-left" 
                        size={24}
                        onPress={closePdf}
                        style={styles.closeButton} 
                    />     
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:15,
        paddingBottom:5,
    },
    attachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        borderBottomColor: '#ccc',
    },
    fileName: {
        marginLeft: 10,
        fontSize: 16,
        color:'black'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        left: 5,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    navigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    pageInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        width: 80,
        marginRight: 10,
    },
    goButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    goButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    input: {
        borderWidth:1,
        borderRadius:10,
        width:Dimensions.get('window').width,
    }
});

export default PdfsRender;
