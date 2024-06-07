import Colors from "@/constants/Colors";
import { screenHeight, screenWidth } from "@/constants/Config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    width: screenWidth,
    minHeight: screenHeight * 0.12,
    backgroundColor: Colors.light.tint,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
  },  
  flatlist: {
    width: "100%",
  },
  flattext: {
    color: Colors.light.text,
    marginVertical: 25,
    fontSize: 25,
    fontWeight: "500",
  },
  textsizeinput: {
    padding: 10,
    borderWidth: 1,
    width: 100,
  }
});

export default styles;
