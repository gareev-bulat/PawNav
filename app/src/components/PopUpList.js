import React from 'react'
import { FlatList, SafeAreaView, View, Text } from 'react-native'
import { DataBase } from '../utilities/data';



const Item = ({name}) => (
    <View>
        <Text>{name}</Text>
    </View>
);

const PopUpList = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={DataBase}
        renderItem={({ item }) => <Item name={item.name} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default PopUpList;
