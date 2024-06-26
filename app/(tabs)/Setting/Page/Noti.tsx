import { Text, View, Switch, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import SettingJson from "../Setting.json";
import styles from "./Styles";
import { screenWidth } from "@/constants/Config";
import { Entypo } from "@expo/vector-icons";

const NoticeScreen = () => {
  const [settingData, Setsetting] = useState(SettingJson);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Setting");
        if (jsonValue != null) {
          Setsetting(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    loadSettings();
  }, []);

  const ToggleSwitch = async () => {
    const UpdateNotice = {
      ...settingData,
      Noticeenable: !settingData.Noticeenable,
    };
    Setsetting(UpdateNotice);
    await AsyncStorage.setItem("Setting", JSON.stringify(UpdateNotice));
  };
  const frequency = [
    { title: "Everyday", value: 1 },
    { title: "Every two day", value: 2 },
    { title: "Every three day", value: 3 },
    { title: "Once a week", value: 4 },
  ];

  const HandleSetting = async (selectedItem: {
    title: string;
    value: number;
  }) => {
    const UpdateSetting = {
      ...settingData,
      NoticeFrequency: selectedItem.title,
    };
    Setsetting(UpdateSetting);
    try {
      await AsyncStorage.setItem("Setting", JSON.stringify(UpdateSetting));
    } catch (err) {}
  };

  return (
    <View style={{ width: screenWidth, alignItems: "center" }}>
      <TouchableOpacity
        style={styles.frequencySelector}
        onPress={ToggleSwitch}
      >
        <Text style={styles.flattext}>Notice</Text>
        <View
          style={{
            width: screenWidth * 0.4,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Entypo name="sound-mute" size={24} color="black" />
          <Switch
            style={styles.flattext}
            value={settingData.Noticeenable}
            onValueChange={ToggleSwitch}
          />
          <Entypo name="sound" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.frequencySelector}>
        <Text style={styles.flattext}>Frequency:</Text>
        <SelectDropdown
          data={frequency}
          onSelect={HandleSetting}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) ||
                    settingData.NoticeFrequency}
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
  );
};
export default NoticeScreen;
