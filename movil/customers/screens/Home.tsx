import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView , Image} from 'react-native';
import { RootStackScreenProps } from '../types';
import CustomerService from '../services/CustomerService';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        CustomerService.getAll().then(response => {
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        })
    }

    const goToCustomer = async (customer: number) => {
        navigation.replace('CustomerInfo', { customerId: customer });
    }

    const filterCustomers = (text: string) => {
        setFilterText(text);

        if (text === '') {
            getCustomers();
            return;
        }

        setFilteredCustomers(customers.filter((customer: any) => {
            return (customer.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1 || customer.firstName.indexOf(text.toLowerCase()) > -1) 
            || (customer.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1 || customer.lastName.indexOf(text.toLowerCase()) > -1)
        }));
    }

  return (
    <SafeAreaView style={styles.container}>

<View style={styles.searchContainer}>
                <View style={styles.searchInput}>
                    <Feather 
                      style={styles.inputIcon} 
                      name="search" 
                      size={24} 
                      color="#34495C" />
                    <TextInput 
                      style={styles.input} 
                      placeholder="Search" 
                      value={filterText}
                      onChangeText={newText => filterCustomers(newText)}
                    />
                </View>
            </View>

            <ScrollView style={styles.cardContainer}>

                {   filteredCustomers.map((customer: any, index: number) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => goToCustomer(customer.id)}>
                                <View style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle}>
                                            {customer.firstName} {customer.lastName}
                                        </Text>
                                        <Text style={styles.cardSubtitle}>
                                            {customer.cellPhone}
                                        </Text>
                                        <Text style={styles.cardSubtitle}>
                                            {customer.profession}
                                        </Text>
                                        <Text style={styles.cardSubtitle}>
                                            {customer.gender}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })

                }

            </ScrollView>

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.touchableOpacityStyle} onPress={() => navigation.navigate('Customer', { customerId: 0 })}>
        <Feather
                        name="plus"
                        size={24}
                        color="#fff"
                    />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#3498db',
        borderRadius: 50,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 20,
        width: '100%',
    },
    searchInput: {
        backgroundColor: '#E7E7E8',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        color: '#34495C',
        width: '100%',
    },
    cardContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#E7E7E8',
        borderRadius: 25,
        width: '100%',
        padding: 15,
        marginTop: 15,
    },
    cardHeader: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#34495C',
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#34495C',
    },
});
