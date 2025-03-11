import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUsPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Our Mission</Text>
                <Text style={styles.description}>
                    Our mission is to be a turning point for homeless and shelter animals by expanding the animal rescue community. 
                    We provide opportunities for adoption, volunteering, and donations to shelters. 
                    Currently, we focus on the Philadelphia area with plans to expand across Pennsylvania in the future.
                </Text>
                <Text style={[styles.title, {marginTop: 40}]}>Our Team</Text>
                
                <View style={[styles.section, styles.bulat]}>
                <Image
                    style={styles.shelter_image}
                    source={require("../../assets/images/profile_pictures/bulat_image.jpeg")}
                />
                    <Text style={[styles.sectionTitle, {alignSelf: 'center'}]}>Bulat</Text>
                    <Text style={styles.description}>
                        Bulat is our product owner and dedicated to helping and fostering animal care.
                    </Text>
                </View>
                
                
                <View style={[styles.section, styles.christian]}>
                <Image
                    style={styles.shelter_image}
                    source={require("../../assets/images/profile_pictures/christian_image.jpeg")}
                />
                    <Text style={[styles.sectionTitle, {alignSelf: 'center'}]}>Christian</Text>
                    <Text style={styles.description}>
                        Christian is a pet owner whose love for dogs made him become a collaborator for this project. 
                    </Text>
                </View>
                
                
                <View style={[styles.section, styles.david]}>
                <Image
                    style={styles.shelter_image}
                    source={require("../../assets/images/profile_pictures/david_image.jpeg")}
                />
                    <Text style={[styles.sectionTitle, {alignSelf: 'center'}]}>David</Text>
                    <Text style={styles.description}>
                        David specializes in fundraising efforts to support shelters with food, medical care, and infrastructure.
                    </Text>
                </View>
                
                
                <View style={[styles.section, styles.ethan]}>
                <Image
                    style={styles.shelter_image}
                    source={require("../../assets/images/profile_pictures/ethan_image.jpeg")}
                />
                    <Text style={[styles.sectionTitle, {alignSelf: 'center'}]}>Ethan</Text>
                    <Text style={styles.description}>
                        Ethan focuses on technology and innovation, improving the efficiency of shelter operations and adoption processes.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0f7fa",
    },
    scrollContainer: {
        padding: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    section: {
        marginBottom: 30,
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
    },

    shelter_image: {
        height: 150,
        width: 150,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 100,
        alignSelf: 'center'
    },
    
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
    },
    bulat: {
        backgroundColor: "#ffccbc",
    },
    christian: {
        backgroundColor: "#c8e6c9",
    },
    david: {
        backgroundColor: "#bbdefb",
    },
    ethan: {
        backgroundColor: "#d1c4e9",
    },
});

export default AboutUsPage;

