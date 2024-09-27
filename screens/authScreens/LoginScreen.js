import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/style";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { fakeLogin, getDataWithToken } from "../../api/fetchAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login } from "../../api/fetchAPI";

const LoginScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] =useState("")

  const handleLogin = async() => {
    const data = await Login({email, password});
    if(data.code == 200){
        setErrorMessage(null)
        navigation.replace("Main")
    }
    if(data.code != 200){
        if(data.errors){
            setErrorMessage(data.errors);
        }else{
            Alert.alert(data.message);

        }
    }
  }

  return (
      <View style={styles.homeContainer}>
          <Text style={styles.homeTitle}>Welcome to the Login Screen!</Text>
          
          <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
          />
          {errorMessage && errorMessage.email && 
          <View style={{flexDirection:'row'}}>
          <View style={{ width: 20, height: 20,borderRadius: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center',marginRight: 8, }}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',}}>{"!"}</Text>
          </View>
          <Text style={{color: 'red', fontSize: 14,textAlign: 'center', }}>{errorMessage.email}</Text>
          </View>}

          <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
          />
          {errorMessage && errorMessage.password && 
          <View style={{flexDirection:'row'}}>
          <View style={{ width: 20, height: 20,borderRadius: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center',marginRight: 8, }}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',}}>{"!"}</Text>
          </View>
          <Text style={{color: 'red', fontSize: 14,textAlign: 'center', }}>{errorMessage.password}</Text>
          </View>}
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
      </View>
  );
}

export default LoginScreen