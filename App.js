import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Realm from 'realm';
import { DBContext } from './context';

const FeelingSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string',
  },
  primaryKey: '_id',
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  useEffect(() => {
    const startLoading = async () => {
      const connection = await Realm.open({
        path: 'nomadDiaryDB',
        schema: [FeelingSchema],
      });
      setRealm(connection);
    };
    startLoading();
  }, []);

  return (
    <DBContext.Provider value={realm}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style='auto' />
      </View>
    </DBContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
