import React, { useRef, RefObject } from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import SearchBottom from "./SearchBottom/SearchBottom";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface searchBottomProps {
  bottomSheetRef: RefObject<BottomSheet>;
}

const Search = ({ bottomSheetRef }: searchBottomProps) => {
  const handleOpenBottomSheet = () => {
    console.log("123");
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <Pressable
      onPress={handleOpenBottomSheet}
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.light.tint,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
      >
        <FontAwesome name="search" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export default Search;
