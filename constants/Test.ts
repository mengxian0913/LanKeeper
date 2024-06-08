import { StyleSheet } from "react-native";

var StyleId = 1;
const StyleTest = StyleSheet.create({
  if(StyleId===1){
    return(
      test: {
       text: "#000", 
      }
    )
  }
  else {
    return(
      test: {
        text: "#FFF",
      }
    )
  }
});
export default StyleTest;
