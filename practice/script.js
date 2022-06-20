;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }
  
  //fetch - response 객체
  //await - promise 객체
  //.json() - 내가 원하는 데이터값으로 보여짐 

  /* 데이터 불러오는 과정 - start*/

  // async 비동기 함수 실행할거라는 의미 
  const getPost = async () => {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'
  // 원래 비동기 함수를 통해 얻어지는 데이터값은 promise라는 객체로 감싸짐 
  // 실제 비동기함수가 실행되는 코드는 아래 코드. 
  // await를 써야지 비동기함수가 작업을 완료했을 때 promise객체를 벗긴 값을 할당해줌
  // await을 안쓰면 비동기로 실행되는게 아니라서 서버요청의 값을 받지 않았는데 response에 할당하게 되고 에러가남. 
  // await으로 받은 데이터값은 우리가 원하는 데이터값이 아님. fetch로 받은 서버요청은 response라는 객체로 감싸져서 옴. 
    const response = await fetch(API_URL)
    if( !response.ok ){
      throw new Error('에러가 발생했습니다.')
    }
    //response라는 객체를 벗겨내고 내가 자주 보는 데이터값으로 얻고 싶으면 
    // json()함수를 쓰면됨.
    return response.json()
  }

  const $posts = get('.posts')

  const showPosts = (posts)=>{
    posts.forEach((post)=>{
      const $post = document.createElement('div')
      $post.classList.add('post')
      $post.innerHTML = `
      <div class="header">
        <div class="id">${post.id}</div>
        <div class="title">${post.title}</div>
      </div>
      <div class="body">${post.body}</div>
      `
      $posts.appendChild($post)
    })
  }

  const loadPost = async () => {
    const response = await getPost()
    showPosts(response)
  }

  /* 데이터 불러오는 과정 - end */
  // DOMContentLoaded 이벤트 발생시 안에있는 코드들 실행되게 함
  window.addEventListener('DOMContentLoaded', ()=>{
    loadPost()
  })
})()
