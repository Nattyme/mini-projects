import Input from './../Input/Input';
import Button from './../Button/Button';

const Form = (props) => {
  // Render all buttons to page`
  const renderButtons = props.buttons.map( (button) => {
    return  <Button
          id = {button.id}
          key = {button.id}
          type = {button.type}
          classNames = {button.classNames}
          text = {button.text}
        />
  });
  
  // Render inputs to page
  const renderInput = props.input.map( (input) => {
    console.log(props);
    
    return (
      <Input
        id = {input.id}
        key = {input.id}
        classNames = {input.classNames}
        value = {props.term}
        disabled = {input.disabled}
      />
    )
  });

  const clickedButton = (e) => {
    let newValue;
console.log(props.term);

    switch (e.target.id) {
      case 'btnMinus' :
        newValue = props.term > 0 ? props.term - 1 : 0;
        break;
      case 'btnPlus' : 
        newValue = props.term + 1;
        break;
      case 'btnReset' : 
        newValue = 0;
        break;
    }

    props.changeTerm(newValue);

    // if (e.target.id === 'btnMinus') {
    //   newValue = props.term > 0 ? props.term - 1 : 0;
    //   props.changeTerm(newValue);
    // }
    // if (e.target.id === 'btnPlus') {
    //   newValue = props.term + 1;
    //   props.changeTerm(newValue);
    // }

    // if (e.target.id === 'btnReset') {
    //   newValue = 0;
    //   props.changeTerm(newValue);
    // }
  }

  return (
    <form>
			{renderInput}

			<div onClick = {(e) => {clickedButton(e)}} className="btn-group" role="group" aria-label="Basic example">
				{renderButtons}
			</div>
		</form>
  )
}

export default Form;