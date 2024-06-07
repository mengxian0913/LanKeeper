import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "@/constants/Colors";
import HomeScreen from "./Home.tsx";
import DisplayScreen from "./Display.tsx";
import Aboutus from "./Aboutus.tsx";
import AccountScreen from "./Account.tsx";

const Stack = createNativeStackNavigator();

const PageHandler = () => {
  return(
    <>
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{
      headerTitleAlign: 'left' ,
      headerTintColor: Colors.light.text,
      headerStyle: {backgroundColor:Colors.light.tint,},
      }} >
        <Stack.Screen name="Setting" component={HomeScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Display" component={DisplayScreen} />
        <Stack.Screen name="AboutUs" component={Aboutus} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}
export default PageHandler;
