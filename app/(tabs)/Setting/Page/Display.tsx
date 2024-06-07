import { Text, View, Switch, TouchableOpacity, Modal, TextInput, SafeAreaView, Button} from "react-native";
import React, { useState } from "react";
import styles from "./Styles";

const DisplayScreen = () => {
  const [checked,SetChecked] = useState(false);
  const [modal,Setmodal] = useState(false);
  const [textsize,Setsize] = useState("16");
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
        <TouchableOpacity onPress={() => Setmodal(true)}>
          <Text style={styles.flattext}>Text Size:   {textsize}</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={false} visible={modal}>
          <SafeAreaView style={{alignItems:"center"}}>
          <Text style={styles.flattext}>TextSize:</Text>
          <TextInput style={styles.textsizeinput} type="text" value={textsize} onChangeText={Setsize} keyboardType="numeric"/>
          <Button onPress={()=>Setmodal(false)} title="Comfirm"/>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  )
};
export default DisplayScreen;
