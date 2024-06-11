import React, { useMemo, RefObject, useState, useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, Alert, View, Pressable, Text } from "react-native";
import { screenWidth } from "@/constants/Config";
import { vocType } from "../../VocCard/VocCard";
import { vocFileName } from "@/constants/fileName";
import * as Fs from "expo-file-system";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "../../Home";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

interface searchBottomProps {
  bottomSheetRef: RefObject<BottomSheet>;
}

interface contentProps {
  text: string;
  setText: (key: string) => void;
}

const Content = ({ text, setText }: contentProps) => {
  const handleTextChange = (inputText: string) => {
    const newText = inputText.replace(/[^a-zA-Z]/g, "");
    console.log("input...");
    setText(newText.toLowerCase());
  };

  return (
    <View style={{ width: screenWidth, alignItems: "center" }}>
      <TextInput
        style={{
          height: 30,
          width: screenWidth * 0.95,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
        onChangeText={handleTextChange} // 每当文本发生变化时调用的回调函数
        value={text} // 输入框中的值，由 text 状态管理
        placeholder="apple" // 占位符文本
      />
    </View>
  );
};

interface resultProps {
  text: string;
  voc?: vocType[];
}

const Result = ({ text, voc }: resultProps) => {
  const [result, setResult] = useState<vocType[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log(text);
    if (voc) {
      const resultArr = voc.filter((item) => item.word.includes(text));
      setResult(resultArr);
    }
  }, [text]);

  const handleOnClick = (vocItem: vocType) => {
    console.log(vocItem.word);
    navigation.navigate("CardInfo", vocItem);
  };

  return (
    <ScrollView>
      <View style={{ width: screenWidth, alignItems: "center" }}>
        {result.map((item) => (
          <Pressable
            style={{
              width: screenWidth * 0.92,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              paddingBottom: 5,
            }}
            onPress={() => handleOnClick(item)}
          >
            <Text style={{ fontSize: 16 }}>{item.word}</Text>
            <Text style={{ fontSize: 16 }}>{item.lexical}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const SearchBottom = ({ bottomSheetRef }: searchBottomProps) => {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const [text, setText] = useState("");
  const [voc, setVoc] = useState<vocType[]>();
  const file = Fs.documentDirectory + vocFileName;

  const getVocCards = async () => {
    const currentVoc = await Fs.readAsStringAsync(file);
    // console.log(currentVoc);
    const currentVocJson = JSON.parse(currentVoc);
    setVoc(currentVocJson);
  };

  useEffect(() => {
    getVocCards();
  }, []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      ref={bottomSheetRef}
    >
      <PanGestureHandler>
        <>
          <Content text={text} setText={setText} />
          <Result text={text} voc={voc} />
        </>
      </PanGestureHandler>
    </BottomSheet>
  );
};

export default SearchBottom;
