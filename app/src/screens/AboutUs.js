import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUs = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.description}>
            It will be a turning point for the homeless and shelter animals, expanding the animal rescue community among the public. 
            It will have various options, such as adopting an animal, volunteering, or donating to the shelter.  
            For now, we will focus on the Philadelphia area, and expand across Pennsylvania in the future.

            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
    },
});

export default AboutUs;