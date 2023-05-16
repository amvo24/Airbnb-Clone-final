import React, { useEffect, useRef } from "react";
import "./Bmodal.css";

function BModal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div id="bmodal" ref={modalRef}>
      <div>Modal</div>
    </div>
  );
}

export default BModal;
