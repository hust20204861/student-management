import React from 'react';
import { View, Text,  Linking, FlatList, TouchableOpacity } from 'react-native';
import { ImagesRender } from './ImagesRender';
import  ImageLoading  from '../loadings/ImageLoading';
import NotificationLoading from '../loadings/NotificationLoading';
import styles from '../../styles/style';
// import { VideosRender } from './VideosRender';

const DataRenderer = ({ data, loadingStates, refreshing, onRefresh }) => {
 

  const RenderItem = ({item}) => {
    const handleLinkPress = () => {
      Linking.openURL(item.content); 
    };
    switch (item.type) {
      case "notification":
        return (
            <View >
            {loadingStates[item.id] ? (
                         <View key={item.id} style={{ marginBottom: 20 }}>
                         <NotificationLoading/>
                         </View>
                        ) : (
                        <View key={item.id} style={styles.actionsContainer}>
                        <Text style={{ fontWeight: "bold", color: "blue", fontSize: 20, marginBottom:10 }}>{item.content}</Text>
                        <Text style={{marginBottom:5}}>{new Date(item.timestamp).toLocaleString()}</Text>
                        </View>
                        )}
            </View>
        
        );
      case "image":
        return (
            <View>
            {loadingStates[item.id] ? (
                        <View  key={item.id} style={{marginBottom: 30}}>
                        <ImageLoading/>
                        </View>
                        ) : (
                        <View key={item.id} style={styles.actionsContainer}>
                        <ImagesRender item={item.content}  style={{ width: '100%', height: 200 , borderRadius : 8}} />
                        <Text style={{fontWeight: "bold", fontSize: 20, marginTop:20, marginBottom:10}}>{item.description}</Text>
                        <Text style={{ fontStyle: "italic", marginBottom:5 }}>Uploaded by: {item.uploadedBy}</Text>
                        </View>
                        )}
            </View>
               );
      // case "video":
      //   return (
      //       <View>
      //       {loadingStates[item.id] ? (
      //                   <View  key={item.id} style={{marginBottom: 30}}>
      //                   <ImageLoading/>
      //                   </View>
      //                   ) : (
      //                   <View key={item.id} style={styles.loadingContainer}>
      //                   <VideosRender item={item.content}  style={{ width: '100%', height: 200 , borderRadius : 8}} />
      //                   <Text style={{fontWeight: "bold", fontSize: 20, marginTop:20, marginBottom:10}}>{item.description}</Text>
      //                   <Text style={{ fontStyle: "italic", marginBottom:5 }}>Uploaded by: {item.uploadedBy}</Text>
      //                   </View>
      //                   )}
      //       </View>
      //          );         

      case "registration":
        return (
            <View key={item.id} style={styles.actionsContainer}>
            <Text style={{ fontWeight: "bold", marginTop:20, marginBottom:10,fontSize:20 }}>Event: {item.eventName}</Text>
            <Text style={{ marginBottom: 10 }}>Register here:
            <TouchableOpacity onPress={handleLinkPress}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
             {item.content}
            </Text>
            </TouchableOpacity>
            </Text>
            <Text style={{ marginBottom:10}}>Deadline: {new Date(item.deadline).toLocaleString()}</Text>
            </View>

        );
      default:
        return null;
    }
  };


  return (
    <View style={{ padding: 5 }}>
      <FlatList
        data={data} 
        renderItem={RenderItem}
        keyExtractor={item => item.id.toString()} 
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default DataRenderer;


