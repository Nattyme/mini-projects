const Form = (props) => {

  return (
    <form>
			{props.renderInput}

			<div onClick = {(e) => {props.clickedButton(e)}} className="btn-group" role="group" aria-label="Basic example">
				{props.renderButtons}
			</div>
		</form>
  )
}

export default Form;