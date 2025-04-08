import { StyleSheet } from "react-native";

export const authForm = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    welcome: {
        fontSize: 32,
        fontWeight: 'semibold',
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: 20,
        color: 'rgba(0,0,0,0.3)'
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        borderRadius: 5,
        marginTop: 30
    },
    heading: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: 'orange',
        marginBottom: 20
    },
    formFields: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop: 15
    },
    link: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'semibold',
        marginTop: 10
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 15
    },
    btnText: {
        textAlign: 'center',
    }

})