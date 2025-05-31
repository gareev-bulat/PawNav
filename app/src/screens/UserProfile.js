import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { auth, db } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import * as Constants from '../utilities/constants';
import * as Progress from 'react-native-progress';
import { AntDesign } from "@expo/vector-icons";
import { getDownloadURL, ref, getStorage, uploadBytes } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";

const UserProfile = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });
  
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [yourShelters, setYourShelters] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [vanishTrigger, setVanishTrigger] = useState(false);

  const NUM_COLUMNS = 2;
  

  const uid = auth.currentUser ? auth.currentUser.uid : null;

  const fetchImage = async() => {

    setImageLoading(true);

    try{

      const imageRef = ref(getStorage(), `UserImages/${uid}/UserProfileImage`);
    const imageURL = await getDownloadURL(imageRef);
    setImageURL(imageURL);


    }catch(err){
      console.log(err);
    }
  }

  const fetchYourShelters = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Not signed in");

    const sheltersRef = collection(db, "users", uid, "Shelter Information");
    const snap = await getDocs(sheltersRef);

    const storage = getStorage();

    const shelters = await Promise.all(
          snap.docs
              .filter(d => d.data().shelterStatus === "Published")
              .map(async d => {
                const data = d.data();
                const imgRef = ref(storage, `images/${d.id}/ShelterBanner`);
                const url = await getDownloadURL(imgRef);
                return { id: d.id, imageURL: url, shelterName: data.shelterName };
              })
    );

    setYourShelters(shelters);
    
  };


  useEffect(() => {
    if (!uid) {
      setLoadingData(false);
      return;
    }

   

    fetchYourShelters();

    fetchImage();

    const userDocRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          console.log('Fetched user data: ', docSnap.data());
           
        } else {
          console.log("No documents");
        }
        setLoadingData(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        setLoadingData(false);
      }
    );

    return unsubscribe;
  }, [uid]);

  if (!fontsLoaded || loadingData) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Constants.DARK_RED} />
      </SafeAreaView>
    );
  }

  let ProfileName = userData?.name || "Name";
  let ProfileSurname = userData?.surname || "Surname";
  let ProfileRole = userData?.role || "Role";
  let ShelterOwner = userData?.owner;
  let RegistrationStatus = userData?.registrationStatus;
  let Favourites = userData?.favourites || [];

  console.log("userData: ", userData)

  console.log('Favourites data: ', Favourites); 

  const startPendingAndNavigate = () => {

    RegistrationStatus = "Pending";
    navigation.navigate("RollInfoPagesStack");
  };


  const RenderShelter = ({ item }) => (
    <TouchableOpacity onPress={() => Alert.alert(item.shelterName)} style={[styles.ShelterContainer, { flexBasis: `${100 / NUM_COLUMNS}%` }]}>
      <Image
        source={{ uri: item.imageURL }}
        style={styles.ShelterImage}
      />
      <Text style={styles.ShelterName}>{item.shelterName}</Text>
    </TouchableOpacity>
  )

  const getColor = () => {
    switch (RegistrationStatus) {
      case 'Finish registration':
        return Constants.DARK_RED;
      case "Pending":
        return Constants.YELLOW;
      case "Approved":
        return Constants.GREEN;
    }
  }

  const getProgress = () => {
    switch (RegistrationStatus) {
      case 'Finish registration':
        return 0.35;
      case "Pending":
        return 0.7;
      case "Approved":
        return 1.0;
    }


  }

  const onPressHandler = () => {

    if (RegistrationStatus === "Approved"){
       setVanishTrigger(true);
       return;
    }
    navigation.navigate("RollInfoPagesStack")

  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sub_container}>
          <Image
            style={styles.profile_image}
            source={
              imageURL
                ? { uri: imageURL }
                : require("../../assets/images/profile_temp.jpg")
            }
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />

          {imageLoading && (
            <ActivityIndicator
              size="small"
              color={Constants.DARK_RED}
              style={styles.imageSpinner}
            />
          )}
          <View style={styles.editButton}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <FontAwesome5
                name="pen"
                style={styles.editIcon}
                size={20}
                color={Constants.DARK_RED}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.right_content}>
          <Text style={styles.name}>
            {ProfileName} {ProfileSurname}
          </Text>

          <Text style={styles.role}>{ProfileRole}</Text>
        </View>
      </View>

      <ScrollView style={styles.body} indicatorStyle="white">
        {ShelterOwner &&
          !vanishTrigger &&
          RegistrationStatus != "No registration" && (
            <TouchableOpacity
              disabled={RegistrationStatus == "Pending"}
              style={styles.shelter_owner_tab}
              onPress={onPressHandler}
            >
              <View style={styles.registrationButton}>
                {RegistrationStatus == "Finish registration" && (
                  <Text
                    style={[
                      styles.registrationButtonText,
                      styles.finishRegistrationColor,
                    ]}
                  >
                    Complete shelter registration
                  </Text>
                )}
                {RegistrationStatus == "Pending" && (
                  <Text
                    style={[
                      styles.registrationButtonText,
                      styles.PendingRegistrationColor,
                    ]}
                  >
                    Pending shelter registration
                  </Text>
                )}
                {RegistrationStatus == "Approved" && (
                  <Text
                    style={[
                      styles.registrationButtonText,
                      styles.ApprovedRegistrationColor,
                    ]}
                  >
                    Shelter is approved
                  </Text>
                )}
              </View>
              <View style={styles.progress_bar_container}>
                <View style={styles.progress_bar}>
                  <Progress.Bar
                    progress={getProgress()}
                    color={getColor()}
                    width={300}
                    height={8}
                  />
                </View>
                <AntDesign name="right" size={16} color={Constants.DARK_RED} />
              </View>
            </TouchableOpacity>
          )}

        {yourShelters.length > 0 && (
          <>
            <Text style={styles.title}>Your Shelters</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.scrollViewContent}
              style={styles.boxStyle}
            >
              {yourShelters.map((item) => (
                <RenderShelter key={item.id} item={item} />
              ))}

              <TouchableOpacity
                onPress={startPendingAndNavigate}
                style={[
                  styles.addCardTouchable,
                  { flexBasis: `${100 / NUM_COLUMNS}%` },
                ]}
              >
                <View style={styles.addIconWrapper}>
                  <FontAwesome5
                    name="plus"
                    size={40}
                    color={Constants.DARK_RED}
                  />
                </View>
                <Text style={styles.addCardText}>Add Shelter</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}

        <Text style={styles.title}>Favourite Shelters</Text>
        {Favourites && Favourites.length > 0 && (
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.scrollViewContent}
              style={styles.boxStyle}
            >
              {Favourites.map((item) => (
                <RenderShelter key={item.id} item={item} />
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  progress_bar_container: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scrollViewContent: {

    flexDirection: "row",
    alignItems:    "center",
    columnGap:     25,          
    paddingHorizontal: 10, 



  },

  boxStyle: {


    backgroundColor: 'rgb(255, 231, 146)',
    borderRadius: 30,
    padding: 30,
    height: 220,

  },


  shelter_owner_tab: {
    marginTop: 20,
    height: 100,
    backgroundColor: 'rgb(255, 231, 146)',
    flexDirection: 'column',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between'
  },  

  imageSpinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  editIcon: {
    transform: [{ rotate: '90deg' }],

  },

  finishRegistrationColor: {
    backgroundColor: '#FF704F',
    borderRadius: 13,
  },

  PendingRegistrationColor: {
    backgroundColor: '#FFE523',
    borderRadius: 13,
  },

  ApprovedRegistrationColor: {
    backgroundColor: '#32CA35',
    borderRadius: 13,
  },

  registrationButtonText: {
    fontSize: 15,
    padding: 3,
    fontWeight: 500,
    borderColor: Constants.DEFAULT_ORANGE,
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  registrationButton: {
    width: 260,
    height: 50,
    paddingVertical: 6,
    
  },

  container: {
    alignItems: 'flex-start',
    flex: 1,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: Constants.DARK_RED,
    borderWidth: 0.5,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    width: '100%',
    paddingHorizontal: 20,  
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: "row",
    width: '100%',
    backgroundColor: "#ff7f09",
    justifyContent: 'space-evenly',
  },

  sub_container: {
    position: 'relative',
    padding: 0,

  },

  title: {
    marginBottom: 5,
    paddingTop: 40,
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: "bold",
    color: "#ff7f09",
  },
  text: {
    marginBottom: 75,
    fontSize: 20,
    fontWeight: "500",
    color: 'black',
    paddingTop: 5,
    alignSelf: 'center',
  },
  role: {
    color: Constants.WHITE,
    textAlign: 'left',
    padding: 3,
    fontWeight: "500",
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: Constants.DARK_RED,
    marginTop: 15,
    borderRadius: 15,
    width: 120,
  },
  name: {
    fontSize: 28,
    color: "black",
    paddingTop: 10,
    fontFamily: 'CustomFont',
  },
  profile_image: {
    marginTop: 10,
    width: 130,
    height: 130,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  ShelterContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  
  ShelterImage: {
    width: 120,
    height: 120,
    borderRadius: 70,  
    marginBottom: 5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ff7f09',
  },
  
  ShelterName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },

  addCardTouchable: {
    alignItems:       "center",
    justifyContent:   "center",
    marginRight:      14,          
    paddingVertical:  12,
    backgroundColor:  "rgb(255, 231, 146)", 
    borderRadius:     20,
  },


  addIconWrapper: {
    width:            80,
    height:           80,
    borderRadius:     40,         
    borderWidth:      2,
    borderColor:      Constants.DARK_RED,
    alignItems:       "center",
    justifyContent:   "center",
    marginBottom:     8,
  },


  addCardText: {
    fontSize:    16,
    fontWeight:  "500",
    color:       Constants.DARK_RED,
    textAlign:   "center",
  },
  
  
});

export default UserProfile;
