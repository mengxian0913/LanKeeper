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
    marginVertical:10,
    textAlign: "center",
    fontSize: 20,
    borderColor: Colors.light.tabIconDefault,
    borderWidth: 3,
    borderCurve: "circular",
    width:screenWidth*0.7,
    borderRadius: 20,
  },
  textfield: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical:10,
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
  dropdownButtonStyle: {
      marginVertical: 0,
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
});

export default styles;
