import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Handler from "./Page/Handler";

const Setting = () => {
  return (
    <GestureHandlerRootView>
      <Handler />
    </GestureHandlerRootView>
  );
};
export default Setting;
