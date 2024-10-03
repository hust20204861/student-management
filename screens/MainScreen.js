import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PublicActions from "./tabScreen/PublicActionScreen";
import ApplicationScreen from "./tabScreen/ApplicationScreen";
import PrivateActions from "./tabScreen/PrivateActionScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import Activities from "./tabScreen/ActivitiesScreen";

const MainScreen = ({route}) => {
const data = route.params.data;
const Tab = createBottomTabNavigator();
  return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false, }}>
            <Tab.Screen name = "Public" component={PublicActions} initialParams={{data : data}}
             options={{ headerShown: false, tabBarIcon: ({ size }) => (<Icon name="home" color= 'gray' size={size} />),
        }}/>
            <Tab.Screen name = "Private" component={PrivateActions} initialParams={{data : data}}
            options={{ headerShown: false, tabBarIcon: ({ size }) => (<Icon name="bell" color= 'gray' size={size} />),
        }}/>
        <Tab.Screen name = "Activities" component={Activities} initialParams={{data : data}}
             options={{ headerShown: false, tabBarIcon: ({ size }) => (<Icon name="image" color= 'gray' size={size} />),
        }}/>
            <Tab.Screen name = "Application" component={ApplicationScreen} initialParams={{data : data}}
            options={{ headerShown: false, tabBarIcon: ({ size }) => (<Icon name="bars" color= 'gray' size={size} />),
        }}/>
            {/* <Tab.Screen name = "HocSinh" component={ListScreen} 
            options={{ title:"Cá nhân", headerTitleAlign: "left", tabBarIcon: ({ size }) => (<Icon name="user" color= 'gray' size={size} />),
        }}/> */}
        </Tab.Navigator>
  );
}

export default MainScreen