import { validar } from "@/api/app/auth";
import ConfirmActionComponent from "@/components/ConfirmOverlay";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useError } from "./ErrorProvider";

type ConfirmationContextType = {
    isVisible: boolean;
    isLoading: boolean;
    password: string;
    error: string | null;
    showConfirmation: (title: string, onConfirm: () => Promise<void>) => void;
    hideConfirmation: () => void;
    setPassword: (password: string) => void;
    setError: (error: string | null) => void;
};

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [onConfirmCallback, setOnConfirmCallback] = useState<() => Promise<void>>(() => Promise.resolve());

    const showConfirmation = (title: string, onConfirm: () => Promise<void>) => {
        setTitle(title);
        setOnConfirmCallback(() => onConfirm);
        setIsVisible(true);
    };

    const hideConfirmation = () => {
        setIsVisible(false);
        setPassword("");
        setError(null);
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await validar({ SENHA: password })
            await onConfirmCallback();
            hideConfirmation();
        } catch (err) {
            setError("Ocorreu um erro ao confirmar a ação.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ConfirmationContext.Provider
            value={{
                isVisible,
                isLoading,
                password,
                error,
                showConfirmation,
                hideConfirmation,
                setPassword,
                setError,
            }}
        >
            {children}
            <ConfirmActionComponent
                title={title}
                onClose={hideConfirmation}
                onConfirm={handleConfirm}
                confirmButtonLabel="Confirmar"
                onCancel={hideConfirmation}
                cancelButtonLabel="Cancelar"
                visible={isVisible}
                onPasswordChange={setPassword}
                isLoading={isLoading}
            />
        </ConfirmationContext.Provider>
    );
};

export const useConfirmation = () => {
    const context = useContext(ConfirmationContext);
    if (!context) throw new Error("useConfirmation deve ser usado dentro do ConfirmationProvider");
    return context;
};