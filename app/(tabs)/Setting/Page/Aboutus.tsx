import { Text, View, Button } from "react-native";
import React from "react";
import styles from "./Styles"

const Aboutus = () => {
  const style = styles.flattext;
  return(
    <View>
      <Text style={style}>Fcu IECS</Text>
      <Text style={style}>Vincent Yang D1109023</Text>
      <Text style={style}>Gray Tsao D1149576</Text>
    </View>
  )
};
export default Aboutus;

