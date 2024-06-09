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
    textAlign: "center",
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
  view: {
    backgroundColor: Colors.dark.background,
  },
  flattextdark: {
    color: Colors.dark.text,
    marginVertical: 25,
    fontSize: 25,
    fontWeight: "500",
  },
  questionNumSelector: {
    fontSize: 25,
    marginVertical: 25,
    fontWeight: "500",
    textAlign: "center",
  },
});
export default styles;
