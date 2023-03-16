import React, { useState, useEffect } from 'react';
import Post from './components/Post';
import './App.css';

function App() {
  // const [text, setText] = useState('');
  // const inputHandler = (event) => setText(event.target.value);

  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [countTen, setСountTen] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState('');

  // const [userName, setUserName] = useState('');
  const [postsArray, setPostsArray] = useState([]);
  const postTitleHandler = (event) => setPostTitle(event.target.value);
  const postTextHandler = (event) => setPostText(event.target.value);
  const countTenHandler = (event) => setСountTen(event.target.value);
  const isUserLoggedInHandler = (event) => {
    setIsUserLoggedIn(event.target.value);
  }

  // используем useEffect, чтобы автоматически загружались посты при загрузке страницы
  useEffect(() => {
    fetchGetAllPosts();
  }, []);

  // ADD ONE USER
  // async function fetchAddUser(payload) {
  //   const URL = 'http://localhost:4444/auth/register';
  //   const response = await fetch(URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       'Access-Control-Allow-Origin': 'origin-list',
  //       // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
  //     },
  //     body: JSON.stringify(payload),
  //   });
  //   const data = await response.json();

  //   return data;
  // }

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
    // console.log('data +++++++++++++++++: ', data);
    // console.log('data.message +++++++++++++++++: ', data.message);

    if (data.message === 'Посты не найдены') {
      setPostsArray([]);
      console.log('Посты не найдены');
      return;
    } else {
      setPostsArray([...data]);
      // console.log('Ответ сервера после операции редактирования поста:', data);
      console.log('Ответ сервера:', data);
      console.log('Все посты получены');
    }

    // console.log('Все посты получены');

    // return data;
  }

  const getAllPostsButtonHandler = async () => {
    fetchGetAllPosts();
  };

  const addPostButtonHandler = async () => {
    // const data = await fetchAddPost({title: postTitle, text: postText, countTen: Number(countTen), isUserLoggedIn: !isUserLoggedIn});
    await fetchAddPost({
      title: postTitle,
      text: postText,
      countTen: Number(countTen),
      isUserLoggedIn: !isUserLoggedIn,
    });
    // console.log('*****data from add post: ', data);
    // console.log('*****data.message: ', data.message);
    // responseMessage = data.message;
    // console.log('*****responseMessage: ', responseMessage);

    // console.log('-----aaa', aaa);
  };

  // ADD A POST
  async function fetchAddPost(payload) {
    // console.log('++--**payload:', payload);
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
    // console.log('Ответ сервера после операции добавления поста:', data);
    console.log('Ответ сервера:', data);
    // console.log('+++response:', response);

    if (response.status === 200) {
      console.log('Пост успешно добавлен');
    }

    return data;
  }

  const deletePostButtonHandler = async (postId) => {
    await fetchDeletePost(postId);
  };

  // DELETE A POST
  async function fetchDeletePost(postId) {
    const URL = `http://localhost:4444/posts/${postId}?isUserLoggedIn=${isUserLoggedIn}`;

    const response = await fetch(URL, {
      method: 'DELETE',
    });

    const data = await response.json();
    // console.log('Ответ сервера после операции удаления поста:', data);
    console.log('Ответ сервера:', data);
    // console.log('Пост успешно удален');

    // return data;
  }

  // editing post
  const editPostButtonHandler = async (postId) => {
    await fetchEditPost(postId);
  };

  async function fetchEditPost(postId) {
    const URL = `http://localhost:4444/posts/${postId}?isUserLoggedIn=${isUserLoggedIn}`;

    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': 'origin-list',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
      },
      body: JSON.stringify({ title: postTitle, text: postText }),
    });

    const data = await response.json();
    console.log('Ответ сервера:', data);
    // console.log('Пост успешно обновлен');
    // return data;
  }

  return (
    <div className="app-wrapper">
      <h1>Test API frontend MERN</h1>

      <input type="text" onChange={isUserLoggedInHandler} placeholder="isUserLoggedIn"/>
      <br></br>

      <input type="text" onChange={postTitleHandler} placeholder="Введите заголовок поста"/>
      <br></br>

      <input type="text" onChange={postTextHandler} placeholder="Введите пост"/>
      <br></br>

      <input type="text" onChange={countTenHandler} placeholder="Введите countTen"/>
      <br></br>

      <button className="button" onClick={addPostButtonHandler}>Добавить пост</button>
      <button className="button" onClick={getAllPostsButtonHandler}>Получить все посты</button>

      {postsArray.map((item) => {
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
            editPostButtonHandler={editPostButtonHandler}
          />
        );
      })}
    </div>
  );
}

export default App;