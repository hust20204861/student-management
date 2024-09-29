import { WebView } from 'react-native-webview';
import React, { useState, useEffect } from 'react';
import { View,  TouchableOpacity, Text, Alert, Modal, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style';

export default DocumentsRender = ({item}) => {
    const filePath = "https://docs.google.com/document/d/1ZPJW1LO1gQz7JAF1SA-KcRK1npAkeqPC/view"
    const [isPdfVisible, setPdfVisible] = useState(false);
    const [docPath, setDocPath] = useState('');
//Open and Close PDF file
    const handlePress = () => {
        setPdfVisible(true);
        setDocPath(filePath);
    };
    const closePdf = () => {
        setPdfVisible(false);
    };
    return(
        <View style={styles.container}>
        <TouchableOpacity style={styles.attachmentContainer} onPress={handlePress}>
             <Icon name="file" size={24} />
             <Text style={styles.fileName}>aaa</Text>
         </TouchableOpacity>

        <Modal visible={isPdfVisible} onRequestClose={closePdf} animationType="slide">
            <View style={{ flex: 1 }}>
            
                <WebView
                source={{uri : docPath}}
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
    )
}