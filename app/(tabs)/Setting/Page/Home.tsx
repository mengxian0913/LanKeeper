import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { screenWidth } from "@/constants/Config";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const data = ["Account", "Display", "Notification", "AboutUs"];

interface NavItemProps {
  selection: string;
}

const NavItem = ({ selection }: NavItemProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(selection as never)}
      style={{ marginVertical: 15 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          backgroundColor: "white",
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "500" }}>{selection}</Text>
        <Entypo name="chevron-thin-right" size={24} color="black" />
      </View>
    </Pressable>
  );
};

const HomeScreen = () => {
  return (
    <View
      style={{ width: screenWidth, paddingHorizontal: 15, paddingVertical: 20 }}
    >
      {data.map((item, index) => (
        <NavItem selection={item} key={index} />
      ))}
    </View>
  );
};

export default HomeScreen;
