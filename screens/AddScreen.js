import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends React.Component {

    state = {
        name: '',
        dataTxt: '',
        type: ''
    };

    onTypeChanged(value) {
        this.setState({
            type: value
        });
    }

    async rememberData() {
        const name = this.state.name;
        const dataTxt = this.state.dataTxt;
        const type = this.state.type;

        if (name !== '' && dataTxt !== '' && type !== '') {
            const data = { name, type, dataTxt };
            try {
                await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(data));
                this.props.navigation.navigate('Home');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Enter some data, please');
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    label='Name'
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />

                <TextInput
                    label='Data'
                    value={this.state.dataTxt}
                    onChangeText={dataTxt => this.setState({ dataTxt })}
                    style={{
                        marginTop: 20
                    }}
                />

                <Text style={styles.text}>Select type:</Text>

                <Picker
                    note
                    mode="dropdown"
                    style={styles.picker}
                    selectedValue={this.state.type}
                    onValueChange={this.onTypeChanged.bind(this)}
                >
                    <Picker.Item label="..." value="" />
                    <Picker.Item label="Link" value="link" />
                    <Picker.Item label="Location" value="location" />
                    <Picker.Item label="Phone" value="phone" />
                    <Picker.Item label="Website" value="website" />
                    <Picker.Item label="Email" value="email" />
                </Picker>

                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {
                        this.rememberData();
                    }}
                >
                    Remember
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    picker: {
        width: 385,
    },
    text: {
        marginTop: 20
    },
    button: {
        marginTop: 20
    }
});
