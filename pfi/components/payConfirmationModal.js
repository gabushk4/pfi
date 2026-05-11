import Colors from "@/constants/Colors"
import { useAccount } from "../contexts/account"
import { Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native"
import { typography } from "@/constants/typography"

export default function PayConfirmationModal({ visible, onClose }) {
    const { account } = useAccount()
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme || "light"]

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { borderColor: colors.tint, backgroundColor: colors.background, }]}>
                    <Text style={[typography.title, {color: colors.text, fontSize:20}]}>Paiement réussi !</Text>
                    <Text style={[typography.subtitle, { textAlign:'center', color: colors.text}]}>Votre facture a été envoyée à {account.email}</Text>
                    <TouchableOpacity
                        style={{ ...styles.closeBtn, backgroundColor: colors.tint }}
                        onPress={onClose}
                    >
                        <Text style={[typography.body, styles.textStyle]}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        borderWidth: 2,
        paddingVertical: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap:8 
    },
    closeBtn: {
        marginTop: 8,
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
});     