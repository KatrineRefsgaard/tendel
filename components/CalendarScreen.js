import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarScreen() {
  return (
//Opretter en view container og laver styles til kalenderen 
    <View style={styles}>
      <Calendar style={{
        borderWidth: 30,
        borderColor: 'white',
        height: 250
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default CalendarScreen;