import React, {useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font'
import  Ionicons  from "@expo/vector-icons/Ionicons";
import { auth, db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';

const ShelterProfile = ( { navigation, route } ) => { //route for passing props fro SheltersMenu component

  const handleAdoption = () => alert("Adopt!");
  const handleVolunteering = () => alert("Volunteer!");
  const handleDonation = () => alert("Donate!");

  const { shelter } = route.params; //route object

  const [isFavorite, setIsFavorite] = useState(false);

  const uid = auth.currentUser ? auth.currentUser.uid : null;
  console.log(uid);
  console.log(shelter.name);


  useEffect(() => {
    if (!uid) return;

    const userDocRef = doc(db, 'users', uid);
    

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log(docSnap.data())
        const favourites = docSnap.data().favourites || [];
        console.log(favourites.includes(shelter.name))
        setIsFavorite(favourites.includes(shelter.name));
      }
    });

    return unsubscribe;
  }, [uid]);
  
  



  const toggleFavorite = async () => {
    setIsFavorite(prev => !prev);

    if (!uid) return;

    const userDocRef = doc(db, 'users', uid);

    try {
      if (!isFavorite) {
        await updateDoc(userDocRef, {
          favourites: arrayUnion({
            name: shelter.name,
            imageUrl: shelter.imageUrl
          }),
        });
      } else {
        await updateDoc(userDocRef, {
          favourites: arrayRemove({
            name: shelter.name,
            imageUrl: shelter.imageUrl 
          }),
        });
      }
      setIsFavorite(prev => !prev);
    } catch (error) {
      console.error("Error updating favorites: ", error);
    }
  };

  const [] = useFonts({
    'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  let ShelterInformation = "Information";
  let ShelterLocation = "Locations";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="exit-outline" size={35} color="black" />
          </TouchableOpacity>

          <Text style={styles.name}>{shelter.name}</Text>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={30}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>

        {/* Image */}
        <Image
          style={styles.shelter_image}
          source={require("../../assets/images/animal_shelter_image_profile.webp")}
        />

        {/* Info Section */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Information:</Text>
          <Text style={styles.sectionText}>Shelter information</Text>

          <Text style={styles.sectionTitle}>Location:</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.sectionText}>
              1234 Shelter St.{"\n"}City, State 12345
            </Text>
            <Image
              style={styles.map}
              source={require("../../assets/images/map_placeholder.png")}
            />
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.button, styles.adoptButton]}
            onPress={handleAdoption}
          >
            <Text style={styles.whiteText}>Adopt a pet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.volunteerButton]}
            onPress={handleVolunteering}
          >
            <Text style={styles.orangeText}>Apply for volunteering</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.donateButton]}
            onPress={handleDonation}
          >
            <Text style={styles.whiteText}>Make a donation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Back Button */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        alignItems: "left",
        flex: 1,
    },

    title: {
        marginBottom: 10,
        paddingTop: 10, 
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff7f09",
    },

    text: {
        marginBottom: 10,
        fontSize: 12,
        fontWeight: 500,
        color: 'black',
        paddingTop: 5,
    },

   

    
    buttonRow: {
      flexDirection: 'column',
      marginTop: 15,
    
  },

  buttonText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
  },

  alternate_font: {
    color: '#ff7f09',

  },
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "#ff7f09",
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  name: {
    fontSize: 26,
    color: "black",
    flex: 1,
    textAlign: 'center',
    fontFamily: "CustomFont",
  },
  shelter_image: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20,
    resizeMode: "cover",
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  adoptButton: {
    backgroundColor: "#ff7f09",
  },
  volunteerButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#ff7f09",
  },
  donateButton: {
    backgroundColor: "#ff7f09",
  },
  whiteText: {
    color: "white",
    fontWeight: "600",
  },
  orangeText: {
    color: "#ff7f09",
    fontWeight: "600",
  },

  iconButton: {
    widht: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ShelterProfile;



