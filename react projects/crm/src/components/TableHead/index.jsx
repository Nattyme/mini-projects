/**
 * Компонент TableHead.
 * Отображает заголовки таблицы.
 * Принимает список заголовков, который отображается в первой строке таблицы.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Array} props.headers - Массив строк, представляющих заголовки для таблицы.
 * 
 * @returns {JSX.Element} Разметка для заголовков таблицы.
*/

const TableHead = ({headers}) => {

	return (
		<thead>
			<tr>
				{headers.map( (header) => {
				return(<th key={header}>{header}</th>);
				})}
			</tr>
		</thead>
	);
}

export default TableHead;