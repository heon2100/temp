/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);


  toggle.addEventListener('click', () =>{

    // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon');


    // Add show-menu class to nav menu
      nav.classList.toggle('show-menu');


  })
}

showMenu('nav-toggle','nav-menu')