import React from "react";
import { View, FlatList, Text} from "react-native";
import styles from "./Styles";

const data=[
{id: 1,selection:"Account"},
{id: 2,selection:"Display"},
{id: 3,selection:"Notification"},
{id: 4,selection:"AboutUs"}]

const HomeScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => (
          <Text style={styles.flattext} onPress={() => navigation.push(item.selection)}>{item.selection}</Text>
          )}
          style={styles.flatlist}
          keyExtractor={(item) => item.id}
        />
      </View>
  );
};
export default HomeScreen;
