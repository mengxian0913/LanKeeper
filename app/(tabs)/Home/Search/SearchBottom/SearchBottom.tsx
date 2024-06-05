import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const SearchBottom = () => {
  const snapPoints = useMemo(() => ["50%"], []);

  return (
    <BottomSheet snapPoints={snapPoints} index={-1} enablePanDownToClose={true}>
      <PanGestureHandler>
        <Text>123</Text>
      </PanGestureHandler>
    </BottomSheet>
  );
};

export default SearchBottom;
