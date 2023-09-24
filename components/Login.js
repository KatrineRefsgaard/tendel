import React, { useState } from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    // Initialiserer Firebase authentication
    const auth = getAuth();

    // Opretter lokale tilstande for email, password og fejlbesked
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    //Funktion der håndterer indsendelse af login-formularen
    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
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
                title="Login"
                style={styles.button}
            />
        );
    };

    return (
        <View>
            <Text style={styles.header}>Login</Text>
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

export default Login;
