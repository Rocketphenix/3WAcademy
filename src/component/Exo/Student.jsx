/* eslint-disable react/prop-types */
const Student = ({ student }) => {
	return (
		<>
			<li>
				{student.name} à obtenu{" "}
				{Math.floor(
					student.notes.reduce((acc, curr) => acc + curr, 0) /
						student.notes.length
				)}
				{/* acc = accumulation, curr = current (permet de calculer la moyenne)*/}
			</li>
		</>
	);
};

export default Student;
