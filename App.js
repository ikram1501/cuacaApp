import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from './components/constant';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import WeatherSearch from './components/weatherSearch';
import WeatherInfo from './components/weatherInfo';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('');

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      case 'success':
        return <WeatherInfo weatherData={weatherData} />;
      case 'error':
        return (
          <View style={styles.centered}>
            <Image style={styles.errorIcon}
              source={require('./components/cross.jpg')} 
            />
            <Text style={styles.errorText}>
              Something went wrong. Please try again with a correct city name.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const searchWeather = (location) => {
    setStatus('loading');
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // Convert Kelvin to Celsius
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.content}>{renderComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    width: 100, 
    height: 100, 
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
