// import React from 'react';
// import { View, Text, FlatList,  } from 'react-native';
// import  ImageLoading  from '../loadings/ImageLoading';
// import styles from '../../styles/style';
// import AttachmentsRender from './AttachmentsRender';

// const DataRenderer = ({ data, loadingStates, refreshing, onRefresh }) => {
//   const RenderItem = ({item}) => {
//         return (
//             <View>
//             {loadingStates[item.Id] ? (
//                         <View  key={item.Id} style={{marginBottom: 30}}>
//                         <ImageLoading/>
//                         </View>
//                         ) : (
//                         <View key={item.Id} style={styles.actionsContainer}>
//                         <View style={{paddingLeft:10, paddingRight:10}}>
//                         {item.TotalSeen != null && (<Text style={{margin:5}}>{item.TotalSeen} Saw</Text>)}
//                         <Text style={{fontWeight:'bold', fontSize:24, marginBottom:10}}>{item.Title}</Text>
//                         <Text style={{fontSize:18, marginBottom:5}}>{item.Content}</Text>
//                         </View>
//                         <AttachmentsRender items={item.Attachments}/>
//                         <Text style={{margin:5}}>Date: {item.ContactDate}</Text>
//                         </View>
//                        )} 
//             </View>
//                );        
//   };
//   return (
//     <View style={{ padding: 5,  }}>
//       <FlatList
//         data={data} 
//         renderItem={RenderItem}
//         keyExtractor={item => item.Id.toString()} 
//         refreshing={refreshing}
//         onRefresh={onRefresh}
//       />
//     </View>
//   );
// };

// export default DataRenderer;

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ImageLoading from '../loadings/ImageLoading';
import styles from '../../styles/style';
import AttachmentsRender from './AttachmentsRender';

// Di chuyển RenderItem ra ngoài để tránh việc tái tạo mỗi lần DataRenderer re-render
const RenderItem = React.memo(({ item, loadingStates }) => {
  return (
    <View>
      {loadingStates[item.Id] ? (
        <View key={item.Id} style={{ marginBottom: 30 }}>
          <ImageLoading />
        </View>
      ) : (
        <View key={item.Id} style={styles.actionsContainer}>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 5, marginTop:15, color:'black' }}>
              {item.Title}
            </Text>
            {item.Content && (<Text style={{ fontSize: 18, marginBottom: 5, color:'black' }}>{item.Content}</Text>)}
          </View>
          <AttachmentsRender items={item.Attachments} />
          <View style={{flexDirection:'row'}}>
          <Text style={{ margin: 10 }}>{item.ContactDate}</Text>
          {item.TotalSeen != null && (
              <Text style={{ margin: 10, left:170 }}>{item.TotalSeen} Saw</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
});

const DataRenderer = ({ data, loadingStates, refreshing, onRefresh }) => {
  return (
    <View style={{ backgroundColor:"#c7c8c9" }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} loadingStates={loadingStates} />} 
        keyExtractor={(item) => item.Id.toString()} 
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default DataRenderer;

