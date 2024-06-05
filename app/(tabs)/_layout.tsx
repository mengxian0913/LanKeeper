import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Quize from "./Quize/Quize";
import { NavigationContainer } from "@react-navigation/native";
import { TabBarIcon } from "@/components/Themed";
import Home from "./Home/Home";
import Setting from "./Setting/Setting";
import Create from "./Create/Create";

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
              <TabBarIcon name="pencil" color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="create"
          component={Create}
          options={{
            title: "Create",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="add-circle" color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="setting"
          component={Setting}
          options={{
            title: "Setting",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="person" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabLayout;
