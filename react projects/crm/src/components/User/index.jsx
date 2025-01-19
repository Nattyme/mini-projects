import data from './../../data/data.json';
const userData = data.users;

const User = () => {
  const handleError = (e) => {
    e.target.onError = null;
    e.target.src = './img/avatars/defaultUserCover.svg';
  }
  
  return (
    <>
      <div className="left-panel__user-photo">
        <img src={ `./img/avatars/${userData.cover}`} onError={handleError} alt="Avatar" />
      </div>
      <div className="left-panel__user-name">{userData.name} <br />{userData.secondName}</div>
    </>
  );
}
 
export default User;