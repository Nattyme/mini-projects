const Label = ({htmlFor, text}) => {
  console.log(htmlFor);
  
  return (
    <label htmlFor ={htmlFor}>{text}</label>
  );
}
 
export default Label;