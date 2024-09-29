import { View, Text, Button, TextInput, TouchableOpacity, Platform } from "react-native";
import styles from "../../styles/style";

const StudentProfile = ({ route }) => {
  const data = route.params.data
  return (
      <View >
          {/* <Text style={styles.homeTitle}>Thông tin học sinh</Text>
          <Text>Tên Học sinh:{data.name}</Text>
          <Text>Lớp:{data.class}</Text>
          <Text>Điểm:{data.grade}</Text>
          <Text>ID:{data.id}</Text> */}
      </View> 
      
  );
}

export default StudentProfile