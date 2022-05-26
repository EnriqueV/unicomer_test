import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView , Image} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootStackScreenProps } from '../types';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'
import MaskInput from 'react-native-mask-input';
import { useToast } from "react-native-toast-notifications";
import CustomerService from '../services/CustomerService';

export default function Customer({ route, navigation }) {
    const { customerId } = route.params;
    const toast = useToast()
    const [customerInfo, setCustomerInfo] = useState(null);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [profession, setProfession] = useState('');
    const [incomes, setIncomes] = useState('');
    const [open, setOpen] = useState(false)
    const [dateHere, setDateHere] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const genders = ["Femenino", "Masculino", "Otro"];
    
    useEffect(() => {
        getCustomer()
    }, [])

    const getCustomer = async () => {
        if (customerId === 0) {
            setIsEditing(false)
        } else {
            CustomerService.getById(customerId).then(res => {
                setCustomerInfo(res.data)
                setIsEditing(true)
                setAddress(res.data.address)
                setFirstname(res.data.firstName)
                setLastname(res.data.lastName)
                setPhone(res.data.cellPhone)
                setGender(res.data.gender)
                setProfession(res.data.profession);
                setIncomes(res.data.incomes)
            }, err => {
                setIsEditing(false)
            });
        }
    }

    const onSave = () => {
        if (firstname === '' || lastname === '' 
        || phone === '' || address === '' 
        || gender === '' || incomes === ''
        || profession === '') {
            toast.show("Por favor completa todos los campos", {
                type: "warning",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
              return;
        }

        const data = {
            firstName: firstname,
            lastName: lastname,
            cellPhone: phone,
            address: address,
            gender: gender,
            incomes: incomes,
            profession: profession
        }

        CustomerService.createCustomer(data).then(res => {
            console.log(res.data)
            toast.show("Datos almacenados correctamente", {
                type: "success",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
            setAddress('')
            setFirstname('')
            setLastname('')
            setPhone('')
            setGender('')
            setProfession('')
            setIncomes('')

            navigation.replace('Home');
        }, err => {
            toast.show("Ocurrió un error al guardar los datos", {
                type: "warning",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
        });
    }

    const onUpdate = () => {
        if (firstname === '' || lastname === '' 
        || phone === '' || address === '' 
        || gender === '' || incomes === ''
        || profession === '') {
            toast.show("Por favor completa todos los campos", {
                type: "warning",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
              return;
        }

        const data = {
            firstName: firstname,
            lastName: lastname,
            cellPhone: phone,
            address: address,
            gender: gender,
            incomes: incomes,
            profession: profession
        }

        CustomerService.updateCustomer(customerId, data).then(res => {
            toast.show("Datos Actualizados correctamente", {
                type: "success",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
            setAddress('')
            setFirstname('')
            setLastname('')
            setPhone('')
            setGender('')
            setProfession('')
            setIncomes('')

            navigation.replace('Home');
        }, err => {
            toast.show("Ocurrió un error al actualizar los datos", {
                type: "warning",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
        });
    }
    

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.bodyProfile}>

                <View style={styles.inputs}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Firstname" 
                    value={firstname}
                    onChangeText={setFirstname}
                />
            </View>

            <View style={styles.inputs}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Lastname" 
                    value={lastname}
                    onChangeText={setLastname}

                />
            </View>

            <View style={styles.inputs}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Address" 
                    value={address}
                    onChangeText={setAddress}
                />
            </View>

            <View style={styles.inputs}>
                <MaskInput 
                  style={styles.input} 
                  placeholder="Phone Number" 
                    value={phone}
                    onChangeText={setPhone}
                    mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
            </View>

            <View style={styles.inputs}>
                <SelectDropdown
                    buttonStyle={{backgroundColor: 'transparent', borderRadius: 25, width: '100%'}}
                    buttonTextStyle={{textAlign: 'left', color: '#9BA0A5'}}
                    dropdownStyle={{ borderBottomColor: '#000' }}
                    defaultButtonText={gender ? gender : 'Género'}
	                data={genders}
	                onSelect={(selectedItem, index) => {
	                	console.log(selectedItem, index)
                        setGender(selectedItem);
	                }}
	                buttonTextAfterSelection={(selectedItem, index) => {
	                	// text represented after item is selected
	                	// if data array is an array of objects then return selectedItem.property to render after item is selected
	                	return selectedItem
	                }}
	                rowTextForSelection={(item, index) => {
	                	// text represented for each item in dropdown
	                	// if data array is an array of objects then return item.property to represent item in dropdown
	                	return item
	                }}
                />
            </View>

            <View style={styles.inputs}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Profession"
                    value={profession}
                    onChangeText={setProfession}
                />
            </View>

            <View style={styles.inputs}>
                <TextInput 
                  style={styles.input} 
                  placeholder="Incomes"
                    value={incomes}
                    onChangeText={setIncomes}
                />
            </View>


            <View style={styles.checkout}>
                {
                    isEditing ?
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => onUpdate()}>
                        <Text style={styles.checkoutText}>Actualizar Cliente</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => onSave()}>
                        <Text style={styles.checkoutText}>Guardar Cliente</Text>
                    </TouchableOpacity> 
                }
                
            </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        height: '100%',
    },
    bodyProfile: {
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
    },
    inputs: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#fff',
        padding: 5,
        marginTop: 10,
        backgroundColor: '#E7E7E8',
        borderRadius: 25,
    },
    input: {
        flex: 1,
        padding: 10,
        color: '#9BA0A5',
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
    },
    datePickerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#fff',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#E7E7E8',
        borderRadius: 25,
    },
    buttonStyle: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        padding: 5,
        color: '#E5E5E5',
    },    
    checkout: {
        padding: 20,
      },
    checkoutButton: {
        backgroundColor: '#3498db',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#FFF',
        padding: 15,
        borderRadius: 25,
        marginTop: 10,
    },
    checkoutText: {
        color: '#FFF',
    },
});
