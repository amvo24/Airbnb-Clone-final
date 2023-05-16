import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './BookingModal.css';


const ModalContext = React.createContext();

export function BookingModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function BookingModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="bookingmodal">
      <div id="booking_modal-background" onClick={onClose} />
      <div id="booking_modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
