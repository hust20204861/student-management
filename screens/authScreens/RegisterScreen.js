// import { View, Text, Button, TouchableOpacity, Alert, TextInput } from "react-native";
// import styles from "../../styles/style";
// import { useState } from "react";
// const RegisterScreen = ({ navigation }) => {
   
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [comparePassword, setComparePassword] = useState('');
  
//     const handleRegister = () => {
//         // Thêm logic đăng ký ở đây (kiểm tra thông tin, gọi API, v.v.)
//         if (email && password) {
//             Alert.alert('Login Successful', `Welcome, ${email}!`);
//             navigation.navigate("Login");
//         } else {
//             Alert.alert('Error', 'Please enter both email and password.');
//         };
        
//     };
  
//     return (
//         <View style={styles.homeContainer}>
//             <Text style={styles.homeTitle}>Welcome to the Login Screen!</Text>
            
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//             />
  
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 autoCapitalize="none"
//             />

// <TextInput
//                 style={styles.input}
//                 placeholder="Enter your password"
//                 value={comparePassword}
//                 onChangeText={setComparePassword}
//                 secureTextEntry
//                 autoCapitalize="none"
//             />
  
//             <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
//                 <Text style={styles.buttonTextRegister}>Register</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// export default RegisterScreen