import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { View,  TouchableOpacity, Text, Alert, Modal, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

export default PowerPointsRender = ({item}) => {
    const [isPptVisible, setPptVisible] = useState(false);
    const [pptPath, setPptPath] = useState('');
//Open and Close file
    const handlePress = (filePath) => {
        setPptVisible(true);
        setPptPath(filePath);
    };
    const closePpt = () => {
        setPptVisible(false);
    };

    return(
        <View style={styles.container}>
            {item.map((file, index) => (
            <TouchableOpacity style={styles.attachmentContainer} key={index} onPress={() => handlePress(file.info.original.url)}>
                <Icon name="file-powerpoint-o" size={30} style={{color:'orange'}} />
                <Text style={styles.fileName}>{file.original_name}</Text>
            </TouchableOpacity>
            ))}
        <Modal visible={isPptVisible} onRequestClose={closePpt} animationType="slide">
            <View style={{ flex: 1 }}>
            
                <WebView
                source={{ uri: `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptPath)}`,}}
                style={styles.doc}
                />
                <Icon
                    name="arrow-left" 
                    size={24}
                    onPress={closePpt}
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
        paddingLeft:15,
        paddingBottom:5,
        paddingBottom:5
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
        color:'white'
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    doc: {
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