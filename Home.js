import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { datasource } from './Data.js';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightcyan',
        borderWidth: 2,
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imageStyle: {
        alignItems: 'center',
        width: 300,
        height: 300,
        margin: 20,
    },
});

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        const imageLink = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.CardImage}-2x.png`;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() =>
                    navigation.navigate('Edit', {
                        index: index,
                        type: section.title,
                        key: item.Name,
                    })
                }
            >
                <Text style={styles.textStyle}>{item.Name}</Text>
                <Image
                    source={{ uri: imageLink }}
                    style={styles.imageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginTop: 30 }}>
            <Button
                title="Add New Pokemon"
                onPress={() => navigation.navigate('Add')}
            />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgColor, icon } }) => (
                    <Text
                        style={[
                            styles.headerText,
                            styles.container,
                            { backgroundColor: bgColor },
                        ]}
                    >
                        <Icon name={icon} size={20} /> {title}
                    </Text>
                )}
            />
        </View>
    );
};

export default Home;


