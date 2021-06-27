// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSingup = document.querySelector('.login-singup');

const userElem = document.querySelector('.user');
const userName = document.querySelector('.user-name');
const sidebarNav = document.querySelector('.sidebar-nav ');
const btnNewpost = document.querySelector('.button-new-post');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.link-edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

const listUsers = [
  {
    id: '01',
    email: 'mm@m.ru',
    password: '123',
    displayName: 'MM'
  },
  {
    id: '02',
    email: 'kk@m.ru',
    password: '1234',
    displayName: 'KK'
  },
];

const setUsers = {
  user: null,
  logIn( email, password, handler ){
    if (!regExpValidEmail.test(email)) {
      alert('Мыло не валидно!');
      return;
    }
    const user = this.getUser(email);
    if (user && user.password === password){
      this.autorizedUser(user);
      handler();
    } else {
      alert('Пользователь не найден');
    }
    
  },
  logOut( handler){
    this.user = null;
    handler();
  },
  signUp( email, password, handler ){
    if (!regExpValidEmail.test(email)) {
      alert('Мыло не валидно!');
      return;
    }
    if( !email.trim() || !password.trim() ){
      alert('Введите данные');
      return;
    }
    if(!this.getUser(email)){
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.autorizedUser(user)
      handler();
    } else {
      alert('Пользователь с таким мылом уже зарегистрирован')
    }
    
  },
  editUser(userName, userPhoto, handler){
    if(userName){
      this.user.displayName = userName;
    }
    if(userPhoto){
      this.user.photo = userPhoto;
    }
    handler();
  },
  getUser(email){
    return listUsers.find(item => item.email === email)
  },
  autorizedUser(user){ 
    this.user = user;
  },
}

const setPosts = {
  allPosts:[
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags:['свежее', 'новое','горячее', 'мое', 'случайность'],
      author: 'mm@mm.ru',
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 7
    },
    {
      title: 'Заголовок поста 2',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags:['свежее', 'новое','горячее', 'мое', 'случайность'],
      author: 'kk@mm.ru',
      date: '10.11.2020, 20:54:00',
      like: 20,
      comments: 11
      }
  ]
}

const toggleAuthDom = () => {
  const user =  setUsers.user;
  if (user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    sidebarNav.style.display = 'block';
    btnNewpost.style.display = 'flex';
    userName.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    sidebarNav.style.display = 'none';
    btnNewpost.style.display = '';
  }
};



const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(item => {
    postsHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${item.title}</h2>
        <p class="post-text">${item.text} </p>
        <div class="tags">
          <a href="#" class="tag">#свежее</a>
        </div>
        <!-- /.tags -->
      </div>
      <!-- /.post-body -->
      <div class="post-footer">
        <div class="post-buttons">
          <button class="post-button likes">
            <svg width="19" height="20" class="icon icon-like">
              <use xlink:href="img/icons.svg#like"></use>
            </svg>
            <span class="likes-counter">${item.like}</span>
          </button>
          <button class="post-button comments">
            <svg width="21" height="21" class="icon icon-comment">
              <use xlink:href="img/icons.svg#comment"></use>
            </svg>
            <span class="comments-counter">${item.comments}</span>
          </button>
          <button class="post-button save">
            <svg width="19" height="19" class="icon icon-save">
              <use xlink:href="img/icons.svg#save"></use>
            </svg>
          </button>
          <button class="post-button share">
            <svg width="17" height="19" class="icon icon-share">
              <use xlink:href="img/icons.svg#share"></use>
            </svg>
          </button>
        </div>
        <!-- /.post-buttons -->
        <div class="post-author">
          <div class="author-about">
            <a href="#" class="author-username">${item.author}</a>
            <span class="post-time">5 минут назад</span>
          </div>
          <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
        </div>
        <!-- /.post-author -->
      </div>
      <!-- /.post-footer -->
    </section>
  ` 
  })

  postsWrapper.innerHTML = postsHTML
}

const init = () => {
  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  })
  
  loginSingup.addEventListener('click', (e) => {
    e.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  })
  
  exitElem.addEventListener('click', (e) => {
    e.preventDefault();
    setUsers.logOut(toggleAuthDom);
  })
  
  editElem.addEventListener('click', (e) => {
    e.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  })
  
  
  editContainer.addEventListener('submit', e =>{
    e.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  })

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', init )


