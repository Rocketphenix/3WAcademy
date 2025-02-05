import PropTypes from "prop-types"; // Permet de valider les Props
import Student from "./Student.jsx";

const Students = ({ students }) => {
	return (
		<ul>
			{students.map((student, i) => (
				<Student key={i} student={student} />
			))}
		</ul>
	);
};

// Validation des props
Students.propTypes = {
	students: PropTypes.arrayOf(PropTypes.object).isRequired, // Un tableau d'objets requis
};

export default Students;
