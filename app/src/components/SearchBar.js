import { useState } from 'react';
import { View, TextInput } from 'react-native';
import * as Constants from '../utilities/constants';
import PopUpList from './PopUpList';


const SearchComponent = () => {
  const [text, setText] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

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
          marginTop: 5,
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
