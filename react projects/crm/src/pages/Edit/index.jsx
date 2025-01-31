import { useContext } from 'react';
import {Link, useParams} from 'react-router-dom';
import Button from "../../components/Button";
import Card from "../../components/Card";
import Title from '../../components/Title';
import Loader from '../../components/Loader';
import { AppContext } from '../../App/App';


const EditPage = () => {
  const {id} = useParams();
  const { appState } = useContext(AppContext);
  const titlesData = appState.pages.editPage || {};
  
  const title = appState?.data?.length && titlesData?.title;
  
  return (
    <div className="form-wrapper">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <Title title={title}/>
          </div>
          <div className="col text-right">
            <Link className="btn btn-link" to="/tasks" title="Вернуться назад">Вернуться назад</Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form id="form" action="edit.html" method="POST">
                {appState.loading ? <Loader/> : appState && <Card id={id}/>}
              <div className="row justify-content-between form__buttons">
                <div className="col text-right">
                  <Button
                    className="btn btn-primary"
                    text="Сохранить изменения"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
