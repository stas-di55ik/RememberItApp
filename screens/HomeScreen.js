import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

export default class HomeScreen extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.getAllData();
    }

    async getAllData() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const data = await AsyncStorage.multiGet(keys);
            let objects = [];
            data.forEach(element => {
                const elementStr = element.toString();
                const splitIndex = elementStr.indexOf(',');
                const id = elementStr.slice(0, splitIndex);
                const objectStr = elementStr.slice(splitIndex + 1);
                const obj = JSON.parse(objectStr);
                obj.key = id;
                objects.push(obj);
                console.log(obj);
            });
            this.setState({ data: objects })
        } catch (error) {
            console.error(error);
        }
    }

    handleDeleteItem = async (id) => {
        try {
            await AsyncStorage.removeItem(id);

            this.setState(prevState => ({
                data: prevState.data.filter(item => item.key !== id)
            }));
        } catch (error) {
            console.error(error);
        }
    };

    renderIcon(item) {
        switch (item.type) {
            case 'link':
                return <FontAwesome name="link" size={24} color='#2980b9' />
            case 'location':
                return <MaterialIcons name='location-on' size={24} color='#2980b9' />;
            case 'phone':
                return <MaterialIcons name='phone' size={24} color='#2980b9' />;
            case 'website':
                return <FontAwesome name="internet-explorer" size={24} color="#2980b9" />;
            case 'email':
                return <MaterialIcons name='email' size={24} color='#2980b9' />;
            default:
                return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.getAllData()} style={styles.refreshButton}>
                    <MaterialIcons name="refresh" size={24} color="#2980b9" />
                </TouchableOpacity>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    if (item.type == 'link') {
                                        Linking.openURL(item.dataTxt);
                                    } else if (item.type == 'location') {
                                        Linking.openURL(`https://www.google.com/maps/place/${item.dataTxt}`);
                                    } else if (item.type == 'phone') {
                                        Linking.openURL(`tel:${item.dataTxt}`);
                                    } else if (item.type == 'website') {
                                        Linking.openURL(item.dataTxt);
                                    } else if (item.type == 'email') {
                                        Linking.openURL(`mailto:${item.dataTxt}`);
                                    }
                                }}
                            >
                                {this.renderIcon(item)}
                                <Text style={{ marginLeft: 8 }}>{`${item.name} (${item.type})`}</Text>
                            </TouchableOpacity>

                            <Text style={styles.dataItem}>{item.dataTxt}</Text>

                            <TouchableOpacity style={{ marginLeft: 340 }} onPress={() => this.handleDeleteItem(item.key)}>
                                <AntDesign name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Add');
                    }}
                    style={styles.fab}
                >
                    <MaterialIcons name='add' size={30} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    fab: {
        backgroundColor: '#f1c40f',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            height: 4,
            width: 4
        },
        position: 'absolute',
        right: 40,
        bottom: 40
    },
    listItem: {
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#EFEFEF',
        marginTop: 10,
        borderRadius: 8,
    },
    dataItem: {
        color: '#2980b9'
    }
});
