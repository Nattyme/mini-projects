import { useContext } from "react";
import { AppContext } from "./../../App/App";
import HeaderNav from "../../components/HeaderNav";
import WhitePlate from "../../components/WhitePlate";

const FormPage = () => {
  const { appState } = useContext(AppContext);
  
  const titlesData = appState?.pages?.formPage || {};
  const titleKey = Object.keys(titlesData).find((key)=> key === 'title'); // найдем поле заголовка
  const title = titleKey ? titlesData[titleKey] : null; // получаем знач-е

  return (
    <>
     <HeaderNav/>
     {title && <WhitePlate title={title}/>}
    </>
  );
}
 
export default FormPage;