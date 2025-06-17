import { useError } from "@/providers/ErrorProvider";
import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

const ErrorOverlay = () => {
  const { error, type } = useError(); // Agora também pegamos o `type` do contexto

  // Define o ícone e a cor com base no tipo de mensagem
  const iconName = type === "success" ? "check-circle-outline" : "error-outline";
  const backgroundColor = type === "success" ? "#4CAF50" : "#ff3b2f"; // Verde para sucesso, vermelho para erro

  return (
    <Modal visible={!!error} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor }]}>
          <IconSymbol
            size={20}
            library="material"
            name={iconName}
            color="white"
          />
          <Text style={styles.text}>{error}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Fundo levemente escuro
  },
  container: {
    gap: 10,
    width: "90%",
    flexDirection: "row",
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    alignItems: "center", // Centraliza os itens verticalmente
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ErrorOverlay;