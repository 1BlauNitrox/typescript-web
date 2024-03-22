const nav = document.getElementById('navigation');
window.onscroll = function() {navScroll()};

const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const collapsedNav = document.getElementById('navigation-collapsed');

function toggle() {
    if(menu.classList.contains("active")) {
        collapsedNav.classList.remove("active");
        menu.classList.remove("active");
        setTimeout(() => {
            menuOpen.style.display = 'block';
            menuClose.style.display = 'none';
        }, 350);
    }else {
        collapsedNav.classList.add("active");
        menu.classList.add("active");
        setTimeout(() => {
            menuOpen.style.display = 'none';
            menuClose.style.display = 'block';
        }, 350);
    }
}


function navScroll() {
    if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
        nav.classList.add('scroll');
    } else {
        nav.classList.remove('scroll');
    }
}

function checkResize() {
    var w = window.innerWidth;
    if(w > 1367) {
        collapsedNav.classList.remove("active");
        menu.classList.remove("active");
        menuOpen.style.display = 'block';
        menuClose.style.display = 'none';
    }
}

function smoothScroll(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
  
    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
  }



  /**  Profile Image  **/
  /*function displayLink(link) {
      alert("diaplay: " + link);
    return link;
  }

  function httpGetAsync(url, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
  }


  function generateProfileImage(letter) {
    let color = getRandomColor();
    console.log("http://127.0.0.1:8080/api/v1/image/generate?initial=" + letter + "&color=" + color);
    alert(httpGetAsync("http://127.0.0.1:8080/api/v1/image/generate?initial=" + letter + "&color=" + color, displayLink));
  }*/
  function generateProfileImage(letter, callback) {
    const xmlHttp = new XMLHttpRequest();
    let color = getRandomColor();
    const url = 'http://127.0.0.1:8080/api/v1/image/generate?initial=' + letter + '&color=' + color;
    xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url);
    xmlHttp.send();
  }

  /**  Random Color Generator  **/
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }