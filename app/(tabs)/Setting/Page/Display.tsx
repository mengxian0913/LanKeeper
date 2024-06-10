import { Text, View, Switch, TouchableOpacity} from "react-native";
import React, { useState, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import SettingJson from "../Setting.json";
import styles from "./Styles";

const DisplayScreen = () => {
  const [checked,SetChecked] = useState(SettingJson.Theme);
  const Selector = useRef("Medium");
  const textsize = [{title:"Large",value:"28"},{title:"Medium",value:"22"},{title:"Small",value:"16"}];
  const ToggleSwitch = () => {
    SetChecked(checked=>!checked);
  }

  return(
        <View style={styles.container}>
      <View>
        <TouchableOpacity style={{flexDirection:"row"}} onPress={ToggleSwitch}>
        <Text style={styles.flattext}>Theme                      </Text>
        <Text style={styles.flattext}>Light</Text>
        <Switch
          style={styles.flattext}
          value={checked}
          onValueChange={ToggleSwitch}
        />
        <Text style={styles.flattext}>Dark</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row",justifyContent: "space-between"}}>
          <Text style={styles.flattext}>Text Size:</Text>

          <SelectDropdown
            data={textsize}
            onSelect={(selectedItem, index) => {
            Selector.current = selectedItem.title;            
            console.log(selectedItem, index);}}
            renderButton={(selectedItem, isOpened) => {
            return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || SettingJson.TextFont}
              </Text>
            </View>);}}
            renderItem={(item, index, isSelected) => {
            return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>);}}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle} /> 
        </View>
      </View>
    </View>
  )
};
export default DisplayScreen;
