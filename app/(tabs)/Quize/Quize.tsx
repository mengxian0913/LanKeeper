import React, {useState,useEffect} from "react";
import { Text, SafeAreaView, View, Button, TouchableOpacity } from "react-native";
import VocJson from "@/constants/data/voc.json";
import * as Fs from 'expo-file-system';
import styles from "./Styles.ts";
import { vocFileName } from "@/constants/fileName.ts";

const Quize = () => {
  type Datatype = typeof VocJson[0];
  const [examRate,SetRate] = useState(1);
  const [examNum,SetNum] = useState(10);
  const [correct,Setcorrect] = useState(0);
  const [teststatus,SetTest] = useState(0);
  const [jsondata,Setjson] = useState<Datatype[]>([]);

  const file = Fs.documentDirectory+vocFileName;

  useEffect(() => {
    const Read = async () => {
      const TempforJson = await Fs.readAsStringAsync(file);
      Setjson(JSON.parse(TempforJson));
      }
    Read();
  },[]);

  const HandlerememberValue = async(key:number,ans:boolean) => {
    let newData:Datatype[] = jsondata;
    console.log(jsondata[key].rememberValue);
    if(ans)newData[key].rememberValue=newData[key].rememberValue+15;
    else newData[key].rememberValue=newData[key].rememberValue-20;
    if(newData[key].rememberValue<0)newData[key].rememberValue=0;
    if(newData[key].rememberValue>100) newData[key].rememberValue=100;
    await Fs.writeAsStringAsync(file,JSON.stringify(newData));
    Setjson(newData);
    console.log(jsondata[key].rememberValue);
  }
  const NextQuestion = (title:string,ans:string,key:number) => {
    console.log();
    if(title==ans) {
    HandlerememberValue(key,true)
    Setcorrect(correct+1)
    } 
    else{HandlerememberValue(key,false)}
    if(examRate===examNum || examRate>examNum) SetTest(2);
    return SetRate(examRate+1);
  }
  const ResetRate = () => {
    Setcorrect(0);
    SetRate(1);
    SetTest(0);
  }
  
  const FiveQuestion = () => {
    SetNum(5);
    SetTest(1);
  } 
  const TenQuestion = () => {
    SetNum(10);
    SetTest(1);
  }
  const TwentyQuestion = () => {
    SetNum(20);
    SetTest(1);
  }

  const Header = () => {
    if(teststatus!=1) {
    return(
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerText}>Quiz</Text>
      </SafeAreaView>
    )}
    return (
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerText}>Quiz({examRate}/{examNum})</Text>
      </SafeAreaView>
    );
  };
  const TestResult = () => {
    return(
      <View>
      <Text style={styles.questionNumSelector}>{correct}/{examNum}</Text>
      <Text style={styles.questionNumSelector} onPress={()=>ResetRate()}>Comfirm</Text>
      </View>
    ) 
  }
  const NotInTest = () => {
    return(
      <View>
      <TouchableOpacity>
      <Text style={styles.questionNumSelector} onPress={FiveQuestion}>Five Questions</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.questionNumSelector} onPress={TenQuestion}>Ten Questions</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.questionNumSelector} onPress={TwentyQuestion}>Twenty Questions</Text>
      </TouchableOpacity>
      </View>)
  }
  const InTest = () => {
    var NumArray = [{id:1,num:0},{id:2,num:0},{id:3,num:0},{id:4,num:0}];
    const CorrectAnswer = Math.floor(Math.random()*4+1);
    var AnswerNum:number;
    NumArray.forEach(question => {
      const num = Math.floor(Math.random()*47);
      if(question.id==CorrectAnswer) AnswerNum = num;
      question.num = num;
    })
    return (
      <View>
        <Button title="Escape" onPress={ResetRate} />
        <Text style={styles.questionNumSelector}>{jsondata[AnswerNum].description}</Text>
        <Text style={styles.questionNumSelector} onPress={() => NextQuestion(jsondata[AnswerNum].word,jsondata[NumArray[0].num].word,NumArray[0].num)}>{jsondata[NumArray[0].num].word}</Text>
        <Text style={styles.questionNumSelector} onPress={() => NextQuestion(jsondata[AnswerNum].word,jsondata[NumArray[1].num].word,NumArray[1].num)}>{jsondata[NumArray[1].num].word}</Text>
        <Text style={styles.questionNumSelector} onPress={() => NextQuestion(jsondata[AnswerNum].word,jsondata[NumArray[2].num].word,NumArray[2].num)}>{jsondata[NumArray[2].num].word}</Text>
        <Text style={styles.questionNumSelector} onPress={() => NextQuestion(jsondata[AnswerNum].word,jsondata[NumArray[3].num].word,NumArray[3].num)}>{jsondata[NumArray[3].num].word}</Text>
      </View>
  )}
  const TestHandler = () => {
    if(teststatus===1) {
      return(<InTest />)
    }
    if(teststatus===0){
    return (<NotInTest />)
    }
    return (<TestResult />)
  }
  return(
    <View>
    <Header />
    <TestHandler />
    </View>
  );
};
export default Quize;
