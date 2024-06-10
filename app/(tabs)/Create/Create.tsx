import React, { useState, useEffect, useContext } from "react";
import { Text, SafeAreaView, View, TextInput, Button } from "react-native";
import json from "@constants/data/voc.json";
import * as Fs from "expo-file-system";
import styles from "./Styles";
import { vocType } from "../Home/VocCard/VocCard.js";
import { vocFileName } from "@/constants/fileName";
import { MyContext, myContextType } from "../_layout";
import { useNavigation } from "expo-router";

type Datatype = vocType;
const Create = () => {
  const { setReFetch, reFetch } = useContext(MyContext) as myContextType;
  const navigation = useNavigation();
  const [jsondata, Setjson] = useState<Datatype[]>([]);
  const [temp, Setdata] = useState<Datatype>({
    word: "",
    lexical: "",
    description: "",
    example: "",
    rememberValue: 50,
  });

  const file = Fs.documentDirectory + vocFileName;

  useEffect(() => {
    const Read = async () => {
      const TempforJson = await Fs.readAsStringAsync(file);
      Setjson(JSON.parse(TempforJson));
    };
    Read();
  }, []);

  const SendData = async () => {
    let tempData = jsondata;
    const newData = { ...temp, rememberValue: 50 };
    tempData.push(newData);
    await Fs.writeAsStringAsync(file, JSON.stringify(tempData));
    setReFetch(!reFetch);
    navigation.navigate("home" as never);
  };
  const Header = () => {
    return (
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerText}>Vocbulary Card</Text>
      </SafeAreaView>
    );
  };
  return (
    <View>
      <Header />
      <Text>Name</Text>
      <TextInput
        onChangeText={(text) => Setdata({ ...temp, word: text })}
        value={temp.word}
      />
      <Text>Part of speech</Text>
      <TextInput
        onChangeText={(text) => Setdata({ ...temp, lexical: text })}
        value={temp.lexical}
      />
      <Text>Description</Text>
      <TextInput
        onChangeText={(text) => Setdata({ ...temp, description: text })}
        value={temp.description}
      />
      <Text>Example sentence</Text>
      <TextInput
        onChangeText={(text) => Setdata({ ...temp, example: text })}
        value={temp.example}
      />
      <Button title="Send" onPress={SendData} />
    </View>
  );
};

export default Create;
