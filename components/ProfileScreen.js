import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

function ProfileScreen() {
    const auth = getAuth();
    const user = auth.currentUser;

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [skillLevel, setSkillLevel] = useState('beginner');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogOut = async () => {
        await signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    if (!auth.currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    const handleSubmit = () => {
        // Her kan du sende brugerens profiloplysninger til din database eller udføre andre handlinger.
        // Du kan bruge variablerne name, gender, age og skillLevel til at sende data til din backend eller database.

        // Eksempel: Send data til en API
        const profileData = {
            name,
            gender,
            age,
            skillLevel,
        };

        // Her kan du sende profileData til din API eller database.
        // Du kan bruge fetch eller en anden HTTP-anmodningsmetode til dette formål.

        // Nulstil felterne efter afsendelse
        setName('');
        setGender('');
        setAge('');
        setSkillLevel('beginner');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bruger: {user.email}</Text>
            <Text style={styles.label}>Profile Information:</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Gender"
                value={gender}
                onChangeText={(text) => setGender(text)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Age"
                value={age}
                onChangeText={(text) => setAge(text)}
                style={styles.inputField}
            />
            <Text style={styles.label}>Tennis Skill Level:</Text>
            <View style={styles.radioButtons}>
                <TouchableOpacity
                    style={[styles.radioButton, skillLevel === 'beginner' && styles.radioButtonSelected]}
                    onPress={() => setSkillLevel('beginner')}
                >
                    <Text style={styles.radioButtonText}>Beginner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, skillLevel === 'intermediate' && styles.radioButtonSelected]}
                    onPress={() => setSkillLevel('intermediate')}
                >
                    <Text style={styles.radioButtonText}>Intermediate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, skillLevel === 'advanced' && styles.radioButtonSelected]}
                    onPress={() => setSkillLevel('advanced')}
                >
                    <Text style={styles.radioButtonText}>Advanced</Text>
                </TouchableOpacity>
            </View>
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            <Button onPress={handleSubmit} title="Gem Profil" color="#007AFF" />
            <Button onPress={handleLogOut} title="Log ud" color="#FF3B30" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F9F9F9', // Baggrundsfarve
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Tekstfarve
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555', // Tekstfarve
    },
    inputField: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#fff', // Baggrundsfarve
    },
    radioButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#007AFF', // Farve for valgt knap
        backgroundColor: '#007AFF', // Farve for valgt knap
    },
    radioButtonText: {
        color: '#333', // Farve for teksten på knapperne
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default ProfileScreen;
