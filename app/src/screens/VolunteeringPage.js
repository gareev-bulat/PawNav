import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VolunteeringPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>🐾 Get Involved: Animal Shelter Volunteering</Text>

                <Text style={styles.intro}>
                    Whether you're an animal lover, a community builder, or someone looking to make a difference,
                    there's a place for you here. Explore the ways you can help below!
                </Text>

                <Section 
                    title="Adoption Events" 
                    description="Join us in hosting adoption days where loving animals meet their new families. These joyful events are perfect for friendly faces and helping hands." 
                    style={styles.adoptionEvents} 
                />
                
                <Section 
                    title="Shelter Care" 
                    description="Lend a hand with daily tasks like feeding, grooming, walking, and keeping our furry friends happy and healthy." 
                    style={styles.shelterCare} 
                />

                <Section 
                    title="Foster Program" 
                    description="Offer a temporary home to animals in transition. Fosters provide essential love, comfort, and socialization to prepare pets for adoption." 
                    style={styles.fosterProgram} 
                />

                <Section 
                    title="Fundraising & Supplies" 
                    description="Help organize donation drives, supply collections, and online fundraisers that directly impact our shelter's ability to thrive." 
                    style={styles.fundraising} 
                />

                <Section 
                    title="Community Education" 
                    description="Become an advocate by sharing knowledge about pet care, adoption benefits, and the importance of spaying and neutering." 
                    style={styles.communityEducation} 
                />

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>📬 Want to Get Started?</Text>
                    <Text style={styles.contactText}>Email us at: volunteer@animalshelter.org</Text>
                    <Text style={styles.contactText}>Call: (555) 123-4567</Text>
                    <Text style={styles.contactText}>Visit: 123 Paw Street, Petville, USA</Text>
                </View>
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
        backgroundColor: "#fefefe",
    },
    scrollContainer: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#37474f",
        marginBottom: 20,
        textAlign: "center",
    },
    intro: {
        fontSize: 16,
        color: "#455a64",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 24,
    },
    section: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
        color: "#263238",
        textAlign: "center",
    },
    description: {
        fontSize: 15,
        color: "#546e7a",
        textAlign: "center",
        lineHeight: 22,
    },
    adoptionEvents: {
        backgroundColor: "#fff3e0",
    },
    shelterCare: {
        backgroundColor: "#e8f5e9",
    },
    fosterProgram: {
        backgroundColor: "#e1f5fe",
    },
    fundraising: {
        backgroundColor: "#ede7f6",
    },
    communityEducation: {
        backgroundColor: "#fbe9e7",
    },
    contactSection: {
        marginTop: 30,
        padding: 20,
        backgroundColor: "#e0f7fa",
        borderRadius: 16,
        alignItems: "center",
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
        color: "#00796b",
    },
    contactText: {
        fontSize: 14,
        color: "#004d40",
        marginBottom: 4,
    },
});

export default VolunteeringPage;


