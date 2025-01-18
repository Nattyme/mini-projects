const Select = ({name, className, id}) => {
	return (
		<select id={id} name={name} className={className}>
			<option value="course-html">Курс по верстке</option>
			<option value="course-js">Курс по JavaScript</option>
			<option value="course-vue">Курс по VUE JS</option>
			<option value="course-php">Курс по PHP</option>
			<option value="course-wordpress">Курс по WordPress</option>
		</select>
	);
}

export default Select;