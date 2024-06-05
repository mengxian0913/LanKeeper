import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styles from './Styles.ts';

const ListButton = ({ title }) => {
  const handlePress = () => {
    Alert.alert(`You pressed ${title}`);
  };

  return (
    <Card style={styles.card}>
      <Button mode="contained" onPress={handlePress} style={styles.button} labelStyle={styles.buttonLabel}>
        {title}
      </Button>
    </Card>
  );
};

export default ListButton;
