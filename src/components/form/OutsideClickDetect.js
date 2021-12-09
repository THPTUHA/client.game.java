import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";


const useOutsideAlerter = (ref ,outsideFunc) => {
	useEffect(() => {
	
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				if (outsideFunc) {
					outsideFunc();
				}
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}



const OutsideClickDetect = (props) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, props.outsideFunc);

	return <div {...props} ref={wrapperRef} />;
}

export default OutsideClickDetect;