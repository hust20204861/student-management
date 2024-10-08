import { View, Text, FlatList, TouchableOpacity, Dimensions,  } from 'react-native';
import { PaginationData } from './PaginationData';

export default RenderUsersLike = ({ item, url, url1, contentType }) => {
    const { data: userData, loadMore } = PaginationData(url1, url, null, null, item.Id, contentType);
    return (
      <FlatList
        data={userData}
        renderItem={({ item: user }) => (
          <TouchableOpacity style={{ width: Dimensions.get('window').width, padding:20 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>{user.FullName}</Text>
            <View
            style={{
              width: '90%', 
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginTop: 15, 
              alignSelf: 'center', 
            }}
          />
          </TouchableOpacity>
        )}
        keyExtractor={(user) => user.Id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
       
      />
    );
  };


  