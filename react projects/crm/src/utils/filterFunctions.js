export const doFilter = (subNav, data) => {
  console.log(data);
  console.log(subNav);
  
  return subNav === 'all' ? [...data] : [...data].filter(task => task.status === subNav);
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