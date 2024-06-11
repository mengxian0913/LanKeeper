import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
} from "react-native";
import * as Fs from "expo-file-system";
import SelectDropdown from "react-native-select-dropdown";
import { vocType } from "../Home/VocCard/VocCard.js";
import { vocFileName } from "@/constants/fileName";
import { MyContext, myContextType } from "../_layout";
import { useNavigation } from "expo-router";
import styles from "./Styles";
import { screenWidth } from "@/constants/Config";
import Colors from "@/constants/Colors";

type Datatype = vocType;
const Create = () => {
  const posList = [
    "noun",
    "pronoun",
    "verb",
    "adjective",
    "adverb",
    "preposition",
    "conjunction",
    "interjection",
  ];
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

  const LexicalList = () => {
    return (
      <SelectDropdown
        data={posList}
        onSelect={(selectedItem, index) => {
          Setdata({ ...temp, lexical: selectedItem });
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || temp.lexical}
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
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    );
  };
  useEffect(() => {
    const Read = async () => {
      const TempforJson = await Fs.readAsStringAsync(file);
      Setjson(JSON.parse(TempforJson));
    };
    Read();
  }, []);

  const wordCheck = () => {
    var count=0;
    jsondata.map(item=>{
      if(item.word==temp.word&&item.lexical===temp.lexical) count++;      
    })
    if(count==0) SendData();
    else{Alert.alert("word repetition")}
  }

  const SendData = async () => {
    let tempData = jsondata;
    let newList: Datatype[] = [];
    const newData = { ...temp };
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

  const HandleInput = (text: string) => {
    const newText = text.replace(/[^a-zA-Z]/g, "");
    //console.log(text);
    //Setdata({...temp,word:newText});
    return newText.toLowerCase();
  };
  return (
    <View>
      <Header />
      <View
        style={{
          marginVertical: 15,
          width: screenWidth,
          paddingHorizontal: 18,
          paddingVertical: 20,
        }}
      >
        <View style={styles.textfield}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Name</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => 
              Setdata({ ...temp, word: HandleInput(text) })
            }
            value={temp.word}
          />
        </View>
        <View style={styles.textfield}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            Part of speech
          </Text>
          <LexicalList />
        </View>
        <View style={styles.textfield}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Description</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) =>
              Setdata({ ...temp, description: HandleInput(text) })
            }
            value={temp.description}
          />
        </View>
        <View style={styles.textfield}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            Example sentence
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) =>
              Setdata({ ...temp, example: HandleInput(text) })
            }
            value={temp.example}
          />
        </View>
      </View>
      <View
        style={{
          width: screenWidth * 0.95,
          alignItems: "center",
          marginVertical: -18,
        }}
      >
        <Pressable
          onPress={wordCheck}
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
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Create;
