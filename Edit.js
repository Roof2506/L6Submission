import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data';
import { Picker } from '@react-native-picker/picker';

const Edit = ({ navigation, route }) => {
    const { index, type, key } = route.params;

    const [Name, setName] = useState(key); // Pokémon name
    const [CardImage, setCardImage] = useState(''); // Card image URL
    const [Type, setType] = useState(type); // Pokémon type/category

    // Set the card image dynamically based on the selected Pokémon
    useEffect(() => {
        const selectedPokemon = datasource.find((category) => category.title === type)
            ?.data[index];
        if (selectedPokemon) {
            setCardImage(selectedPokemon.CardImage);
        }
    }, [index, type]);

    const handleSave = () => {
        let categoryIndex = datasource.findIndex((category) => category.title === Type);
        if (categoryIndex === -1) {
            Alert.alert('Invalid Type', 'This type does not exist in the list.');
            return;
        }

        // Update the datasource with the new values
        datasource[categoryIndex].data[index] = {
            ...datasource[categoryIndex].data[index],
            Name,
            CardImage,
        };

        navigation.navigate('Home');
    };

    const handleDelete = () => {
        let categoryIndex = datasource.findIndex((category) => category.title === Type);
        if (categoryIndex === -1) {
            Alert.alert('Invalid Type', 'This type does not exist in the list.');
            return;
        }

        Alert.alert('Are you sure?', '', [
            {
                text: 'Yes',
                onPress: () => {
                    datasource[categoryIndex].data.splice(index, 1);
                    navigation.navigate('Home');
                },
            },
            { text: 'No' },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={Name}
                maxLength={20}
                style={styles.input}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Card Image (URL):</Text>
            <TextInput
                value={CardImage}
                style={styles.input}
                onChangeText={(text) => setCardImage(text)}
                placeholder="Enter image URL"
            />

            <Text style={styles.label}>Type:</Text>
            {/* Picker for selecting type */}
            <Picker
                selectedValue={Type}
                style={styles.input}
                onValueChange={(itemValue) => setType(itemValue)}
            >
                {datasource.map((category) => (
                    <Picker.Item key={category.title} label={category.title} value={category.title} />
                ))}
            </Picker>

            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Delete" onPress={handleDelete} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default Edit;
