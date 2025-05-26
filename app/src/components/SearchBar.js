import React, { useState, useEffect } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import * as Constants from '../utilities/constants';
import PopUpList from './PopUpList';

function dataFetch(address) {
  const apiKey = 'AIzaSyDCZ1LBNnvoHXK_IZX95lONX4xzAjz4faw';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 'ZERO_RESULTS') {
        return data.results[0].geometry.location;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}



const SearchComponent = () => {
  const [text, setText] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);


  console.log(text);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{
          width: '94%',
          left: '3%',
          height: 45,
          borderRadius: 20,
          borderWidth: 1.47,
          paddingLeft: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: Constants.DARK_RED,
          marginTop: 15,
        }}
        placeholder="Search"
        onFocus={() => {
          console.log('Show popup');
          setPopupVisible(true);
        }}
      
        onBlur={() => {
           console.log('Hide popup');
           setPopupVisible(false);
         }}
        onChangeText={(value) => setText(value)}
        value={text}
      />

      <PopUpList
        isVisible={popupVisible}
        onItemPress={() => {
          console.log('Item pressed');
          setPopupVisible(false);
        }}
        searchText={text}
      />
    </View>
  );
};

export default SearchComponent;
