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
    <div id="bmodalContainer" ref={modalRef}>
      <div className="bmodalContent">
        <div className="bmodalTop">
          <div className="bmodalTopLeft">
            <div className="bmodalNumberofNights">{`Number Nights`}</div>
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
          <div className="bmodalLeftCalendarContainer">
            <div className="bmodalTopOfCalendar">TOP OF CALENDAR</div>
            <div className="bmodalActualCalendar">CALENDAR</div>
          </div>
          <div className="bmodalRightCalendarContainer">
            <div className="bmodalTopOfCalendar">TOP OF CALENDAR</div>
            <div className="bmodalActualCalendar">CALENDAR</div>
          </div>
        </div>
        <div className="bmodalBottom">
          <div className="bmodalBottomLeft">
            empty for now
          </div>
          <div className="bmodalBottomRight">
              <div className="bmodalClearDates">CLEAR DATES</div>
              <div className="bmodalCloseButton">CLOSE</div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default BModal;
