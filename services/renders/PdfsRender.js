import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal, FlatList, TextInput, Button } from 'react-native';
import Pdf from 'react-native-pdf'; 
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import { PDFDocument } from 'pdf-lib';


const PdfsRender = ({item}) => {
    const [isPdfVisible, setPdfVisible] = useState(false);
    const [pdfPath, setPdfPath] = useState('');
//Open and Close PDF file
    const handlePress = (filePath) => {
        setPdfVisible(true);
        setPdfPath(filePath);
    };
    const closePdf = () => {
        setPdfVisible(false);
    };



//     const [searchText, setSearchText] = useState('');
//     const [pdfText, setPdfText] = useState('');
//     const [foundPages, setFoundPages] = useState([]);

//     const extractTextFromPdf = async () => {
//     try {
//       // Fetch the PDF file
//       const res = await RNFetchBlob.config({ fileCache: true }).fetch('GET', filePath);
//       const pdfBytes = await res.readFile('base64');
//       // Load the PDF document
//       const pdfDoc = await PDFDocument.load(pdfBytes);
//       const pages = pdfDoc.getPages();
//       // Simulate extracting text from pages
//       let allText = '';
//       //làm sao để vòng for này hoạt động
//       for (let index = 0; index < pages.length; index++) {
//         const page = pages[index];
//         const textContent = await page.getTextContent(); // Trích xuất nội dung văn bản thực tế
//         // Kết hợp văn bản từ các item trong textContent
//         const pageText = textContent.items.map(item => item.str).join(' '); 
//         allText += `Page ${index + 1}: ${pageText} `; // Lưu văn bản của trang
//     }
//       setPdfText(allText);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to extract text: ' + error.message);
//     }
//   };

//     const handleSearch = () => {
//     const lowerCaseSearchText = searchText.toLowerCase();
//     const matches = [];
//     const pages = pdfText.split('Page'); 
//     pages.forEach((page, index) => {
//       if (page.toLowerCase().includes(lowerCaseSearchText)) {
//         matches.push(index + 1); 
//       }
//     });
//     if (matches.length > 0) {
//       setFoundPages(matches);
//       Alert.alert('Search Results', `Found on pages: ${matches.join(', ')}`);
//     } else {
//       Alert.alert('No Results', 'No matches found for your search.');
//     }
//   };

//   useEffect(() => {
//     extractTextFromPdf();
//   }, []);


    return (
        <View style={styles.container}>
            {item.map((file, index) => (
                <TouchableOpacity style={styles.attachmentContainer} key={index} onPress={() => handlePress(file.info.original.url)}>
                 <Icon name="file-pdf-o" size={30} />
                 <Text style={styles.fileName}>{file.original_name}</Text>
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
                {/* <View style={{flexDirection:'row'}}>
                <TextInput style={styles.input} placeholder="Search in PDF" value={searchText} onChangeText={setSearchText}/>
                {foundPages.length > 0 && (
                <Text  style={{ position: 'absolute', right:50, bottom:15 }}>
                Pages: {foundPages.join(', ')}
                </Text>
      )}
                <Icon name="search" onPress={handleSearch} size={24} style={{ position: 'absolute', right:15, bottom:13 }}/>
                </View> */}
                    
                </View>
            </Modal>
        </View>
    );
};

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
        color:"black",
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
