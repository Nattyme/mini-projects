import { useState, useContext, useEffect } from "react";
import getRandomArrayData from "../../utils/calcFunctions";
import { prepareDisplayData } from "../../utils/prepareDisplayData";
import { serverPath } from "../../helpers/variables";
import { AppContext} from "./../../App/App";
import HeaderNav from "../../components/HeaderNav";
import WhitePlate from "../../components/WhitePlate";
import Loader from "../../components/Loader";

const FormPage = () => {
  const { appState } = useContext(AppContext);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    fetch(serverPath + "testData")
      .then((res) => res.json())
      .then((data) => {
        const randomData = getRandomArrayData(data);
        const { prepareDisplayFormData } = prepareDisplayData();
        const formNewData = prepareDisplayFormData(randomData);

        // update formData and initialFormData
        setFormState((prevState) => ({
          ...prevState,
          formData: formNewData,
          initialFormData: formNewData,
          loading: false
        }));
      })
      .catch((error) => {
        setFormState((prevState) => ({
          ...prevState,
          error: error,
          loading: false,
        }));
      });
  }, [appState.data]);

 
  const titlesData = appState?.pages?.formPage || {};
  const titleKey = Object.keys(titlesData).find((key)=> key === 'title'); // найдем поле заголовка
  const title = titleKey ? titlesData[titleKey] : null; // получаем знач-е

  return (
    <>
     <HeaderNav/>
     {title && formState?.formData  ? <WhitePlate title={title} formState={formState}/> : <Loader/>}
    </>
  );
}
 
export default FormPage;