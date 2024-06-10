import React, { useRef } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View } from "react-native";
import Search from "./Search/Search";
import BottomSheet from "@gorhom/bottom-sheet";
import SearchBottom from "./Search/SearchBottom/SearchBottom";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const Header = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Vocbulary Card</Text>
    </SafeAreaView>
  );
};

const Content = () => {
  return <Text>12</Text>;
};

const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <Header />
      <Content />

      <Search bottomSheetRef={bottomSheetRef} />
      <SearchBottom bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  );
};

export default Home;
