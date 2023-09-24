import React, { useState } from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    // Initialiserer Firebase Authentication og får adgang til autentificeringsobjektet
    const auth = getAuth();

    // Lokale tilstande til opbevaring af brugerens email, adgangskode og fejlbesked
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

     // Funktion til at håndtere oprettelse af bruger
    const handleSubmit = async () => {
        // Opret bruger ved hjælp af email og adgangskode
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    }

    const renderButton = () => {
        return (
            <Button
                onPress={() => handleSubmit()}
                title="Create user"
                style={styles.button}
            />
        );
    };

    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
                placeholderTextColor="#888"
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: 300,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: 300,
        alignItems: 'center',
    },
});

export default SignUp;
