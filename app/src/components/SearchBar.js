import { View, Text,  TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import SearchBar from "react-native-dynamic-search-bar";
import { useEffect, useState } from 'react';
import * as Constants from '../utilities/constants';
import PopUpList from './PopUpList';


function dataFetch(address) {
    const apiKey = "AIzaSyDCZ1LBNnvoHXK_IZX95lONX4xzAjz4faw";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
          if (data['status'] !== 'ZERO_RESULTS')
              return data["results"][0]["geometry"]["location"]     
      })
      .catch((error) => {console.error("Error:", error);
      throw error;});
  }
  
export function CoordinatesSetter(location){
    return location;
}


const SearchComponent = () => {

    const [text, setText] = useState('')
    const [ListState, setListState] = useState(false)

    useEffect(() => {
        if (text !== ''){
            dataFetch(text)
           .then(location => {
              if (location !== undefined){
                  console.log("Search result: ", CoordinatesSetter(location));
                  CoordinatesSetter(location);
              }
              else{
                console.log("no results");
              }
           })
           .catch (error => {
               console.log(error);
           });
        }
    }, [text])


    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <TextInput
            style={{
              width: "94%",
              right: "3%",
              left: "3%",
              height: 45,
              borderRadius: 20,
              borderWidth: 1.47,
              paddingLeft: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: Constants.DARK_RED,
            }}
            placeholder="Search"
            onFocus={() => {
              console.log("open");
              setListState(true);
            }}
            onBlur={() => {
              console.log("close");
              setListState(false);
            }}
            onChangeText={(text) => setText(text)}
          />
          <View>
          <PopUpList state={ListState} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );

}

export default SearchComponent; 