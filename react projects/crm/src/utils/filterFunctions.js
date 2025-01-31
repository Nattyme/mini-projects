export const doFilter = (type='all', filterBy, data) => {
  console.log(type);
  console.log(filterBy);
  console.log(data);
  
  if (type === 'subNav') {
    console.log([...data]);
    console.log([...data].filter(task => task.status === filterBy));
    
    return filterBy === 'all' ? [...data] : [...data].filter(task => task.status === filterBy);
  }

  if (type === 'select') {
    console.log([...data]);
    console.log([...data].filter(task => task.product === filterBy));
    return  filterBy.trim() === '' ? [...data] : [...data].filter(task => task.product === filterBy);
  }

  if (type === 'default') {
    return [...data];
  }
}



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