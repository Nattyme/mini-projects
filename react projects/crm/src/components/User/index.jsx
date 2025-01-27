const User = ({user}) => {
  
  const handleError = (e) => {
    e.target.onerror = null; // Исправлено: регистр события
    e.target.src = './img/avatars/defaultUserCover.svg';
  };

  return ( 
    <>
      <div className="left-panel__user-photo">
        <img
          src={`./img/avatars/${user.cover}`}
          onError={handleError}
          alt="avatar"
        />
      </div>
      <div className="left-panel__user-name">
        {user.name} <br />
        {user.secondName}
      </div>
    </>
  );
};

export default User;
