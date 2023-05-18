import React, { useEffect, useRef } from "react";
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import "react-multi-date-picker/styles/colors/red.css"
import "./Bmodal.css";

function BModal({ onClose, onStartDateChange, onEndDateChange }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleStartDateSelection = (date) => {
      onStartDateChange(date);
    };

    const handleEndDateSelection = (date) => {
      onEndDateChange(date);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div id="bmodalContainer" ref={modalRef}>
      <div className="bmodalContent">
        <div className="bmodalTop">
          <div className="bmodalTopLeft">
            <div className="bmodalNumberofNights">{`2 nights`}</div>
            <div className="bmodalDatesRange">Jun 20, 2023 - Jun 22, 2023</div>
          </div>
          <div className="bmodalTopRight">
            <div className="bModalInnOutBar">
              <div className="bmodalCheckinContainer">CHECK-IN</div>
              <div className="bmodalCheckoutContainer">CHECKOUT</div>
            </div>
          </div>
        </div>
        <div className="bmodalMainCalendarContainer">
          <Calendar
            numberOfMonths={2}
            className="red"
            
          />
        </div>
        <div className="bmodalBottom">
          <div className="bmodalBottomLeft">
          </div>
          <div className="bmodalBottomRight">
              <button className="bmodalClearDates">Clear dates</button>
              <button className="bmodalCloseButton">
                <div className='bmodalCloseButtonText'>Close</div>
              </button>
          </div>
        </div>
      </div>
      </div>
  );
}

export default BModal;
