import React, { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import Post from './components/Post';
// import './App.css';

function App() {
  const [text, setText] = useState('');
  const inputHandler = (event) => setText(event.target.value);

  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [countTen, setСountTen] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState('');

  const [userName, setUserName] = useState('');
  const [postsArray, setPostsArray] = useState([]);
  const postTitleHandler = (event) => setPostTitle(event.target.value);
  const postTextHandler = (event) => setPostText(event.target.value);
  const countTenHandler = (event) => setСountTen(event.target.value);
  const isUserLoggedInHandler = (event) => setIsUserLoggedIn(event.target.value);

  let responseMessage = '';

  

// используем useEffect, чтобы автоматически загружались посты при загрузке страницы
  useEffect(() => {
    fetchGetAllPosts();
  }, []);

  // ADD ONE USER
  async function fetchAddUser(payload) {
    const URL = 'http://localhost:4444/auth/register';
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': 'origin-list',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    return data;
  }

  const registerButtonHandler = async ()  => {
    let aaa = await fetchAddUser({
      // "email": "user03@ya.ru",
      "email": `${text}@ya.ru`,
      "password": "12345",
      "fullName": text,
      "avatarUrl": "https://www.youtube.com/watch?v=GQ_pTmcXNrQ,m .m,nb;lk ;m"
    });

    setUserName(aaa.fullName);
  }

  async function fetchGetAllPosts() {
    const URL = 'http://localhost:4444/posts';
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': 'origin-list',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
      },
      // body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log('data +++++++++++++++++: ', data);

    setPostsArray([...data]);
    // console.log('postsArray after pushing', postsArray);

    // return data;
  }

  const getAllPostsButtonHandler = async ()  => {
    fetchGetAllPosts();
  }

  const addPostButtonHandler = async ()  => {
    console.log('add post button was pushed');

    // let aaa = await fetchAddPost({title: postTitle, text: postText});
    // await fetchAddPost({title: postTitle, text: postText, countTen: Number(countTen), isUserLoggedIn: isUserLoggedIn});
    const data = await fetchAddPost({title: postTitle, text: postText, countTen: Number(countTen), isUserLoggedIn: !isUserLoggedIn});
    // console.log('*****data from add post: ', data);
    console.log('*****data.message: ', data.message);
    responseMessage = data.message;
    console.log('*****responseMessage: ', responseMessage);

    
    // console.log('-----aaa', aaa);
  }

    // ADD A POST
  async function fetchAddPost(payload) {
    console.log('++--**payload:', payload);
    const URL = `http://localhost:4444/posts/add?isUserLoggedIn=${isUserLoggedIn}`;
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': 'origin-list',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    return data;
  }

  const deletePostButtonHandler = async (payload)  => {
    console.log('delete post button was pushed');
    console.log(payload);

    // let aaa = await fetchAddPost({title: postTitle, text: postText});
    // await fetchAddPost({title: postTitle, text: postText, countTen: Number(countTen), isUserLoggedIn: isUserLoggedIn});
    const data = await fetchDeletePost(payload);
    // responseMessage = data.message;

    console.log('-----data', data);
  }

   // DELETE A POST
  async function fetchDeletePost(payload) {
    const URL = `http://localhost:4444/posts/${payload}?isUserLoggedIn=${isUserLoggedIn}`;
    const response = await fetch(URL, {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',
      //   'Access-Control-Allow-Origin': 'origin-list',
      //   // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
      // },
      // body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log('====data AFTER DELETE POST:', data);

    return data;
  }

  return (
    <div className="app-wrapper">
      <h1>Test API frontend MERN</h1>

      <input type="text" onChange={isUserLoggedInHandler} placeholder="isUserLoggedIn" />
      <br></br><br></br>

      <input type="text" onChange={postTitleHandler} placeholder="Введите заголовок поста" />
      <br></br><br></br>

      <input type="text" onChange={postTextHandler} placeholder="Введите пост" />
      <br></br><br></br>

      <input type="text" onChange={countTenHandler} placeholder="Введите countTen" />
      <br></br><br></br>

      <button className="button" onClick={addPostButtonHandler}>Добавить пост</button>
      <button className="button" onClick={getAllPostsButtonHandler}>Получить все посты</button>


      {postsArray.map(item => {
        // console.log('item===', item)
        return (
          <Post
            key={item.index}
            id={item._id}
            title={item.title}
            text={item.text}
            countTen={item.countTen}
            resCountTen={item.resCountTen}
            createdAt={item.createdAt}
            deletePostButtonHandler={deletePostButtonHandler}
            />
        )
      })}

      <div className="user-info-block">
        <p>{userName}</p>
      </div>
    </div>
  );
}

export default App;

  // let postsArray = [
  //   {name: 'name1', password: 'password1'},
  //   {name: 'name2', password: 'password2'},
  //   {name: 'name3', password: 'password3'},
  // ]
  // let postsArray = [];
  // console.log('postsArray after initialisation', postsArray);


    // --- GETTING USER --- //
  // async function fetchUser() {
  //   const URL = 'http://localhost:4444/auth/register';
  //   const response = await fetch(URL);
  //   const data = await response.json();
  //   return data;
  // }
  // --- GETTING USER --- //


  // async function fetchNewsList({ page, limit, title }) {
  //   const URL = `http://localhost:3000/news/find-by-title?page=${page}&limit=${limit}&title=${title}`;
  //   const response = await fetch(URL);
  //   const data = await response.json();
  //   return data;
  // }

  // isUserLoggedIn: true
  // const URL = `http://localhost:3000/news/isUserLoggedIn?page=${page}&limit=${limit}&title=${title}`;