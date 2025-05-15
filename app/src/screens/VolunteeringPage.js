import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VolunteeringPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Get Involved: Animal Shelter Volunteering</Text>

                <Section 
                    title="Adoption Events" 
                    description="Join us in hosting adoption days where loving animals meet their new families." 
                    style={styles.adoptionEvents} 
                />
                
                <Section 
                    title="Shelter Care" 
                    description="Lend a hand with daily tasks like feeding, grooming, and ensuring the shelter stays welcoming." 
                    style={styles.shelterCare} 
                />

                <Section 
                    title="Foster Program" 
                    description="Offer a temporary home to animals in transition, giving them love and stability." 
                    style={styles.fosterProgram} 
                />

                <Section 
                    title="Fundraising & Supplies" 
                    description="Help gather essential items and raise vital funds to keep our animals healthy and happy." 
                    style={styles.fundraising} 
                />

                <Section 
                    title="Community Education" 
                    description="Spread awareness about responsible pet care and the benefits of adoption in your community." 
                    style={styles.communityEducation} 
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const Section = ({ title, description, style }) => (
    <View style={[styles.section, style]}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContainer: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#37474f",
        marginBottom: 35,
        textAlign: "center",
    },
    section: {
        marginBottom: 25,
        padding: 25,
        borderRadius: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 10,
        color: "#263238",
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#546e7a",
        textAlign: "center",
        lineHeight: 24,
    },
    adoptionEvents: {
        backgroundColor: "#ffe0b2",
    },
    shelterCare: {
        backgroundColor: "#c8e6c9",
    },
    fosterProgram: {
        backgroundColor: "#b3e5fc",
    },
    fundraising: {
        backgroundColor: "#d1c4e9",
    },
    communityEducation: {
        backgroundColor: "#ffccbc",
    },
});

export default VolunteeringPage;

