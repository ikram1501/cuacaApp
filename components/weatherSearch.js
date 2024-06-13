import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const WeatherSearch = ({ searchWeather }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location.trim() !== '') {
      searchWeather(location);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default WeatherSearch;
