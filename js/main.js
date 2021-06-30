// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCk82qZzODzDfoquxyzKLn3v7tbqj3J8hk",
    authDomain: "pikadu-f8c17.firebaseapp.com",
    projectId: "pikadu-f8c17",
    storageBucket: "pikadu-f8c17.appspot.com",
    messagingSenderId: "207784881358",
    appId: "1:207784881358:web:53c8d42f8bf0f5a262f49f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const loginForget = document.querySelector('.login-forget');

const DEFAULT_PHOTO = userAvatarElem.src;

// const listUsers = [
//   {
//     id: '01',
//     email: 'mm@m.ru',
//     password: '123',
//     displayName: 'MM',
//     photo:'https://images.wallpaperscraft.ru/image/poberezhe_gorod_zdaniia_162592_1600x1200.jpg'
//   },
//   {
//     id: '02',
//     email: 'kk@m.ru',
//     password: '1234',
//     displayName: 'KK',
//     photo:'https://images.wallpaperscraft.ru/image/poberezhe_gorod_zdaniia_162592_1600x1200.jpg'
//   },
// ];

const setUsers = {
  user: null,
  initUser(handler){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) handler();
    })
  },
  logIn( email, password ){
    if (!regExpValidEmail.test(email)) {
      alert('Мыло не валидно!');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch( err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/wrong-password'){
          console.log(errMessage);
          alert('Неверный пароль');
        } else if (errCode === 'auth/user-not-found'){
          console.log(errMessage);
          alert('Пользователь не найден')
        } else {
          alert(errMessage);
        }
        console.log(err);
      })
      // handler();
    // const user = this.getUser(email);
    // if (user && user.password === password){
    //   this.autorizedUser(user);
    //   handler();
    // } else {
    //   alert('Пользователь не найден');
    // }
    
  },
  logOut(){
    // this.user = null;
    firebase.auth().signOut()
    // handler();
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

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.editUser(email.substring(0, email.indexOf('@')), null, handler)
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/weak-password'){
          console.log(errMessage);
          alert('Слабый пароль');
        } else if (errCode === 'auth/email-already-in-use'){
          console.log(errMessage);
          alert('Это мыло уже используется')
        } else {
          alert(errMessage);
        }
      });

    // код без фаербайс для новых пользователей  
    // if(!this.getUser(email)){
    //   const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
    //   listUsers.push(user);
    //   this.autorizedUser(user)
    //   handler();
    // } else {
    //   alert('Пользователь с таким мылом уже зарегистрирован')
    // }
    
  },
  editUser(displayName, photoURL, handler){

    const user = firebase.auth().currentUser

    if(displayName){
      if(photoURL){
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },
  // getUser(email){
  //   return listUsers.find(item => item.email === email)
  // },
  // autorizedUser(user){ 
  //   this.user = user;
  // },
  sendForget(email){
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => alert('Письмо отправлено'))
      .catch(err => {
        console.log(err)
      })
  }
}

const setPosts = {
  allPosts:[],
  addPost(title, text, tags , handler){
    const user = firebase.auth().currentUser;
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title, 
      text,
      tags: tags.split(',').map(item => item.trim()),
      author : {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL, 
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })
    firebase.database().ref('post').set(this.allPosts)
      .then(() => this.getPosts(handler))
  },
  getPosts(handler){
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [] ;
      handler();
    })
  }
}

const toggleAuthDom = () => {
  const user =  setUsers.user;

  if (user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    sidebarNav.style.display = 'block';
    btnNewpost.style.display = 'flex';
    userName.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    sidebarNav.style.display = 'none';
    btnNewpost.style.display = '';
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPosts.forEach(item => {
    postsHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${item.title}</h2>
        <p class="post-text">${item.text} </p>
        <div class="tags">${item.tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
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
            <a href="#" class="author-username">${item.author.displayName}</a>
            <span class="post-time">${item.date}</span>
          </div>
          <a href="#" class="author-link"><img src=${item.author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
        </div>
        <!-- /.post-author -->
      </div>
      <!-- /.post-footer -->
    </section>
  ` 
  })

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
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
    setUsers.logIn(emailInput.value, passwordInput.value);
    loginForm.reset();
  })
  
  loginSingup.addEventListener('click', (e) => {
    e.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  })
  
  exitElem.addEventListener('click', (e) => {
    e.preventDefault();
    setUsers.logOut();
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

  buttonNewPost.addEventListener('click', e => {
    e.preventDefault;
    showAddPost();
  })

  addPostElem.addEventListener('submit', e => {
    e.preventDefault();
    // const formElements = [...addPostElem.elements].filter(elem => elem.tagName !== 'BUTTON');
    const { title, text, tags } = addPostElem.elements;
    console.log(title, text, tags);
    
    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return
    }

    if (text.value.length < 100) {
      alert('Слишком короткий пост');
      return
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  loginForget.addEventListener('click', e => {
    e.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
  })

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
}

document.addEventListener('DOMContentLoaded', init )


