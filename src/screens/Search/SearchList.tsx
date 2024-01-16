import React, {type FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {IFlightsData} from '../../store/feature/flightsSlice';

interface ISearchListProp {
  item: IFlightsData;
}

interface IComponentProps {
  data: IFlightsData[];
}

const ItemView: FC<ISearchListProp> = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemPrice}>
        {item.fare}{' '}
        <Text style={styles.itemPriceOri}> ({item.fare * 1.5})</Text>
      </Text>
      <View style={styles.itemFooter}>
        <View>
          <Text style={styles.itemText}>
            {moment(item.displayData.source.depTime).format('hh:mm a')}
          </Text>
          <Text style={styles.itemPlaceText}>
            {item.displayData.source.airport.cityName} ({' '}
            {item.displayData.source.airport.cityCode})
          </Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>
            {item.displayData.totalDuration}
          </Text>
          <Text style={[styles.itemPlaceText]}>
            {item.displayData.stopInfo}
          </Text>
        </View>

        <View>
          <Text style={[styles.itemText]}>
            {moment(item.displayData.destination.arrTime).format('hh:mm a')}
          </Text>
          <Text style={styles.itemPlaceText}>
            {item.displayData.destination.airport.cityName}({' '}
            {item.displayData.destination.airport.cityCode})
          </Text>
        </View>
      </View>
      <View style={[styles.itemFooter, {marginTop: 10}]}>
        <Text style={styles.itemText}>
          <Ionicons name="calendar" style={styles.icon} />
          {'  '}
          {moment(item.displayData.source.depTime).format('MMM Do YY')}
          {/* ;{item.displayData.source.depTime} */}
        </Text>
        <Text style={styles.itemText}>
          <Ionicons name="airplane" style={styles.icon} />
          {'  '}
          {item.displayData.airlines[0].airlineName}
        </Text>

        <Text style={styles.itemText}>
          <Ionicons name="star" style={styles.icon} /> {'  '}
          {/* {item.rating} */}
          4.6
        </Text>
      </View>

      <Text style={styles.saleoff}>{50}%</Text>
    </View>
  );
};

const SearchList: FC<IComponentProps> = ({data}) => {
  if (data.length <= 0) {
    return (
      <View>
        <Text style={styles.notFountText}>No flights found on this route</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Best Deals for Next 6 Months</Text>
      </View>
      <View style={styles.containerBody}>
        {data.map((item: IFlightsData, index: number) => {
          return <ItemView key={index.toString()} item={item} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5F646A',
  },
  itemText: {
    color: '#24333A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPlaceText: {
    color: 'gray',
    fontSize: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemContainer: {
    borderWidth: 1.5,
    borderColor: '#EFEFF0',
    marginBottom: 12,
    padding: 20,
    borderRadius: 12,
  },
  itemPrice: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#0D1820',
    marginBottom: 10,
  },
  itemPriceOri: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#828595',
    textDecorationLine: 'line-through',
  },
  containerBody: {
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  saleoff: {
    position: 'absolute',
    backgroundColor: '#FFF0E8',
    color: '#FF702A',
    fontWeight: 'bold',
    padding: 6,
    borderRadius: 10,
    paddingHorizontal: 10,
    right: -10,
    top: 10,
  },
  durationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: {
    color: 'gray',
    borderBottomColor: '#FB7200',
    borderBottomWidth: 0.8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  notFountText: {
    fontSize: 18,
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
});

export default memo(SearchList);
