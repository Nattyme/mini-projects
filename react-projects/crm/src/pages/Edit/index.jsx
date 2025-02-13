import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import EditForm from "../../components/EditForm";
import Title from "../../components/Title";
import Loader from "../../components/Loader";
import { AppContext } from "../../App/App";

const EditPage = () => {
  const { id } = useParams();
  const { appState } = useContext(AppContext);
  const { formState, setFormState } = useContext(AppContext);
  const titlesData = appState.pages.editPage || {};
  const title = appState?.data?.length && titlesData?.title;


  return (
    <div className="form-wrapper">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <Title title={title} />
          </div>
          <div className="col text-right">
            <Link className="btn btn-link" to="/tasks" title="Вернуться назад">
              Вернуться назад
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            {appState.data ? <EditForm id={id}/> : <Loader/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
