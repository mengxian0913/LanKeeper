import {Text, View, TouchableOpacity, Modal, SafeAreaView, Button} from "react-native";
import React, {useState} from "react";
import styles from "./Styles";


const AccountScreen = () => {
 const [modal,Setmodal] = useState(false);

  return(
    <View style={styles.container}>
      <Text style={styles.flattext}>UserName</Text>
      <Text style={styles.flattext}>Total Card:</Text>
      <TouchableOpacity onPress={() => Setmodal(true)}>
        <Text style={styles.flattext}>Back up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Setmodal(true)}>
          <Text style={styles.flattext}>Log Out</Text>
      </TouchableOpacity>

        <Modal animationType="slide" transparent={false} visible={modal}>
          <SafeAreaView style={{alignItems:"center"}}>
          <Text style={styles.flattext}>ONPRESS TEST</Text>
          
          <Button onPress={()=>Setmodal(false)} title="Comfirm"/>
          
          </SafeAreaView>
        </Modal>

    </View>
  )
};
export default AccountScreen;
