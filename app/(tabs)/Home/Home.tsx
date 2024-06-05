import React from "react";
import styles from "./styles";
import { SafeAreaView, Text, View } from "react-native";
import Search from "./Search/Search";
import SearchBottom from "./Search/SearchBottom/SearchBottom";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Header = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Vocbulary Card</Text>
    </SafeAreaView>
  );
};

const Home = () => {
  return (
    <GestureHandlerRootView>
      <View>
        <Header />
        <Search />
        <Text>Home</Text>
      </View>
      <SearchBottom />
    </GestureHandlerRootView>
  );
};

export default Home;
