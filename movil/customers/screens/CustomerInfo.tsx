import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView , Image, Alert} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootStackParamList, RootStackScreenProps } from '../types';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'
import MaskInput from 'react-native-mask-input';
import { useToast } from "react-native-toast-notifications";
import CustomerService from '../services/CustomerService';

export default function CustomerInfo({ route, navigation }: RootStackScreenProps<'CustomerInfo'>) {
    const { customerId } = route.params;
    const toast = useToast();
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        getCustomer()
    }, [])

    const getCustomer = async () => {
        CustomerService.getById(customerId).then(res => {
            setCustomerInfo(res.data)
        });
    }

    const onDelete = (id: number) => {
        Alert.alert(
            "Eliminar",
            "¿Estás seguro de eliminar este registro?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => deleteCustomer(id) }
            ]
          );
    }

    const deleteCustomer = async (id: number) => {
        CustomerService.deleteCustomer(id).then(res => {
            toast.show("Datos eliminados correctamente", {
                type: "success",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
            navigation.navigate('Home')
        }, err => {
            toast.show("Error al eliminar los datos", {
                type: "danger",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
              });
        });
    }

    return(
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.form}>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Nombre</Text>
                    <Text style={styles.formInfo}>{customerInfo?.firstName}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Apellido</Text>
                    <Text style={styles.formInfo}>{customerInfo?.lastName}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Teléfono</Text>
                    <Text style={styles.formInfo}>{customerInfo?.cellPhone}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Dirección</Text>
                    <Text style={styles.formInfo}>{customerInfo?.address}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Género</Text>
                    <Text style={styles.formInfo}>{customerInfo?.gender}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Incomes</Text>
                    <Text style={styles.formInfo}>{customerInfo?.incomes}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Profesión</Text>
                    <Text style={styles.formInfo}>{customerInfo?.profession}</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate('Customer', { customerId: customerInfo?.id })}>
                        <Text style={styles.actionButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(customerInfo?.id)}>
                        <Text style={styles.actionButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        height: '100%',
    },
    form: {
        padding: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 16,
        color: '#9BA0A5',
    },
    formInfo: {
        fontSize: 16,
        color: '#4A4A4A',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonEdit: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    buttonDelete: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
});