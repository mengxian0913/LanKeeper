import React, { createContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Quize from "./Quize/Quize";
import { NavigationContainer } from "@react-navigation/native";
import { TabBarIcon } from "@/components/Themed";
import Home from "./Home/Home";
import Setting from "./Setting/Setting";
import Create from "./Create/Create";
import * as Fs from "expo-file-system";
import voc from "@constants/data/voc.json";
import { vocFileName } from "@/constants/fileName";

const Tab = createBottomTabNavigator();
export type myContextType = {
  reFetch: boolean;
  setReFetch: (key: boolean) => void;
};

export const MyContext = createContext<myContextType | undefined>(undefined);

type Datatype = (typeof voc)[0];

const TabLayout = () => {
  const [jsondata, Setjson] = useState<Datatype[]>([]);
  const [reFetch, setReFetch] = useState(true);

  const file = Fs.documentDirectory + vocFileName;

  useEffect(() => {
    const Read = async () => {
      const Fileexist = await Fs.getInfoAsync(file);
      if (!Fileexist.exists) {
        let tempData: Datatype[] = [];
        voc.forEach((item) => {
          const newData = {
            word: item.word,
            lexical: item.lexical,
            description: item.description,
            example: item.example,
            rememberValue: item.rememberValue,
          };
          tempData.push(newData);
        });
        await Fs.writeAsStringAsync(file, JSON.stringify(tempData));
        const TempforJson = await Fs.readAsStringAsync(file);
        Setjson(JSON.parse(TempforJson));
        //console.log(jsondata);
      }
    };
    Read();
  }, []);

  return (
    <MyContext.Provider value={{ reFetch, setReFetch }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="home"
            component={Home}
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color} />
              ),
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
    </MyContext.Provider>
  );
};

export default TabLayout;
