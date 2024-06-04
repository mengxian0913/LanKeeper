import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Quize from "./Quize/Quize";
import { NavigationContainer } from "@react-navigation/native";
import { TabBarIcon } from "@/components/Themed";
import Home from "./Home/Home";
import Setting from "./Setting/Setting";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />

        <Tab.Screen
          name="quize"
          component={Quize}
          options={{
            title: "Quize",
            tabBarIcon: ({ color }) => (
              // <FontAwesome6 name="file-pen" size={24} color="black" />
              <TabBarIcon name="pencil" color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="setting"
          component={Setting}
          options={{
            title: "Setting",
            tabBarIcon: ({ color }) => (
              // <FontAwesome6 name="file-pen" size={24} color="black" />
              <TabBarIcon name="person" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabLayout;
