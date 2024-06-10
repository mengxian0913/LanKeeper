import React, { useState, useEffect, useContext } from "react";
import { Text, SafeAreaView, View, TextInput, Button } from "react-native";
import * as Fs from "expo-file-system";
import { vocType } from "../Home/VocCard/VocCard.js";
import { vocFileName } from "@/constants/fileName";
import { MyContext, myContextType } from "../_layout";
import { useNavigation } from "expo-router";
import styles from "./Styles";

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
    rememberValue: 0,
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
    let newList:Datatype[] = [];
    const newData = { ...temp,};
    newList.push(newData); 
    newList = newList.concat(tempData);
    //console.log(newList);
    await Fs.writeAsStringAsync(file, JSON.stringify(newList));
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

  const HandleInput = (text:string) => {
    const newText = text.replace(/[^a-zA-Z]/g, "");
    //console.log(text);
    //Setdata({...temp,word:newText});
    return newText;
  }
  return (
    <View>
      <Header />
      <Text style={styles.flattext}>Name</Text>
      <TextInput        
        style={styles.textinput}
        onChangeText={(text)=>Setdata({...temp, word:HandleInput(text)})}
        value={temp.word}
      />
      <Text style={styles.flattext}>Part of speech</Text>
      <TextInput        
        style={styles.textinput}
        onChangeText={(text) => Setdata({ ...temp, lexical:HandleInput(text) })}
        value={temp.lexical}
      />
      <Text style={styles.flattext}>Description</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={(text) => Setdata({ ...temp, description:HandleInput(text)})}
        value={temp.description}
      />
      <Text style={styles.flattext}>Example sentence</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={(text) => Setdata({ ...temp, example: HandleInput(text )})}
        value={temp.example}
      />
      <Button title="Send" onPress={SendData} />
    </View>
  );
};

export default Create;
