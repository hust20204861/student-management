import React from "react";
import LoginScreen from "../screens/authScreens/LoginScreen";
import StudentProfile from "../screens/authScreens/StudentProfile";
import InfoScreen from "../screens/tabScreen/InfoScreen";
import MainScreen from "../screens/MainScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export default function ScreenNavigate() {
    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Login" component={LoginScreen} options={{ title:"LoginPage", headerTitleAlign: "center"}}/>
            <Stack.Screen name = "Main" component={MainScreen} options={{ title:"Main", headerTitleAlign: "center"}}/>
            <Stack.Screen name = "Profile" component={StudentProfile}/>
            <Stack.Screen name = "Infomation" component={InfoScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}