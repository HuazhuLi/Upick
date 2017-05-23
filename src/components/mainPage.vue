<template>
  <div class="mainpage-root" v-bind:class="{'show':loaded}">
    <div class="mainpage-header">
      <img src="../assets/mainpage/xingxing.png" style="display: none;" id="xingxing"/>
      <img src="../assets/mainpage/wave.png" style="display: none;" id="wave"/>
      <canvas v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
      <h1>Upick</h1>
      <div class="search">
        <input class="search-input" placeholder="输入搜索内容" v-model="keyword" v-on:keyup.enter="searchClick"/>
        <button class="search-button" v-on:click="searchClick"><span class="search-button-icon">搜索</span></button>
      </div>
      <div class="topic">
        <p>{{data.topic}}</p>
      </div>
    </div>
    <div class="mainpage-body">
      <div class="classify">
        <h2>分类</h2>
        <div class="column">
          <div class="column-block" v-for="(item1,index) in data.list1" v-on:click="buttonClick">
            <div class="back">
              <ul v-if="item1.subTitle.length > 0">
                <li v-for="item2 in item1.subTitle">
                  <router-link v-bind:to="'storeList/' + item2">{{item2}}</router-link>
                </li>
              </ul>
              <ul v-else>
                <li class="come-soon">敬请期待</li>
              </ul>
              <div class="img-div-a" v-bind:style="{transform:'scale(' + 5 * rem / 181 + ')', backgroundPosition:'-'+index*181 +'px -205px'}"></div>
            </div>
            <div class="img-div" v-bind:style="{transform:'scale('+5*rem/181+')',backgroundPosition:'-'+index*181 +'px 0'}"></div>
            <h3>{{item1.title}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-store">
      <h2>热门商家</h2>
      <div>
        <div class="back"></div>
        <div class="mainpage-bottom">
          <router-link v-for="item3 in data.list2" v-bind:to="'storeDetail/' + item3">{{item3}}</router-link>
        </div>
      </div>
    </div>
    <img src="../assets/mainpage/favicon.ico" style="display: none;">
  </div>
</template>
<style>
div.mainpage-root{

  min-height: 100%;
  opacity: 0;
  -webkit-opacity: 0;
  -moz-opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
}
div.mainpage-root.show{
  -webkit-opacity: 1;
  -moz-opacity: 1;
  opacity: 1;
}
div.mainpage-header{
  position: relative;
  /*height:10rem;*/
}
div.mainpage-header>h1{
  display: block;
  position: absolute;
  font-size: 0;
  background: url("../assets/mainpage/title.png") no-repeat center;
  background-size: auto 100%;
  height:3rem;
  width:6.5rem;
  margin:1.2rem auto;
  left:0;
  right:0;
  top:0;
  transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
}
div.mainpage-header>div.search{
  display: block;
  position: absolute;
  height:1.5rem;
  top:2rem;
  right:0;
  padding-right:0.5rem;
}
div.mainpage-header.active>h1{
  transform: translateX(calc(1rem - 100%))scale(0.9);
  -moz-transform: translateX(calc(1rem - 100%))scale(0.9);
  -webkit-transform: translateX(calc(1rem - 100%))scale(0.9);
}
div.mainpage-header>div>button{
  display: inline-block;
  height:1rem;
  width: 1rem;
  border:0;
  font-size: 0;
  background: transparent url("../assets/mainpage/search.png");
  background-size:auto 100%;
  padding:0;
  line-height: 1.5rem;
}
div.mainpage-header>div>input{
  border:0;
  height:1.5rem;
  border-radius: 0.75rem;
  box-sizing: border-box;
  vertical-align: middle;
  background-color: rgb(227,227,229);
  transform: scale(0);
  -moz-transform: scale(0);
  -webkit-transform: scale(0);
  width:1.5rem;
  transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  margin:0 0.25rem 0 0;
  padding:0 0.5rem;
}
div.mainpage-header.active>div>input{
  width:9rem;
  transform: scale(1);
  -moz-transform: scale(1);
  -webkit-transform: scale(1);
}
div.mainpage-body{
  width:100%;
  flex-grow: 1;
  display: flex;
}
div.mainpage-body > div{
  flex: 1;
}
div.mainpage-body div.img-div{
  background:url("../assets/mainpage/columns.png");
  height:205px;
  width:181px;
  transform-origin: 0 0;
  z-index: 11;
  position: relative;
}
div.mainpage-body h3{
  font-size: 0.8rem;
  position:absolute;
  bottom:0.5rem;
  text-align: center;
  width:5rem;
  color:#FFF;
  z-index: 11;
  font-weight: 400;
}
div.mainpage-body div.column{
  width: 100%;
  height: calc(100% - 3rem);
  text-align: center;
  font-size: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-content: space-around;
}
div.mainpage-body div.column-block{
  height:5.663rem;
  width:5rem;
  display: inline-block;
  position: relative;
  padding:0.5rem;
  border:none;
}
div.topic>p::after{
  content: "";
  background: url("../assets/mainpage/topic_right.png");
  height:0.7rem;
  display: inline-block;
  width:0.7rem;
  background-size: 100% 100%;
  margin:0 0 0.2rem 0.2rem;
}
div.topic>p::before{
  content: "";
  background: url("../assets/mainpage/topic_left.png");
  height:0.7rem;
  display: inline-block;
  width:0.7rem;
  background-size: 100% 100%;
  margin:0  0.2rem 0.2rem 0;
}
div.topic>p{
  font-size:0.7rem;
  text-align: center;
  padding:0;
  margin:0 auto;
}
div.topic{
  margin:0 auto;
  position: absolute;
  bottom:1rem;
  width:100%;

}
div.mainpage-root h2::before{
  content: "";
  width: 1rem;
  height: 0.2rem;
  margin:0.25rem;
  background: url("../assets/mainpage/left.png") no-repeat;
  background-size: 100%;
  display: inline-block;
}
div.mainpage-root h2::after{
  content: "";
  width: 1rem;
  height: 0.2rem;
  margin:0.25rem;
  background: url("../assets/mainpage/left.png") no-repeat;
  background-size: 100%;
  display: inline-block;
  transform: rotate(180deg);
}
div.mainpage-root h2{
  text-align: center;
  margin:0 0 0.6rem 0;
  padding:0;
  font-weight: 300;
  font-size: 1rem;
}
div.mainpage-body div.column-block>*{
  transition: all 0.5s ease-in-out;
  opacity: 1;
  -moz-opacity: 1;
  -webkit-opacity: 1;
}
div.mainpage-body div.column-block{
  border-radius:0.5rem;
}
div.mainpage-body div.column-block.active>div.img-div{
  opacity: 0;
  -webkit-opacity: 0;
  -moz-opacity: 0;
  z-index: 7;
}
div.mainpage-body div.column-block.active>h3{
  opacity: 0;
  -webkit-opacity: 0;
  -moz-opacity: 0;
  z-index: 7;
}
div.mainpage-body div.column-block.active>div.back{
  transform-origin: 50% 50%;
  transform: scale(1.2);
}
div.column-block div.back{
  width:5rem;
  height:5.663rem;
  position: absolute;
  bottom: 0.5rem;
  z-index: 8;
}
div.column-block div.back a{
  text-decoration: none;
  color: #FFF;

}
div.column-block div.back>div.img-div-a{
  background:url("../assets/mainpage/columns.png");
  height:205px;
  width:181px;
  transform-origin: 0 0;

  position: absolute;
  top:0;
}
div.column-block.active div.back ul{
  display: flex;
  box-sizing: border-box;
  font-size: 0.6rem;

}
div.column-block div.back ul{
  list-style: none;
  padding:0.5rem;
  margin: 0;
  width:100%;
  height:100%;
  flex-direction: column;
  flex-wrap: wrap;
  display: none;
  justify-content: flex-start;
}

div.column-block div.back li.come-soon{
  width:100%;
  height:100%;
  display: inline-block;
  line-height: 100%;
  vertical-align: middle;
  padding: calc(50% - 0.4rem) 0;
  color: #BBB;
  text-align: center;
}
div.column-block div.back li{
  font-size: 0.6rem;
  height: 0.8rem;
  color:#FFF;
  position: relative;
  z-index: 10;
  width:2rem;
  margin:0.35rem 0;
  text-align: left;
  white-space: nowrap;
}
div.column-block div.back li:nth-child(5),
div.column-block div.back li:nth-child(4),
div.column-block div.back li:nth-child(6){
  text-align: right;
}
div.hot-store img{
  width:100%;
  height:auto;
}
div.hot-store>div{
  overflow: hidden;
  position: relative;
  height: 4rem;
}
div.hot-store{
  /*position: absolute;
  bottom:0;*/
  width:100%;
  position: relative;
}
div.hot-store div.back{
  width:100%;
  padding:24% 0 0 0;
  background: url("../assets/mainpage/bottom.png");
  background-size: 100% 100%;
}
div.hot-store div.mainpage-bottom{
  width:100%;
  height:100% ;
  position: absolute;
  top:0;
  padding:0.5rem;
  margin:0;
  box-sizing: border-box;
  text-align: center;
  font-size: 0;
  line-height: 0;
}
div.hot-store div.mainpage-bottom>a:focus{
  background: #FFFFFF;
  color:#6c77c9;
  border:transparent 1px solid;
}
div.hot-store div.mainpage-bottom>a{
  display:inline-block;
  border: solid 1px #FFF;
  border-radius: 0.5rem;
  min-width:3rem;
  max-width:8rem;
  height:1.35rem;
  font-size: 0.7rem;
  color:#FFF;
  text-align: center;
  line-height: 1.35rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
  text-decoration: none;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  padding: 0 0.5rem;
  box-sizing: border-box;

}
</style>
<script>
var axios = require('axios');
var wx = require('weixin-js-sdk');
var ctx;
var canvas;

module.exports = {
  data: function () {
    return ({
      canvasWidth: document.body.clientWidth,
      canvasHeight: document.body.clientWidth * 0.45,
      data: {topic: '这是头条推文这是头条推文', list1: [], list2: []},
      loaded: false,
      rem: 18,
      keyword: ''
    });
  },
  methods: {
    searchClick: function (a) {
      var input = a.target.parentNode.querySelector('input');
      var parentDiv = a.target.parentNode.parentNode;
      if (input.value === '' && parentDiv.classList.contains('active')) {
        parentDiv.classList.remove('active');
      } else if (!parentDiv.classList.contains('active')) {
        parentDiv.classList.add('active');
      } else {
        this.$router.push('/storeList/search/' + this.keyword);
      }
    },
    buttonClick: function (a) {
      if (document.querySelectorAll('.active').length !== 0) {
        document.querySelector('.active').classList.remove('active');
      }
      a.target.parentNode.classList.add('active');
    },
    draw: function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#343856';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      var img1 = document.getElementById('xingxing');
      if (!img1) {
        return;
      }
      ctx.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, canvas.width, canvas.width * img1.height / img1.width);
      var img2 = document.getElementById('wave');
      if (!img2) {
        return;
      }
      ctx.drawImage(img2, 0, 0, img2.width, img2.height, 0, canvas.height * 0.1, canvas.width, canvas.width * img2.height / img2.width);
    }
  },
  mounted: function () {
    var vueThis = this;
    vueThis.rem = parseInt(window.getComputedStyle(document.documentElement)['fontSize']);
    canvas = document.querySelector('canvas');
    ctx = document.querySelector('canvas').getContext('2d');
    var imagesToLoad = [
      'static/img/bottom.png',
      'static/img/title.png',
      'static/img/columns.png',
      'static/img/wave.png',
      'static/img/xingxing.png'
    ];
    var promises = imagesToLoad.map(function (src) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
          if (img.width + img.height === 0) {
            reject(new Error('图片加载失败'));
          } else {
            resolve();
          }
        }
        img.onerror = function () {
          reject(new Error('图片加载失败'));
        }
      });
    });
    var prepare = axios.get('login')
      .then(function (response) {
        if (response.data.status) {
          return axios.get('index');
        } else {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx70014cb42f7c9422&redirect_uri=http%3A//upick.hustonline.net/weixin/access&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
          return Promise.reject(new Error('需要登录'));
        }
      })
      .then(function (response) {
        response = response.data;
        vueThis.data = response;
      });

    axios.get('http://weixin.bigtech.cc/service/jssdk_config?url=' + encodeURIComponent('http://weixin.bigtech.cc/upick/index.html'))
    .then(function (response) {
      response = response.data;
      wx.config({
        debug: false,
        appId: response.appid,
        timestamp: response.timestamp,
        nonceStr: response.noncestr,
        signature: response.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
      });
      return new Promise(function (resolve, reject) {
        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: 'Upick | 华科吃喝玩乐，让老司机带你飞！', // 分享标题
            desc: '华科吃喝玩乐，让老司机带你飞！！', // 分享描述
            link: 'http://weixin.bigtech.cc/upick/index.html', // 分享链接
            imgUrl: 'http://weixin.bigtech.cc/upick/static/img/title_share.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareAppMessage({
            title: 'Upick | 华科吃喝玩乐，让老司机带你飞！', // 分享标题
            desc: '华科吃喝玩乐，让老司机带你飞！！', // 分享描述
            link: 'http://weixin.bigtech.cc/upick/index.html', // 分享链接
            imgUrl: 'http://weixin.bigtech.cc/upick/static/img/title_share.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareQQ({
            title: 'Upick | 华科吃喝玩乐，让老司机带你飞！', // 分享标题
            desc: '华科吃喝玩乐，让老司机带你飞！！', // 分享描述
            link: 'http://weixin.bigtech.cc/upick/index.html', // 分享链接
            imgUrl: 'http://weixin.bigtech.cc/upick/static/img/title_share.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareWeibo({
            title: 'Upick | 华科吃喝玩乐，让老司机带你飞！', // 分享标题
            desc: '华科吃喝玩乐，让老司机带你飞！！', // 分享描述
            link: 'http://weixin.bigtech.cc/upick/index.html', // 分享链接
            imgUrl: 'http://weixin.bigtech.cc/upick/static/img/title_share.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareQZone({
            title: 'Upick | 华科吃喝玩乐，让老司机带你飞！', // 分享标题
            desc: '华科吃喝玩乐，让老司机带你飞！！', // 分享描述
            link: 'http://weixin.bigtech.cc/upick/index.html', // 分享链接
            imgUrl: 'http://weixin.bigtech.cc/upick/static/img/title_share.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          resolve();
        });
        wx.error(function (res) {
          // reject(new Error('微信认证失败'));
          console.error('微信认证失败');
        });
      });
    })
    .catch(function (err) {
      throw err;
    });
    promises.push(prepare);
    Promise.all(promises).then(function () {
      vueThis.draw();
      vueThis.loaded = true;
    })
    .catch(function (err) {
      throw err;
    });
  }
}
</script>
