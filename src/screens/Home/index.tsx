import React, {memo, type FC, useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../components/Colors';
import BackgroundCurve from '../../components/BackgroundCurve';
import CardList from './CardList';
import {useNavigation} from '@react-navigation/native';
import {getFlightsData} from '../../api/Api';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {updateFlightsData} from '../../store/feature/flightsSlice';
import {RootState} from '../../store/store';

const Home: FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const {fromLocationdata, toLocationdata} = useSelector(
    (state: RootState) => state.flights,
  );

  const [tabIndex, setTabIndex] = useState(0);
  // for location dropdown
  const [currentLocation, setCurrentLocation] = useState(fromLocationdata[0]);
  const [toLocation, setToLocation] = useState(toLocationdata[0]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const tabHandler = (tab: number) => {
    setTabIndex(tab);
  };

  const searchHandler = () => {
    if (
      currentLocation.label.toLocaleLowerCase() ===
      toLocation.label.toLocaleLowerCase()
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Hey, selected destination is same as origin',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
      );
      return;
    }

    navigation.navigate('Watchlist', {
      from: currentLocation.label,
      to: toLocation.label,
    });
  };

  const flightDataHandler = useCallback(async () => {
    try {
      const res = await getFlightsData();
      if (res?.data.message === 'Success') {
        dispatch(updateFlightsData(res.data?.data?.result));
      } else {
        console.warn(res?.data.message, 'res');
      }
    } catch (error) {
      console.log(error, 'error of get flights data');
    }
  }, [dispatch]);

  useEffect(() => {
    flightDataHandler();
  }, [flightDataHandler]);

  return (
    <SafeAreaView style={[backgroundStyle, styles.scrollView]}>
      <StatusBar backgroundColor="#FB7200" barStyle="light-content" />
      <View style={styles.container}>
        <BackgroundCurve style={styles.svg} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <View style={styles.headerGroupIndicator}>
              <View style={styles.headerGroupIndicatorLeft}>
                <View style={{flex: 1}}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={fromLocationdata}
                    value={currentLocation}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select location"
                    searchPlaceholder="Search location..."
                    renderRightIcon={() => (
                      <View style={{marginRight: 5}}>
                        <Feather name="chevron-down" color="#fff" size={16} />
                      </View>
                    )}
                    renderLeftIcon={() => (
                      <View style={{marginRight: 5}}>
                        <Feather name="map-pin" color="#fff" size={16} />
                      </View>
                    )}
                    onChange={item => {
                      setCurrentLocation(item);
                    }}
                  />
                </View>
              </View>
              <View style={styles.headerGroupIndicatorRight}>
                <Feather name="settings" color="#fff" size={16} />
              </View>
            </View>

            <Text style={styles.heading}>
              {'Where would \nyou want to go?'}
            </Text>
            <View style={styles.groupInputContainer}>
              <View style={styles.inputSearchContainer}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Dropdown
                    style={styles.toDropDown}
                    placeholderStyle={styles.toTextStyle}
                    selectedTextStyle={styles.toTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={toLocationdata}
                    value={toLocation}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select location"
                    searchPlaceholder="Search location..."
                    renderRightIcon={() => (
                      <View style={{marginRight: 5}}>
                        <Feather name="chevron-down" color="#000" size={16} />
                      </View>
                    )}
                    renderLeftIcon={() => (
                      <View style={{marginRight: 10}}>
                        <Text style={{color: 'gray', fontSize: 10}}>TO</Text>
                      </View>
                    )}
                    onChange={item => {
                      setToLocation(item);
                    }}
                    containerStyle={{
                      backgroundColor: '#fff',
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonSearch}
                  onPress={searchHandler}>
                  <Feather name="search" color="gray" size={16} />
                </TouchableOpacity>
              </View>
              <View style={styles.listBtn}>
                <TouchableOpacity
                  onPress={() => tabHandler(0)}
                  style={[styles.button, tabIndex == 1 && styles.transparent]}>
                  <Ionicons name="airplane" color="#fff" size={16} />
                  <Text style={styles.buttonText}>Flights</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => tabHandler(1)}
                  style={[styles.button, tabIndex === 0 && styles.transparent]}>
                  <FontAwesome name="hotel" color="#fff" size={16} />
                  <Text style={styles.buttonText}>Hotels</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <CardList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    marginTop: 12,
    padding: 12,
  },
  headerGroupIndicator: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroupIndicatorLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headerGroupIndicatorRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerGroupIndicatorText: {
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
  },
  groupInputContainer: {
    marginTop: 20,
    padding: 10,
  },
  inputSearchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
  },
  inputSearch: {
    padding: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  buttonSearch: {
    shadowColor: '#222',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 30,
    aspectRatio: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#F88C43',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '500',
    color: '#fff',
    marginLeft: 10,
  },
  listBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  //drop down style
  dropdown: {
    width: 150,
    height: 40,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  toDropDown: {
    flex: 1,
    paddingHorizontal: 10,
  },
  toTextStyle: {
    color: '#000',
    fontSize: 16,
  },
});

export default memo(Home);
