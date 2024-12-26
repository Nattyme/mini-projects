import Input from './../Input/Input';
import Button from './../Button/Button';

const Form = () => {
  const buttons = [
    {
      id : 'btnMinus',
      type : 'button',
      classNames : 'btn btn-outline-primary',
      text : 'Minus'
    },
    {
      id : 'btnReset',
      type : 'button',
      classNames : 'btn btn-outline-primary',
      text : 'Reset'
    },
    {
      id : 'btnPlus',
      type : 'button',
      classNames : 'btn btn-outline-primary',
      text : 'Plus'
    }
  ];
  
  const inputs = [
    {
      id : 'input',
      type : 'number',
      classNames : 'form-control mb-3',
      value : '0',
      disabled : 'disabled',
    }
  ];
  
  // Render all buttons to page`
  const renderButtons = buttons.map( (button) => {
    return  <Button
          id = { button.id}
          type = {button.type}
          classNames = {button.classNames}
          text = {button.text}
        />
  });
  
  // Render inputs to page
  const renderInput = inputs.map ( (input) => {
    return (
      <Input
        id = {input.id}
        classNames = {input.classNames}
        value = {input.value}
        disabled = {input.disabled}
      />
    )
  });

  return (
    <form>
			{renderInput}

			<div className="btn-group" role="group" aria-label="Basic example">
				{renderButtons}
			</div>
		</form>
  )
}

export default Form;