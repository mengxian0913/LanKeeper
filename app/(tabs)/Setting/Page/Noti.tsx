import { Text, View, Switch, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import styles from "./Styles";

const NoticeScreen = () => {
  const [checked,SetChecked] = useState(false);
  const ToggleSwitch = () => {
    SetChecked(checked=>!checked);
  }
  const frequency = [{title:"Everyday",value:1},{title:"Every two day",value:2},{title:"Every three day",value:3},{title:"Once a week",value:4}]; 
  return(
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={{flexDirection:"row"}} onPress={ToggleSwitch}>
        <Text style={styles.flattext}>Notice                      </Text>
        <Text style={styles.flattext}>Close</Text>
        <Switch
          style={styles.flattext}
          value={checked}
          onValueChange={ToggleSwitch}
        />
        <Text style={styles.flattext}>Open</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row",justifyContent: "space-between"}}>
          <Text style={styles.flattext}>Frequency:</Text>
          <SelectDropdown
            data={frequency}
            onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);}}
            renderButton={(selectedItem, isOpened) => {
            return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Select frequency'}
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
export default NoticeScreen;
