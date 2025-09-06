import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';

const ModalComponent = ({ 
  visible, 
  onClose, 
  title,
  children,
  animationType = 'slide',
  transparent = true,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  showButtons = true,
  ...props 
}) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          
          <View style={styles.content}>
            {children}
          </View>
          
          {showButtons && (
            <View style={styles.buttonContainer}>
              {onCancel && (
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              
              {onConfirm && (
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton]} 
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    maxWidth: '90%',
    minWidth: '80%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ModalComponent;
