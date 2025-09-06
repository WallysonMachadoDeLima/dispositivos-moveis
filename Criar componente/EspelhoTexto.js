import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const EspelhoTexto = ({ placeholder, label = 'Você digitou:' }) => {
    const [texto, setTexto] = useState('');

    const limpar = () => setTexto('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={texto}
                onChangeText={setTexto}
                placeholder={placeholder}
            />
            {texto ? (
                <Text style={styles.texto}>{label + ' ' + texto}</Text>
            ) : (
                <Text style={styles.textoVazio}>Nada digitado ainda..</Text>
            )}
            <View style={styles.botaoContainer}>
                <Button title="Limpar" onPress={limpar} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    texto: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        fontWeight: '500',
    },
    textoVazio: {
        fontSize: 16,
        color: '#999',
        fontStyle: 'italic',
        marginBottom: 15,
    },
    botaoContainer: {
        marginTop: 5,
    },
});

export default EspelhoTexto;
