import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
export default function App() {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Main/>
      </NativeRouter>
      <StatusBar style="auto" />
    </View>
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
