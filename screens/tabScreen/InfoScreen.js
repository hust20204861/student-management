import { View, Text, Button, TextInput, TouchableOpacity, Platform, ScrollView } from "react-native";
import styles from "../../styles/style";
import { useState } from "react";


const InfoScreen = () => {
  const data = [
    { name: "A", grade: 5, class: "B", isPurchased: true },
    { name: "B", grade: 5, class: "B", isPurchased: false },
    { name: "C", grade: 5, class: "B", isPurchased: true },
    { name: "D", grade: 5, class: "B", isPurchased: false },
    { name: "E", grade: 5, class: "B", isPurchased: true }
  ];
  const data2 = [
    { name: "Aaaa", grade: 4, class: "B", isPurchased: true },
    { name: "Bbbb", grade: 4, class: "B", isPurchased: false },
    { name: "Cccc", grade: 4, class: "B", isPurchased: true },
    { name: "Dddd", grade: 4, class: "B", isPurchased: false },
    { name: "Eeee", grade: 4, class: "B", isPurchased: true }
  ];
  const [dataa, setDataa] = useState(data);
  const schoolClick = () => {
    setDataa(data);
  }
  const teacherClick = () => {
    setDataa(data2);
  }



  const renderItems = (items) => (
    items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{ marginBottom: 10 }}
        // onPress={() => navigation.navigate('Profile', { student: item })}
      >
        <View>
          <Text style={{ fontSize: 18 }}>Tên: {item.name}</Text>
          <Text>Lớp: {item.grade}{item.class}</Text>
        </View>
      </TouchableOpacity>
    ))
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,}}>
        <TouchableOpacity onPress={schoolClick}>
          <Text style={{ textAlign: 'center' }}>
            School
          </Text>
    
        </TouchableOpacity>
        <TouchableOpacity onPress={teacherClick}>
          <Text style={{ textAlign: 'center' }}>
          Teacher
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {renderItems(dataa)}
      </View>
    </ScrollView>
  );
}

export default InfoScreen