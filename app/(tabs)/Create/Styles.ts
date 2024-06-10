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
    textAlign: "center",
  },  
  flatlist: {
    width: "100%",
  },
  flattext: {
    color: Colors.light.text,
    marginVertical: 25,
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  view: {
    backgroundColor: Colors.dark.background,
  },
  textinput: {
    textAlign: "center",
    fontSize: 20,
    borderColor: Colors.light.tabIconDefault,
    borderWidth: 3,
    borderCurve: "circular",
  }
});

export default styles;
