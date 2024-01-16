import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IComponentProps {
  from: string;
  to: string;
  swapHandler: () => void;
}
const BoxItem: FC<IComponentProps> = ({from, to, swapHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Text style={styles.headerText}>{from?.toUpperCase()}</Text>
        <Text style={[styles.headerText, {color: '#222', marginTop: 10}]}>
          {to?.toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity onPress={swapHandler}>
        <MaterialIcons name="swap-vert" size={28} color="#828595" />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          left: 150,
        }}>
        <Ionicons name="airplane" style={{color: '#222', fontSize: 20}} />
      </View>
    </View>
  );
};

export default BoxItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 25,
    // shadow
    shadowColor: '#222',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  containerLeft: {},
  headerText: {
    color: '#828595',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
