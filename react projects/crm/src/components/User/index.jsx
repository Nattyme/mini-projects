import data from './../../data/data.json';
const userData = data.users;

const User = () => {
  const handleError = (e) => {
    e.target.onError = null;
    e.target.src = './img/avatars/defaultUserCover.svg';
  }
  
  return (
    userData.map((user) => {
      
      if (user.isAdmin === true) {
        return (
          <>
            <div className="left-panel__user-photo">
              <img src={ `./img/avatars/${user.cover}`} onError={handleError} alt="Avatar" />
            </div>
            <div className="left-panel__user-name">{user.name} <br />{user.secondName}</div>
          </> 
        )
      }
    })
   
  );
}
 
export default User;