import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const StoreScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getLocation();
  }, []);

  const handleDirectionPress = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

    try {
      Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const handleGoToCurrentLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleMarkerPress = (latitude, longitude, delta = 0.01) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find a Store</Text>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 10.7950,
            longitude: 106.7218,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marker cho vị trí người dùng */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />

          {/* Marker cho Target Location */}
          <Marker
            coordinate={{
              latitude: 10.870198532393648,
              longitude: 106.80310774583567,
            }}
            title="Target Location"
            description="This is your target address"
            onPress={() => handleMarkerPress(10.870198532393648, 106.80310774583567)}
          >
            <Callout style={styles.calloutContainer}>
              <View>
                <Text style={styles.calloutText}>Vối Coffee - Truong Dai Hoc Cong Nghe Thong Tin</Text>
                <Text style={styles.calloutText}>Linh Trung - Thu Duc City</Text>
                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={() => handleDirectionPress(10.870198532393648, 106.80310774583567)}
                >
                  <Text style={styles.directionButtonText}>Directions</Text>
                </TouchableOpacity>
              </View>\
            </Callout>
          </Marker>

          {/* Marker cho Vối Coffee */}
          <Marker
            coordinate={{
              latitude: 10.6961,
              longitude: 106.5935,
            }}
            title="Vối Coffee"
            description="55A Nguyễn Hữu Trí, Bình Chánh"
            onPress={() => handleMarkerPress(10.6961, 106.5935)}
          >
            <Callout style={styles.calloutContainer}>
              <View>
                <Text style={styles.calloutText}>Vối Coffee</Text>
                <Text style={styles.calloutText}>55A Nguyen Huu Tri, Binh Chanh District</Text>
                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={() => handleDirectionPress(10.6961, 106.5935)}
                >
                  <Text style={styles.directionButtonText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>

          {/* Marker cho Vối Coffee - Mộc */}
          <Marker
            coordinate={{
              latitude: 10.8725,
              longitude: 106.6751,
            }}
            title="Vối Coffee - Mộc"
            description="404 Tô Ngọc Vân, Q12"
            onPress={() => handleMarkerPress(10.8725, 106.6751)}
          >
            <Callout style={styles.calloutContainer}>
              <View>
                <Text style={styles.calloutText}>Vối Coffee - Mộc</Text>
                <Text style={styles.calloutText}>404 To Ngoc Van, 12 District</Text>
                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={() => handleDirectionPress(10.8725, 106.6751)}
                >
                  <Text style={styles.directionButtonText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>

          {/* Marker cho Vối - The Love Coffee */}
          <Marker
            coordinate={{
              latitude: 10.7808,
              longitude: 106.6285,
            }}
            title="Vối - The Love Coffee"
            description="56 Hiền Vương, Tân Phú"
            onPress={() => handleMarkerPress(10.7808, 106.6285, 0.02)}
          >
            <Callout style={styles.calloutContainer}>
              <View>
                <Text style={styles.calloutText}>Vối - The Love Coffee</Text>
                <Text style={styles.calloutText}>56 Hien Vuong, Tan Phu District</Text>
                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={() => handleDirectionPress(10.7808, 106.6285)}
                >
                  <Text style={styles.directionButtonText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        </MapView>
      ) : (
        <Text>Loading location...</Text>
      )}
      {errorMsg && <Text>Error: {errorMsg}</Text>}

      {/* Nút quay trở lại vị trí hiện tại */}
      <TouchableOpacity
        style={styles.backToLocationButton}
        onPress={handleGoToCurrentLocation}
      >
        <Image
          source={require('./../assets/location.png')}
          style={styles.location}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: '95%',
  },
  directionButton: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
  },
  directionButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  backToLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  location: {
    width: 20,
    height: 20,
  },
  calloutContainer: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    marginLeft: -160,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutText: {
    marginBottom: 5,
    alignItems: 'center',
  },
});

export default StoreScreen;
