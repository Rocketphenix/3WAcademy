/* eslint-disable react/prop-types */
const BtnCalc = ({ handleClick, info }) => {
	return <button onClick={handleClick}>{info}</button>;
};

export default BtnCalc;
