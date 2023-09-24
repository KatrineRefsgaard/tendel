import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarScreen() {
  return (

    <View style={styles}>
      <Calendar style={{
        borderWidth: 30,
        borderColor: 'white',
        height: 250
      }}
      // Customize the appearance and behavior of the calendar as needed
      // For example, you can set properties like initialMonth, markingType, etc.
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