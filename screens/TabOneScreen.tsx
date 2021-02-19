import * as React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const OPERATORS = ['+', '-', '*', '/']

export default function TabOneScreen() {
  const [numberStrs, setNumberStrs] = React.useState<string[]>([])
  const handleAddNumberStrs = React.useCallback((numOrOprator: string | number) => () => {
    setNumberStrs(s => [...s, String(numOrOprator)])
  }, [])
  const handleGetAnswer = React.useCallback(() => {
    const answer = eval(numberStrs.join(''))
    setNumberStrs([answer])
  }, [numberStrs])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <View style={{
        minWidth: '50%',
        minHeight: 60,
        padding: 10,
        backgroundColor: '#ddd',
      }}>
        <Text style={{
          fontSize: 50,
          textAlign: 'right',
        }}>
          {numberStrs.length === 0 ? 0 : numberStrs.join('')}
        </Text>
      </View>
      <View style={styles.wrapper}>
        {[...Array(9).keys()].map(n => n + 1).map(n => (
          <Button key={n} title={String(n)} onPress={handleAddNumberStrs(n)} />
        ))}
      </View>
      <View style={{
          width: '100%',
          height: 2,
          marginVertical: 8,
          backgroundColor: '#ddd',
        }} />
      <View style={styles.wrapper}>
        {OPERATORS.map(op => (
          <Button key={op} title={op} onPress={handleAddNumberStrs(op)} />
        ))}
        <Button title={'='} onPress={handleGetAnswer} color={'#111'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    padding: 8,
    margin: 8,
  },
});
