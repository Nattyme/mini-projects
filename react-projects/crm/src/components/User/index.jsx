/**
 * Компонент User.
 * Отображает информацию о пользователе, включая фотографию и имя.
 * Если изображение пользователя не загрузилось, отображается изображение по умолчанию.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Object} props.user - Объект с данными пользователя.
 * @param {string} props.user.cover - Имя файла изображения пользователя.
 * @param {string} props.user.name - Имя пользователя.
 * @param {string} props.user.secondName - Фамилия пользователя.
 * 
 * @returns {JSX.Element} Разметка для отображения фотографии и имени пользователя.
*/
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
