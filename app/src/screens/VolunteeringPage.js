import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VolunteeringPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Volunteer for Animal Shelters</Text>
                
                <View style={[styles.section, styles.adoptionEvents]}>
                    <Text style={styles.sectionTitle}>Adoption Events</Text>
                    <Text style={styles.description}>
                        Help organize and participate in adoption events where animals find their forever homes.
                    </Text>
                </View>
                
                <View style={[styles.section, styles.dailyAssistance]}>
                    <Text style={styles.sectionTitle}>Daily Shelter Assistance</Text>
                    <Text style={styles.description}>
                        Assist with feeding, cleaning, and caring for animals at local shelters.
                    </Text>
                </View>
                
                <View style={[styles.section, styles.fostering]}>
                    <Text style={styles.sectionTitle}>Fostering</Text>
                    <Text style={styles.description}>
                        Provide temporary homes for animals in need until they are adopted.
                    </Text>
                </View>
                
                <View style={[styles.section, styles.fundraising]}>
                    <Text style={styles.sectionTitle}>Fundraising & Donations</Text>
                    <Text style={styles.description}>
                        Help raise funds or donate supplies such as food, toys, and blankets.
                    </Text>
                </View>
                
                <View style={[styles.section, styles.outreach]}>
                    <Text style={styles.sectionTitle}>Community Outreach</Text>
                    <Text style={styles.description}>
                        Educate the community about responsible pet ownership and the importance of adoption.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8f5e9",
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
    adoptionEvents: {
        backgroundColor: "#ffebee",
    },
    dailyAssistance: {
        backgroundColor: "#e3f2fd",
    },
    fostering: {
        backgroundColor: "#ede7f6",
    },
    fundraising: {
        backgroundColor: "#fbe9e7",
    },
    outreach: {
        backgroundColor: "#e8f5e9",
    },
});

export default VolunteeringPage;

