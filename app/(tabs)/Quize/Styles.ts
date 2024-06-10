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
    fontWeight: "500",
    marginVertical:20,
    width:screenWidth*0.9,
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
export default styles;
