import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import * as Fs from "expo-file-system";
import styles from "./Styles.ts";
import { vocFileName } from "@/constants/fileName.ts";
import { MyContext, myContextType } from "../_layout";
import { vocType } from "../Home/VocCard/VocCard.js";
import { screenWidth } from "@/constants/Config.ts";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Quize = () => {
  type Datatype = vocType;
  type wrong = { choosen: string; correct: string; description: string };
  const [examRate, SetRate] = useState(1);
  const [examNum, SetNum] = useState(10);
  const [correct, Setcorrect] = useState(0);
  const [teststatus, SetTest] = useState(0);
  const [jsondata, Setjson] = useState<Datatype[]>([]);
  const [amountOfVoc, setAmountOfVoc] = useState<number>(0);
  const [record, Setrecord] = useState<wrong[]>([]);
  const [wrongVoc, Setwrong] = useState<wrong>();
  const { reFetch } = useContext(MyContext) as myContextType;

  const file = Fs.documentDirectory + vocFileName;

  useEffect(() => {
    const Read = async () => {
      const TempforJson = await Fs.readAsStringAsync(file);
      Setjson(JSON.parse(TempforJson));
      const temp = (await JSON.parse(TempforJson)) as Datatype[];
      setAmountOfVoc(temp.length);
    };
    Read();
  }, [reFetch]);

  const HandlerememberValue = async (key: number, ans: boolean) => {
    let newData: Datatype[] = jsondata;
    console.log(jsondata[key].rememberValue);
    if (ans) newData[key].rememberValue = newData[key].rememberValue - 15;
    else newData[key].rememberValue = newData[key].rememberValue + 20;
    if (newData[key].rememberValue < 0) newData[key].rememberValue = 0;
    if (newData[key].rememberValue > 100) newData[key].rememberValue = 100;
    await Fs.writeAsStringAsync(file, JSON.stringify(newData));
    Setjson(newData);
    console.log(jsondata[key].rememberValue);
  };
  const NextQuestion = (
    title: string,
    ans: string,
    key: number,
    anskey: number,
  ) => {
    console.log();
    if (title == ans) {
      HandlerememberValue(key, true);
      Setcorrect(correct + 1);
    } else {
      HandlewrongAns(key, anskey);
    }
    if (examRate === examNum || examRate > examNum) SetTest(2);
    return SetRate(examRate + 1);
  };
  const HandlewrongAns = (key: number, anskey: number) => {
    HandlerememberValue(key, false);
    let tempRecord: wrong[] = record;
    const newData = {
      ...wrongVoc,
      choosen: jsondata[key].word,
      correct: jsondata[anskey].word,
      description: jsondata[anskey].description,
    };
    tempRecord.push(newData);
    console.log(tempRecord);
    Setrecord(tempRecord);
  };

  const HandleWeights = (NumArray) => {
    var totalweights = 0;
    var reNum: number;
    jsondata.map((item) => {
      totalweights += item.rememberValue;
    });
    const randonNum = Math.random() * totalweights;
    let countWeights = 0;

    for (var i: number = 0; i < amountOfVoc; i++) {
      countWeights += jsondata[i].rememberValue;
      if (
        randonNum < countWeights &&
        i != NumArray[0].num &&
        i != NumArray[1].num &&
        i != NumArray[2].num &&
        i != NumArray[3].num &&
        jsondata[i].word != jsondata[0].word &&
        jsondata[i].word != jsondata[1].word &&
        jsondata[i].word != jsondata[2].word &&
        jsondata[i].word != jsondata[3].word 
      ) {
        reNum = i;
        return reNum;
      }
    }
  };
  const ResetRate = () => {
    Setcorrect(0);
    SetRate(1);
    SetTest(0);
    Setrecord([]);
  };

  const FiveQuestion = () => {
    SetNum(5);
    SetTest(1);
  };
  const TenQuestion = () => {
    SetNum(10);
    SetTest(1);
  };
  const TwentyQuestion = () => {
    SetNum(20);
    SetTest(1);
  };

  const Header = () => {
    if (teststatus != 1) {
      return (
        <SafeAreaView style={styles.headerContainer}>
          <Text style={styles.headerText}>Quiz</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Quiz({examRate}/{examNum})
        </Text>
      </SafeAreaView>
    );
  };
  const TestResult = () => {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View
          style={{
            marginVertical: 15,
            width: screenWidth,
            paddingHorizontal: 18,
            paddingVertical: 20,
          }}
        >
          <View style={styles.questionNumSelector}>
            <Text style={{ fontSize: 24, fontWeight: "500" }}>
              {correct}/{examNum}
            </Text>
          </View>
          <View
            style={{
              width: screenWidth * 0.95,
              alignItems: "center",
              marginHorizontal: -9,
            }}
          >
            <Pressable
              onPress={ResetRate}
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
                Comfirm
              </Text>
            </Pressable>
          </View>
          {record.map((item) => (
            <View style={styles.questionNumSelector}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                choose: {item.choosen}
              </Text>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                correct: {item.correct}
              </Text>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                description: {item.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  const NotInTest = () => {
    return (
      <View
        style={{
          marginVertical: 15,
          width: screenWidth,
          paddingHorizontal: 18,
          paddingVertical: 20,
        }}
      >
        <View style={styles.questionNumSelector}>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 24, fontWeight: "500" }}
              onPress={FiveQuestion}
            >
              Five Questions
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questionNumSelector}>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 24, fontWeight: "500" }}
              onPress={TenQuestion}
            >
              Ten Questions
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questionNumSelector}>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 24, fontWeight: "500" }}
              onPress={TwentyQuestion}
            >
              Twenty Questions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderItem = ({ AnswerNum, item }) => {
    console.log(`item:`,item);
    return (
      <Text
        style={{ fontSize: 24, fontWeight: "500" }}
        onPress={() =>
          NextQuestion(
            jsondata[AnswerNum].word,
            jsondata[item.num].word,
            item.num,
            AnswerNum,
          )
        }
      >
        {jsondata[item.num].word}
      </Text>
    );
  };
  const InTest = () => {
    var NumArray = [
      { id: 1, num: 0 },
      { id: 2, num: 0 },
      { id: 3, num: 0 },
      { id: 4, num: 0 },
    ];
    var CorrectAnswer = Math.floor(Math.random() * 3 + 1);
    var AnswerNum;
    NumArray.map((question) => {
      const num = HandleWeights(NumArray);
      if (question.id == CorrectAnswer) AnswerNum = num;
      question.num = num;
    });
    return (
      <View
        style={{
          marginVertical: 15,
          width: screenWidth,
          paddingHorizontal: 18,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            width: screenWidth * 0.95,
            alignItems: "center",
            marginHorizontal: -9,
          }}
        >
          <Pressable
            onPress={ResetRate}
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
              Escape
            </Text>
          </Pressable>
        </View>
        <View style={styles.questionNumSelector}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{jsondata[AnswerNum].lexical}</Text>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            {jsondata[AnswerNum].description}
          </Text>
        </View>
        {NumArray.map((item) => (
          <View style={styles.questionNumSelector}>
            <RenderItem AnswerNum={AnswerNum} item={item} />
          </View>
        ))}
      </View>
    );
  };
  const TestHandler = () => {
    if (teststatus === 1) {
      return <InTest />;
    }
    if (teststatus === 0) {
      return <NotInTest />;
    }
    return <TestResult />;
  };
  return (
    <View>
      <Header />
      <TestHandler />
    </View>
  );
};
export default Quize;
