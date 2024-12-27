import Button from './../Button/Button';
import Input from './../Input/Input';

const Form = (props) => {
  
  return (
    <form>
      {props.inputs.map( (input) => {
          return (
            <Input
              key = {input.id}
              input = {input}
              term = {props.term}
            />
          );
      })}

			<div onClick = {(e) => {props.clickedButton(e)}} className="btn-group" role="group" aria-label="Basic example">
          {props.buttons.map( (button) => {
              return  (
                      <Button
                        key = {button.id}
                        button = {button}
                      />
              );
          })}
			</div>
		</form>
  )
}

export default Form;