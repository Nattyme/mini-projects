import { useContext } from "react";
import { AppContext } from "./../../App/App";
import HeaderNav from "../../components/HeaderNav";
import WhitePlate from "../../components/WhitePlate";

const FormPage = () => {
  const { appState } = useContext(AppContext);
  const titlesData = appState.pages.formPage || {};
  
  const title = appState?.data?.length && titlesData?.title;

  return (
    <>
     <HeaderNav/>
     <WhitePlate title={title}/>
    </>
  );
}
 
export default FormPage;