import React, {type FC, memo, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BoxItem from './BoxItem';
import SearchList from './SearchList';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackgroundCurve from '../../components/BackgroundCurve';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {IFlightsData} from '../../store/feature/flightsSlice';

const Search: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {flightsData} = useSelector((state: RootState) => state.flights);

  const [fromLocation, setFromLocation] = useState(
    route.params?.from || 'dehli',
  );
  const [toLocation, setToLocation] = useState(route.params?.to || 'mumbai');
  const [filterdFlightData, setFilterFlightdData] = useState<IFlightsData[]>(
    [],
  );
  const [isLoadign, setIsLoadign] = useState(true);

  const filterdDataHandler = (
    flyData: IFlightsData[],
    frmLocation: string,
    destination: string,
  ) => {
    try {
      setIsLoadign(true);
      let filterdArr: IFlightsData[] = flyData.filter(flight => {
        return (
          flight.displayData.source.airport.cityName.toLowerCase() ===
            frmLocation.toLocaleLowerCase() &&
          flight.displayData.destination.airport.cityName.toLowerCase() ===
            destination.toLocaleLowerCase()
        );
      });
      setFilterFlightdData([...filterdArr]);
      setTimeout(() => {
        setIsLoadign(false);
      }, 300);
    } catch (error) {
      setIsLoadign(false);
      console.log(error, 'error on filterd data');
    }
  };

  useEffect(() => {
    setToLocation(route.params?.to);
    setFromLocation(route.params?.from);
  }, [route.params]);

  useEffect(() => {
    filterdDataHandler(flightsData, fromLocation, toLocation);
  }, [flightsData, fromLocation, toLocation]);
  const swapLocationHandler = () => {
    setToLocation(fromLocation);
    setFromLocation(toLocation);
  };

  return (
    <View style={styles.container}>
      <BackgroundCurve style={styles.svg} />
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search Result</Text>
        </View>
        <BoxItem
          from={fromLocation}
          to={toLocation}
          swapHandler={swapLocationHandler}
        />
        {isLoadign ? (
          <View>
            <Text style={styles.loadingText}>....loading</Text>
          </View>
        ) : (
          <SearchList data={filterdFlightData} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: -170,
  },
  bodyContainer: {
    marginTop: 12,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginEnd: 30,
  },
  loadingText: {
    alignSelf: 'center',
    color: '#000',
    marginTop: 100,
    fontSize: 18,
  },
});

export default memo(Search);
