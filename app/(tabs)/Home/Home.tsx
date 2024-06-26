import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Search from "./Search/Search";
import BottomSheet from "@gorhom/bottom-sheet";
import SearchBottom from "./Search/SearchBottom/SearchBottom";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import VocCard, { vocType } from "./VocCard/VocCard";
import { screenWidth } from "@/constants/Config";
import VocInfo from "./VocCard/VocInfo/VocInfo";
import Colors from "@/constants/Colors";
import * as Fs from "expo-file-system";
import { vocFileName } from "@/constants/fileName";
import { MyContext, myContextType } from "../_layout";

const VocCards = () => {
  const file = Fs.documentDirectory + vocFileName;
  const [voc, setVoc] = useState<vocType[] | null>(null);
  const { reFetch } = useContext(MyContext) as myContextType;

  const getVocCards = async () => {
    const currentVoc = await Fs.readAsStringAsync(file);
    const currentVocJson = JSON.parse(currentVoc) as vocType[];
    currentVocJson.sort((a, b) => a.rememberValue - b.rememberValue);
    console.log("minRememberValue: ", currentVocJson[0].rememberValue);
    console.log(
      "maxRememberValue: ",
      currentVocJson[currentVocJson.length - 1].rememberValue,
    );
    setVoc(currentVocJson);
  };

  useEffect(() => {
    getVocCards();
  }, [reFetch]);

  return (
    <ScrollView>
      <View
        style={{ width: screenWidth, height: "auto", alignItems: "center" }}
      >
        {voc && voc.map((item, index) => <VocCard voc={item} key={index} />)}
      </View>
    </ScrollView>
  );
};

const Content = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <VocCards />
      <Search bottomSheetRef={bottomSheetRef} />
      <SearchBottom bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  );
};

export type RootStackParamList = {
  VocHome: undefined;
  CardInfo: vocType;
};

const ItemStack = createNativeStackNavigator<RootStackParamList>();

const Home = () => {
  return (
    <ItemStack.Navigator
      initialRouteName="VocHome"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerTintColor: Colors.light.text,
        headerStyle: { backgroundColor: Colors.light.tint },
      }}
    >
      <ItemStack.Screen name="VocHome" component={Content} />
      <ItemStack.Screen name="CardInfo" component={VocInfo} />
    </ItemStack.Navigator>
  );
};

export default Home;
