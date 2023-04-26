import React from 'react';
import { StyleSheet, View, Text, useColorScheme, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ContactInfoScreen() {
  const colorScheme = useColorScheme();

  const separatorStyles = {
    backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : '#eee',
  };

  const handleMarkerPress = () => {
    const url = 'https://www.google.com/maps/place/Talma+Ski+Oy/@60.397455,25.1726879,16.2z/data=!4m6!3m5!1s0x469200525d297e93:0x58116e77c49f27e6!8m2!3d60.3976939!4d25.1758039!16s%2Fg%2F1v_slxjd';
    Linking.openURL(url);
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 60.397455,
        longitude: 25.1726879,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }}
    >
      <Marker
        coordinate={{
          latitude: 60.397455,
          longitude: 25.1726879,
        }}
        title='Talma Ski Oy'
        onPress={handleMarkerPress}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});







