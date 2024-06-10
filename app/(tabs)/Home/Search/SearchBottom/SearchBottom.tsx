import React, { useMemo, RefObject } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

interface searchBottomProps {
  bottomSheetRef: RefObject<BottomSheet>;
}

const SearchBottom = ({ bottomSheetRef }: searchBottomProps) => {
  const snapPoints = useMemo(() => ["50%"], []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      ref={bottomSheetRef}
    >
      <PanGestureHandler>
        <Text>123</Text>
      </PanGestureHandler>
    </BottomSheet>
  );
};

export default SearchBottom;
