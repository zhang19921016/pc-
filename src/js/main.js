/**
 头部
 */
//引入header
import first from './first';

export default function () {
  //头部
  const navNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('#header .header-main .arrow');
  //内容区
  const content = document.querySelector('#content');
  const list = document.querySelector('#content .content-list');
  //侧面导航
  const sideNodes = document.querySelectorAll('#content .side-point li')
  //开机动画获取的dom元素
  const homeCarousel = document.querySelector('.home .home-carousel');
  const plane1 = document.querySelector('.course .plane1');
  const plane2 = document.querySelector('.course .plane2');
  const plane3 = document.querySelector('.course .plane3');
  const pencel1 = document.querySelector('.works .pencel1');
  const pencel2 = document.querySelector('.works .pencel2');
  const pencel3 = document.querySelector('.works .pencel3');
  const aboutLiNodes = document.querySelectorAll('.about .about-list>li');
  const teamTitle = document.querySelector('.team .team-title');
  const teamText = document.querySelector('.team .team-text');

    //缓存小三角的一半宽度
  const arrowHalfWidth = arrowNode.offsetWidth/2;
  //缓存一频的高度
  let contentHight = content.offsetHeight;


  for (let i = 0; i < navNodes.length; i++) {
    navNodes[i].onclick = function () {
      nowIndex = i;
      move (nowIndex);
    };
    sideNodes[i].onclick = function () {
      nowIndex = i;
      move (nowIndex);
    }
  }

  arrowNode.style.left = navNodes[0].getBoundingClientRect().left + navNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

  //滚轮事件的兼容性
  window.onmousewheel = wheel;
  window.addEventListener('DOMMouseScroll',wheel);
  //每一屏的索引
  let nowIndex = 0;
  //函数反抖
  let timer = null;
  //定义上一个索引
  let lastIndex = 0;
  //定义一个数组储存开机动画
  const animationArr = [
    {
      aniIn(){
        homeCarousel.style.transform = 'translateY(0)';
        homeCarousel.style.opacity = 1;
      },
      aniOut(){
        homeCarousel.style.transform = 'translateY(-100px)';
        homeCarousel.style.opacity = 0.2;
      }
    },
    {
      aniIn(){
        plane1.style.transform = 'translate(0,0)';
        plane2.style.transform = 'translate(0,0)';
        plane3.style.transform = 'translate(0,0)';
      },
      aniOut(){
        plane1.style.transform = 'translate(-100px,-100px)';
        plane2.style.transform = 'translate(-100px,100px)';
        plane3.style.transform = 'translate(100px,-100px)';
      }
    },
    {
      aniIn(){
        pencel1.style.transform = 'translateY(0)';
        pencel2.style.transform = 'translateY(0)';
        pencel3.style.transform = 'translateY(0)';
      },
      aniOut(){
        pencel1.style.transform = 'translateY(-100px)';
        pencel2.style.transform = 'translateY(100px)';
        pencel3.style.transform = 'translateY(100px)';
      }
    },
    {
      aniIn(){
        aboutLiNodes[0].style.transform = 'rotate(0)';
        aboutLiNodes[1].style.transform = 'rotate(0)';

      },
      aniOut(){
        aboutLiNodes[0].style.transform = 'rotate(30deg)';
        aboutLiNodes[1].style.transform = 'rotate(-30deg)';
      }
    },
    {
      aniIn(){
        teamTitle.style.transform = 'translateX(0)';
        teamText.style.transform = 'translateX(0)';

      },
      aniOut(){
        teamTitle.style.transform = 'translateX(-100px)';
        teamText.style.transform = 'translateX(100px)';
      }
    },
  ]
  //默认全部出场动画,第一个入场动画
  animationArr.forEach((item) => {
    item.aniOut();
  })


  function wheel(event) {
    event = event || window.event;
    clearTimeout(timer);
    timer = setTimeout(function () {
      let flag = '';

      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      }

      switch (flag) {
        case 'up' :

          if (nowIndex > 0) {
            nowIndex--;
            move (nowIndex);
          }
          break;
        case 'down' :

          if (nowIndex < 4) {
            nowIndex++;
            move (nowIndex);
          }
          break;
      }

    },200)
    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }

  //封装滑动
  function move (nowIndex) {
    navNodes[lastIndex].className = '';
    navNodes[nowIndex].className = 'active';
    sideNodes[lastIndex].className = '';
    sideNodes[nowIndex].className = 'active';
    arrowNode.style.left = navNodes[nowIndex].getBoundingClientRect().left + navNodes[nowIndex].offsetWidth/2 - arrowHalfWidth + 'px';
    // contentHight = content.offsetHeight;
    list.style.top = -nowIndex * contentHight + 'px';
    animationArr[lastIndex].aniOut();
    animationArr[nowIndex].aniIn();
    lastIndex = nowIndex;
  }
  //绑定窗口的缩放事件，修改小箭头和ul的位置
  window.onresize = function () {
    // 修改小箭头的位置
    arrowNode.style.left = navNodes[nowIndex].getBoundingClientRect().left + navNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //修改ul的位置
    contentHight  = content.offsetHeight;
    list.style.top = - nowIndex * contentHight + 'px';
  }

  startAni();
  //开机动画
  function startAni () {
    const boot = document.querySelector('#boot-animation');
    const upNode = document.querySelector('#boot-animation .up');
    const downNode = document.querySelector('#boot-animation .down');
    const lineNode = document.querySelector('#boot-animation .line');
    // 创建一个数组保存图片
    const arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
    const length = arr.length;
    let loadImg = 0;
    arr.forEach((item,index) => {
      const img = new Image();
      img.onload = () => {
        loadImg ++;
        lineNode.style.width = loadImg /length * 100 + '%';
        if (loadImg === length) {
          upNode.style.height = '0';
          downNode.style.height = '0';
          lineNode.style.display = 'none';
          upNode.addEventListener('transitionend',function(){
            boot.remove();
            animationArr[0].aniIn();
            first();
          })
        }

      }
      img.src = `./images/${item}`;
  })
  }

}
