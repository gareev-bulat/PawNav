import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

const App = () => {
    return (
      <SafeAreaView>
        <View style={{ backgroundColor: "blue" }}>
          <Text>Current Weather</Text>
        </View>
      </SafeAreaView>
    );
}

export default App;