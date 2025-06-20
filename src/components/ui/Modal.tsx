import React from "react";
import styles from "./Modal.module.css"

type ModalProps = {
    isOpen: Boolean;
    onClose : () => void;
    children : React.ReactNode; 
};

export const Modal: React.FC<ModalProps> = ({
    isOpen = false,
    onClose,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className = {styles.overlay} onClick = {onClose}>
            <div className = {styles.modal} onClick = {(e) => e.stopPropagation()} >
            <button className = {styles.closeButton} onClick = {onClose}>
                閉じる
            </button>
                {children}       
            </div>    
        </div>
    );
} 