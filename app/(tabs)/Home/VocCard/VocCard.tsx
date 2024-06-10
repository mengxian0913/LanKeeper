import { screenHeight, screenWidth } from "@/constants/Config";
import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";

export type vocType = {
  word: string;
  lexical: string;
  description: string;
  example: string;
  rememberValue: number;
};

interface vocProps {
  voc: vocType;
}

const VocCard = ({ voc }: vocProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOnClick = () => {
    console.log(voc.word);
    console.log("Go to Detail Component");
    navigation.navigate("CardInfo", voc);
  };

  return (
    <Pressable onPress={handleOnClick}>
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
        <Text style={{ fontSize: 24, fontWeight: "500", marginVertical: 10 }}>
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
    </Pressable>
  );
};

export default VocCard;
