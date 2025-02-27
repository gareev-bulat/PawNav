import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
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
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bulat</Text>
                    <Text style={styles.description}>
                        Bulat is our product owner and dedicated to helping and fostering animal care.
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Christian</Text>
                    <Text style={styles.description}>
                        Christian is a pet owner who love for dogs made him became a collaborator for this project. 
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>David</Text>
                    <Text style={styles.description}>
                        David specializes in fundraising efforts to support shelters with food, medical care, and infrastructure.
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ethan</Text>
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
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
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
});

export default AboutUsPage;
