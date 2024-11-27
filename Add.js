import React,{useState} from 'react';
import {datasource} from "./Data.js";
import {TextInput, View, Text, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import App from "./App";

const Add = ({navigation}) => {
    const [Name, setName] = useState('');
    const [Id, setId] = useState('1');
    const [type, setType] = useState('Grass/Bug');
    return (
        <View style={{padding:10}}>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold'}}>Name:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text) => setName(text)}/>
            </View>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold'}}>Card ID:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text) => setId(text)}/>
            </View>
            <View style={{padding:10}}>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        {label:"Grass/Bug", value:"Grass/Bug"},
                        {label:"Fire", value:"Fire"},
                        {label:"Water/Ice", value:"Water/Ice"},
                        {label:"Normal/Flying", value:"Normal/Flying"},
                        {label:"Dark/Poison", value:"Dark/Poison"},
                        {label:"Lightning", value:"Lightning"},
                        {label:"Fighting/Ground", value:"Fighting/Ground"},
                        {label:"Psychic/Fairy/Ghost", value:"Psychic/Fairy/Ghost"},
                        {label:"Dragon", value:"Dragon"},
                    ]}
                />
            </View>
            <Button title="SUBMIT"
                    onPress={() => {
                        let item = {Name:Name , CardImage:Id};
                        let indexNum = 0;
                        if (type == 'Fire') {
                            indexNum = 1;
                        }
                        else if (type == 'Water/Ice') {
                            indexNum = 2;
                        }
                        else if (type == 'Normal/Flying') {
                            indexNum = 3;
                        }
                        else if (type == 'Dark/Poison') {
                            indexNum = 4;
                        }
                        else if (type == 'Lightning') {
                            indexNum = 5;
                        }
                        else if (type == 'Fighting/Ground') {
                            indexNum = 6;
                        }
                        else if (type == 'Psychic/Fairy/Ghost') {
                            indexNum = 7;
                        }
                        else if (type == 'Dragon') {
                            indexNum = 8;
                        }
                        datasource[indexNum].data.push(item);
                        navigation.navigate('Home');
                    }}/>
        </View>
    );
}
export default Add;
