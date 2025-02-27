import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VolunteeringPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Volunteer for Animal Shelters</Text>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Adoption Events</Text>
                    <Text style={styles.description}>
                        Help organize and participate in adoption events where animals find their forever homes.
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Daily Shelter Assistance</Text>
                    <Text style={styles.description}>
                        Assist with feeding, cleaning, and caring for animals at local shelters.
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fostering</Text>
                    <Text style={styles.description}>
                        Provide temporary homes for animals in need until they are adopted.
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fundraising & Donations</Text>
                    <Text style={styles.description}>
                        Help raise funds or donate supplies such as food, toys, and blankets.
                    </Text>
                </View>
                
                <View style={styles.section}>
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
    },
});

export default VolunteeringPage;
