import React from 'react';
import { View, Text, FlatList,  } from 'react-native';
import  ImageLoading  from '../loadings/ImageLoading';
import styles from '../../styles/style';
import AttachmentsRender from './AttachmentsRender';

const DataRenderer = ({ data, loadingStates, refreshing, onRefresh }) => {
  const RenderItem = ({item}) => {
        return (
            <View>
            {loadingStates[item.Id] ? (
                        <View  key={item.Id} style={{marginBottom: 30}}>
                        <ImageLoading/>
                        </View>
                        ) : (
                        <View key={item.Id} style={styles.actionsContainer}>
                        <Text>{item.TotalSeen} Saw</Text>
                        <Text style={{fontWeight:'bold', fontSize:24}}>{item.Title}</Text>
                        <Text style={{fontSize:16}}>{item.Content}</Text>
                        <AttachmentsRender items={item.Attachments}/>
                        <Text style={{margin:5}}>Date: {item.ContactDate}</Text>
                        </View>
                       )} 
            </View>
               );        
  };
  return (
    <View style={{ padding: 5 }}>
      <FlatList
        data={data} 
        renderItem={RenderItem}
        keyExtractor={item => item.Id} 
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default DataRenderer;


