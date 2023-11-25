import { Clickclose, ModalContent } from './Modal.styled';
import { useEffect } from 'react';

import React from 'react';

const Modal = ({ onClose, currentImageUrl, currentImageDescription }) => {
  useEffect(() => {
    const handleEsc = e => {
      e.code === 'Escape' && onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  });

  return (
    <Clickclose onClick={onClose} onClose={onClose}>
      <ModalContent>
        <img src={currentImageUrl} alt={currentImageDescription} />
      </ModalContent>
    </Clickclose>
  );
};

export default Modal;
