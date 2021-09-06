import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

function Modal ({onClose, alt, src}) {

  useEffect(() => {
    console.log('mount');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('unmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return createPortal(
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <img src={src} alt={alt} width="1000"/>
        </div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Modal;