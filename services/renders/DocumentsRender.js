import { WebView } from 'react-native-webview';
import React, { useState, useEffect } from 'react';
import { View,  TouchableOpacity, Text, Alert, Modal, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

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
             <Icon name="file" size={30} />
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    attachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    fileName: {
        marginLeft: 10,
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 60,
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