import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PublicActions from "./tabScreen/PublicActionScreen";
import ApplicationScreen from "./tabScreen/ApplicationScreen";
import PrivateActions from "./tabScreen/PrivateActionScreen";
import Icon from 'react-native-vector-icons/FontAwesome';



const MainScreen = ({route}) => {
    const data = route.params.data
const Tab = createBottomTabNavigator();
  return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            {/* <Tab.Screen name = "Pdf" component={PdfsRender} 
            options={{ title:"PDF", headerTitleAlign: "left", tabBarIcon: ({ size }) => (<Icon name="file-pdf-o" color= 'gray' size={size} />),
        }}/> */}
            <Tab.Screen name = "Public" component={PublicActions} initialParams={{data : data}}
             options={{ title:"Trang Chủ", headerTitleAlign: "left", tabBarIcon: ({ size }) => (<Icon name="home" color= 'gray' size={size} />),
        }}/>
            <Tab.Screen name = "Private" component={PrivateActions} initialParams={{data : data}}
            options={{ title:"Thông báo rieng", headerTitleAlign: "left", tabBarIcon: ({ size }) => (<Icon name="bell" color= 'gray' size={size} />),
        }}/>
            <Tab.Screen name = "Application" component={ApplicationScreen} initialParams={{data : data}}
            options={{ title:"Ung dung", headerTitleAlign: "left", tabBarIcon: ({ size }) => (<Icon name="bars" color= 'gray' size={size} />),
        }}/>
            {/* <Tab.Screen name = "Hoc Sinh" component={ListScreen} 
            options={{ title:"Cá nhân", headerTitleAlign: "left", tabBarIcon: ({ size }) => (<Icon name="user" color= 'gray' size={size} />),
        }}/> */}
        </Tab.Navigator>
  );
}

export default MainScreen