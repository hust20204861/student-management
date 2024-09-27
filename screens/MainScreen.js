import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "./tabScreen/List";
import PublicActions from "./tabScreen/PublicActionScreen";
import ApplicationScreen from "./tabScreen/ApplicationScreen";
import PrivateActions from "./tabScreen/PrivateActionScreen";
import { VideosRender } from "../services/renders/VideosRender";
import Icon from 'react-native-vector-icons/FontAwesome';
import PdfsRender from "../services/renders/PdfsRender";



const MainScreen = ({}) => {

const Tab = createBottomTabNavigator();
  return (
        <Tab.Navigator >
             <Tab.Screen name = "Public" component={PublicActions} options={{ title:"Thông báo chung", headerTitleAlign: "left", 
      tabBarIcon: ({ size }) => (
        <Icon name="bell" color= 'black' size={size} />
      ),
      }}/>
            <Tab.Screen name = "Video" component={VideosRender} />
            <Tab.Screen name = "Pdf" component={PdfsRender} />
            <Tab.Screen name = "Private" component={PrivateActions} />
            <Tab.Screen name = "Application" component={ApplicationScreen} />
            <Tab.Screen name = "Hoc Sinh" component={ListScreen} />
        </Tab.Navigator>
  );
}

export default MainScreen