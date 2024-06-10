import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { screenWidth, screenHeight } from "@/constants/Config";
import { vocType } from "../VocCard";
import Colors from "@/constants/Colors";
import { Alert } from "react-native";
import * as Fs from "expo-file-system";
import { vocFileName } from "@/constants/fileName";
import { useNavigation } from "expo-router";

interface deleteProps {
  wordToDelete: string;
  reFetch: boolean;
  setReFetch: (key: boolean) => void;
}

const DeleteButton = ({ wordToDelete, reFetch, setReFetch }: deleteProps) => {
  const navigation = useNavigation();

  const handleDelete = async () => {
    const filePath = Fs.documentDirectory + vocFileName;
    try {
      console.log("target:", wordToDelete);
      // 讀取 JSON 文件
      const fileContent = await Fs.readAsStringAsync(filePath);
      const vocList = JSON.parse(fileContent);
      console.log(vocList);

      // 過濾掉要刪除的單詞
      const updatedVocList = vocList.filter(
        (voc: vocType) => voc.word !== wordToDelete,
      );

      // 重寫 JSON 文件
      await Fs.writeAsStringAsync(
        filePath,
        JSON.stringify(updatedVocList, null, 2),
      ); //

      console.log(`Deleted ${wordToDelete} from voc.json`);
      Alert.alert("Success", `Deleted ${wordToDelete} from voc.json`);
      setReFetch(!reFetch);
      navigation.goBack();
    } catch (error) {
      console.error("Error reading or writing file: ", error);
      Alert.alert("Error", "An error occurred while deleting the word");
    }
  };

  return (
    <View style={{ width: screenWidth * 0.95, alignItems: "center" }}>
      <Pressable
        onPress={handleDelete}
        style={{
          width: screenWidth * 0.4,
          backgroundColor: Colors.light.tint,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            padding: 12,
            textAlign: "center",
          }}
        >
          Delete
        </Text>
      </Pressable>
    </View>
  );
};

const VocInfo = () => {
  const route = useRoute();
  const { voc, reFetch, setReFetch } = route.params as any;

  useEffect(() => {
    console.log("params: ", voc);
  }, []);

  return (
    <View
      style={{
        minHeight: screenHeight,
        alignItems: "center",
        width: screenWidth,
      }}
    >
      <ScrollView>
        <View
          style={{
            width: screenWidth * 0.95,
            height: screenHeight * 0.3,
            backgroundColor: "white",
            marginVertical: 15,
            borderRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "600", marginVertical: 10 }}>
            {voc.word}
          </Text>

          <Text style={{ fontSize: 24, fontWeight: "400", marginVertical: 10 }}>
            {voc.lexical}.
          </Text>
          <View
            style={{
              width: screenWidth * 0.9,
              marginTop: 30,
              padding: 15,
              borderRadius: 20,
              backgroundColor: "lightgray",
            }}
          >
            <Text style={{ fontSize: 14 }}>{voc.description}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 20 }}>
          Exapmle Sentences
        </Text>
        <View
          style={{
            width: screenWidth * 0.95,
            minHeight: screenHeight * 0.2,
            backgroundColor: "white",
            marginVertical: 15,
            borderRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{voc.example}</Text>
        </View>
        <DeleteButton
          wordToDelete={voc.word}
          reFetch={reFetch}
          setReFetch={setReFetch}
        />
      </ScrollView>
    </View>
  );
};

export default VocInfo;
