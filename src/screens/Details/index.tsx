import React, {type FC, memo} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

const Details: FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#FB7200" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Details</Text>
        </View>
        <Text>This is Details screen!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FB7200',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default memo(Details);
