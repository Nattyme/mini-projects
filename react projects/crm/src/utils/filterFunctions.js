// Ф-ция фильтрует задачи по статусу и продукту
export const doFilter = (type, filterBy, data) => {

  if (type === 'subNav') {   
    return filterBy === 'all' ? [...data] : [...data].filter(task => task.status === filterBy);
  }

  if (type === 'select') {
    return  filterBy.trim() === '' ? [...data] : [...data].filter(task => task.product === filterBy);
  }
}

// Ф-ция отслеживает клик по subNav и выделяет активное меню
export const clickedSubNav = (e, setAppState) => {
  const navList = e.target.closest('ul');

  if (navList) {
    const navItems = navList.querySelectorAll('a');
    navItems.forEach(item => item.classList.remove('active'))
  }
  
  e.target.classList.add('active');
  const selectedSubNav = e.target.dataset.value;

  setAppState((prev) => ({
      ...prev,
      subNav: selectedSubNav,
  }));
}