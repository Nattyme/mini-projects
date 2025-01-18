import Label from '../Label';
import Input from './../Input';
import FormGroup from './../FormGroup';
import Select from '../Select';
import Button from '../Button';

const Form = () => {
  return (
    <form id="form" method="POST" action="">
      <Label htmlFor = 'full_name' text = 'Ваши данные:'/>
      <FormGroup>
          <Input 
            type = "text"
            name = "full_name"
            placeholder = "Имя и Фамилия"
            id = {"full_name"}
            required
          />
      </FormGroup>
      <FormGroup>
          <Input 
            type = "text"
            name = "phone"
            placeholder = "Телефон"
            id = {"phone"}
            required = ''
          />
      </FormGroup>
      <FormGroup>
          <Input 
            type = "email"
            name = "email"
            placeholder = "Email"
            id = {"email"}
            required 
          />
      </FormGroup>
      <FormGroup>
          <Label htmlFor = 'product' text = 'Продукт:'/>
          <Select 
            name='product'
            className='form-control'
            id='product'
          />
      </FormGroup>
      <FormGroup id='noteWrapper'>
          <Button text='Оформить заявку' className='btn btn-lg btn-primary btn-block'/>
      </FormGroup>

  	</form>
  );
}
 
export default Form;