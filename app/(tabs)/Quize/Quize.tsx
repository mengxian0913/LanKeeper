import React, {useState} from "react";
import { Text, SafeAreaView, View, Button, TouchableOpacity } from "react-native";
import styles from "./Styles.ts";
import { Title } from "react-native-paper";

const Quize = () => {
  const [examRate,SetRate] = useState(1);
  const [examNum,SetNum] = useState(10);
  const [teststatus,SetTest] = useState(false);
  const [voc,Setvoc] = useState("");
  const NextQuestion = () => {
    if(examRate===examNum || examRate>examNum) return ResetRate();
    return SetRate(examRate+1);
  }
  const ResetRate = () => {
    SetRate(1);
    SetTest(!teststatus);
  }
  
  const FiveQuestion = () => {
    SetNum(5);
    SetTest(!teststatus);
  } 
  const TenQuestion = () => {
    SetNum(10);
    SetTest(!teststatus);
  }
  const TwentyQuestion = () => {
    SetNum(20);
    SetTest(!teststatus);
  }

  const Header = () => {
    if(!teststatus) {
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
    return (
      <View>
        <Text style={styles.questionNumSelector} onPress={() => ResetRate()}>InTest</Text>
        <Button title="Next Question" onPress={NextQuestion} />
      </View>
  )}
  const TestHandler = () => {
    if(teststatus) {
      return(<InTest />)
    }
    return (<NotInTest />)
  }
  return(
    <View>
    <Header />
    <TestHandler />
    </View>
  );
};
export default Quize;
