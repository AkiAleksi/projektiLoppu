import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';



interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}



const TalmaGlacierFrontPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Talma,fi&appid=1f1293eff73b8afa4fad6d6c279feaea&units=metric'
      );
      const data = (await response.json()) as WeatherData;
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const weatherIcon = () => {
    if (weather) {
      const icon = weather.weather[0].icon;
      return `https://openweathermap.org/img/w/${icon}.png`;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Talma Glacier</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>Come and enjoy the well-maintained slopes of Talma Glacier and experience the beauty of the surrounding wilderness.</Text>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1557977398-18b39bf47159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2145&q=80' }} style={styles.image} />
        <View style={styles.separator} />
        <Text style={styles.title}>Current Weather Info</Text>
        {weather ? (
          <View style={styles.weatherContainer}>
            <View style={styles.weatherRow}>
              <Text style={styles.infoText}>Temperature: {weather.main?.temp}°C</Text>
              <Image source={{ uri: weatherIcon() }} style={styles.weatherIcon} />
            </View>
            <Text style={styles.weatherInfo}>Description: {weather.weather[0]?.description}</Text>
            <Text style={styles.weatherInfo2}>Wind: {weather.wind?.speed} m/s</Text>
          </View>
        ) : (
          <Text style={styles.infoText}>Loading weather information...</Text>
        )}
        <View style={styles.separator} />
        <Text style={styles.title}>Opening Hours</Text>
        <Text style={styles.infoText}>Mon-Fri 8:00-22:00</Text>
        <Text style={styles.infoText}>Sat-Sun 10:00-20:00</Text>
        <View style={styles.separator} />
        <Text style={styles.title}>Contact us</Text>
        <Text style={styles.infoText}>Boss: Bosse Bossman</Text>
        <Text style={styles.infoText}>email: Bosse@Bossman.com</Text>
        <Text style={styles.infoText}>Phone: 09797565</Text>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'blue',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: 'black',
  },
  infoText: {
    fontSize: 14,
    marginVertical: 4,
    color: 'black',
  },
  weatherInfo: {
    fontSize: 14,
    marginVertical: 4,
    marginBottom: 15,
    marginLeft: -55,
    color: 'black'
  },
  weatherInfo2: {
    fontSize: 14,
    marginVertical: 4,
    marginLeft: -97,
    color: 'black'
  },
  contactInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'blue',
  },
  weatherContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
  },
  weatherText: {
    fontSize: 16,
    marginVertical: 4,
    color: 'red',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 8,
  },
});


export default TalmaGlacierFrontPage;










