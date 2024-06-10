import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Styles";
import { screenHeight, screenWidth } from "@/constants/Config";
import * as Fs from "expo-file-system";
import { vocFileName } from "@/constants/fileName";
import { vocType } from "../../Home/VocCard/VocCard";
import { MyContext, myContextType } from "../../_layout";

const AccountScreen = () => {
  const [modal, Setmodal] = useState(false);
  const [amountOfVoc, setAmountOfVoc] = useState<number>(0);
  const { reFetch } = useContext(MyContext) as myContextType;

  const getAmountOfVoc = async () => {
    const filePath = Fs.documentDirectory + vocFileName;
    const data = await Fs.readAsStringAsync(filePath);
    const dataJson = (await JSON.parse(data)) as vocType[];
    setAmountOfVoc(dataJson.length);
  };

  useEffect(() => {
    getAmountOfVoc();
  }, [reFetch]);

  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: screenWidth * 0.9,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "600" }}>UserName</Text>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>Vincent</Text>
      </View>

      <View
        style={{
          width: screenWidth * 0.9,
          height: screenHeight * 0.15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          marginVertical: 40,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Total Card:</Text>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>{amountOfVoc}</Text>
      </View>
      <TouchableOpacity onPress={() => Setmodal(true)}>
        <Text style={styles.flattext}>Back up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Setmodal(true)}>
        <Text style={styles.flattext}>Log Out</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={false} visible={modal}>
        <SafeAreaView style={{ alignItems: "center" }}>
          <Text style={styles.flattext}>ONPRESS TEST</Text>
          <Button onPress={() => Setmodal(false)} title="Comfirm" />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
export default AccountScreen;
