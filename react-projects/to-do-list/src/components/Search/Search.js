import Input from  './../Inputs/Input';

const Search = (props) => {
	return (
    <Input value={props.term} onchange = {(e)=>{props.changeTerm(e.target.value)}} placeholder='введите фразу для поиска'/>
	)

}

export default Search;