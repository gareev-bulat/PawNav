import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import { useFonts } from 'expo-font'
const Card = () => {

    const [] = useFonts({
        'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
    });

    let ProfileName = "John Doe"
    let ProfileStatus = "This is an example bio"
    let ProfileRole = "Profile Role"
    let ProfileFav = "List of favourite shelters"
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{ProfileName}</Text>
            </View>
            <Image
            style={styles.profile_image}
            source={require("../../assets/images/profile_image.jpeg")}
            />
            <View style={styles.body}>
            <Text style={styles.title}>Status:</Text>
            <Text style={styles.text}>{ProfileStatus}</Text>
            <Text style={styles.title}>Role:</Text>
            <Text style={styles.text}>{ProfileRole}</Text>
            <Text style={styles.title}>Favourite Shelters:</Text>
            <Text style={styles.text}>{ProfileFav}</Text>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        padding : 5,
        textAlign: "left",
        flex: 1,
    },
    header: {
        padding : 5,
        flex: 1,
        alignItems: "left",
        backgroundColor: "#ff7f09",
    },
    buttons: {
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        marginBottom: 5,
        paddingTop: 40, 
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff7f09",
    },

    text: {
        marginBottom: 75,
        fontSize: 20,
        fontWeight: 500,
        color: 'black',
        paddingTop: 5,
    },

    name: {
        textAlign: 'left',
        fontSize: 30,
        color: "black",
        fontFamily: 'CustomFont',
        top: 50,
        marginTop: 80,
        position: 'absolute',
        justifyContent: 'flex-start',
    },

    profile_image: {
        top: 0,
        marginTop: 10,
        position: 'absolute',
        justifyContent: 'flex-start',
        height: '17%',
        width: '30%',
        borderRadius: '100%',
    }
});

export default Card;