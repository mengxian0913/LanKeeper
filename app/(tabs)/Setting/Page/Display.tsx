import { Text, View, Switch, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import SettingJson from "../Setting.json";
import styles from "./Styles";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "@/constants/Config";
import { isBlock } from "typescript";

const myTextSize = {
  Large: 28,
  Medium: 22,
  Small: 16,
};

const DisplayScreen = () => {
  const [checked, SetChecked] = useState(SettingJson.Theme);
  const [isBlack, setIsBlack] = useState<boolean>(true);
  const [selector, setSelector] = useState("Medium");
  const [ts, setTs] = useState(22);
  const Selector = useRef("Medium");
  const textsize = [
    { title: "Large", value: "28" },
    { title: "Medium", value: "22" },
    { title: "Small", value: "16" },
  ];
  const ToggleSwitch = () => {
    SetChecked((checked) => !checked);
    setIsBlack(!isBlack);
  };

  useEffect(() => {
    const currT = selector;
    console.log("currT: ", currT);

    if (currT == "Large") {
      setTs(28);
    } else if (currT == "Medium") {
      setTs(22);
    } else {
      setTs(16);
    }
  }, [selector]);

  useEffect(() => {
    console.log("ts: ", ts);
  }, [ts]);

  return (
    <View
      style={{
        alignItems: "center",
        minHeight: screenHeight,
        backgroundColor: !isBlack ? "black" : "#eee",
      }}
    >
      <View>
        <TouchableOpacity
          style={{
            marginVertical: 20,
            width: screenWidth * 0.9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: !isBlack ? "lightgray" : "white",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
          onPress={ToggleSwitch}
        >
          <Text
            style={{
              color: Colors.light.text,
              marginVertical: 25,
              fontSize: ts,
              fontWeight: "500",
            }}
          >
            Theme
          </Text>
          <Entypo name="light-up" size={24} color="black" />
          <Switch
            style={{
              marginHorizontal: -20,
            }}
            value={!checked}
            onValueChange={ToggleSwitch}
          />
          <Entypo name="moon" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 20,
            width: screenWidth * 0.9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: !isBlack ? "lightgray" : "white",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <Text
            style={{
              color: Colors.light.text,
              marginVertical: 25,
              fontSize: ts,
              fontWeight: "500",
            }}
          >
            Text Size:
          </Text>

          <SelectDropdown
            data={textsize}
            onSelect={(selectedItem, index) => {
              setSelector(selectedItem.title);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      SettingJson.TextFont}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      </View>
    </View>
  );
};
export default DisplayScreen;
