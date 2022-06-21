;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }
  let page = 1
  const limit = 10
  const end = 100
  let total = 10
  
  //fetch - response 객체
  //await - promise 객체
  //.json() - 내가 원하는 데이터값으로 보여짐 

  /* 데이터 불러오는 과정 - start*/

  // async 비동기 함수 실행할거라는 의미 
  const getPost = async () => {
    // 데이터를 몇개씩 가져올지 정해주는 코드 

    // 서버 url을 변수로 만듬. 
    // 한번에 가져올 때 몇개씩 가져올지 & 몇번쨰 페이지로 가져올지 정해줌 
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
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
  const $loader = get('.loader')

  // 서버에서 받아온 데이터 response를 showPost에 posts라는 인자로 넣고 
  const showPosts = (posts)=>{
    // 배열로 받아오니까 forEach문으로 반복문을 돌림. 
    posts.forEach((post)=>{
      // div태그를 하나 만들고
      const $post = document.createElement('div')
      // 만들어진 div태그에 post라는 클래스를 붙여줌 
      $post.classList.add('post')
      // 그리고 그 안에 html내용을 넣어줌 
      $post.innerHTML = `
      <div class="header">
        <div class="id">${post.id}</div>
        <div class="title">${post.title}</div>
      </div>
      <div class="body">${post.body}</div>
      `
      // 만들어진 div태그를 클래스가 posts인 div태그에 자식요소로 넣어줌. 
      $posts.appendChild($post)
    })
  }

  const showLoader = ()=>{
    $loader.classList.add('show')
  }

  const hideLoader = ()=>{
    $loader.classList.remove('show')
  }

  // 윈도우가 실행되면 첫번째로 실행되는 함수
  const loadPost = async () => {
    // 로딩 엘리먼트를 보여줌 ( 애니메이션 )
    showLoader()

    try{
      // getPost함수로 서버와 통신해서 데이터 가져옴
    const response = await getPost()
      // 서버에서 받아온 데이터를 showPost()로 보내서 데이터바인딩함
    showPosts(response)
    } 
    // 서버통신하다가 에러나면 에러 메세지 보여주게 코드 작성 
    catch (error) {
      console.error(error.message)
    } 
    // 서버 통신이 잘 되든 잘 안되든 
    // finally로 무조건 실행되는 코드 하나 작성 
    finally {
      // 로딩 엘리먼트를 사라지게함 ( 애니메이션 )
      hideLoader()
    }
  }

  // 윈도우가 실행되고 scroll 이벤트가 감지되면 실행될 함수 
  const onScroll = () => {
    // document.documentElement 중에서 
    // scrollTop, scrollHeight, clientHeight을 가지고옴
    // documentElement가 객체라서 객체로 가져옴 
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    // 한번에 10개씩 총 100개의 데이터를 가지고 오니까 
    // 100개가 다 불러와지면 
    if( total == end ){
      // scroll이벤트를 지움
      window.removeEventListener('scroll', onScroll)
      return
    }
    // 내가보는 화면과 내려온 스크롤 위치가 토탈 스크롤위치의 -5한 값보다 같거나 커지면 
   // 변수 page에 1을 더해 다음 페이지의 데이터를 가져올 수 있게 하고 
   // total 개수는 10씩 더해주고 
    if ( scrollTop + clientHeight >= scrollHeight - 5 ){
      page++
      total += 10
      loadPost()
    }
  }

  /* 데이터 불러오는 과정 - end */
  // DOMContentLoaded 이벤트 발생시 안에있는 코드들 실행되게 함
  window.addEventListener('DOMContentLoaded', ()=>{
    loadPost()
    // scoll이벤트가 감지될 때 onScroll함수가 실행되게 해줌 
    window.addEventListener('scroll', onScroll)
  })
})()
