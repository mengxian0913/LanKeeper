import React from "react";
import { Text, FlatList, StyleSheet, View  } from "react-native";
import ListButton from "./Components/ListButton/";
import styles from './Styles.ts';

const data=[
{id:"1",selection:"Account",},
{id:"2",selection:"Display"},
{id:"3",selection:"Noification"},
{id:"4",selection:"About us"}];

const Setting = () => {

  const renderItem = ({ item }) => (
    <ListButton title={item.selection} />
  );

  return (
  <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
  </>
  );
};


export default Setting;
