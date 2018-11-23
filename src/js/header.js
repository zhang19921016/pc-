/**
 头部
 */

export default function () {
  //头部
  const navNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('#header .header-main .arrow');
  //内容区
  const content = document.querySelector('#content');
  const list = document.querySelector('#content>ul');

  //缓存小三角的一半宽度
  const arrowHalfWidth = arrowNode.offsetWidth/2;
  //缓存一频的高度
  const contentHight = content.offsetHeight;


  for (let i = 0; i < navNodes.length; i++) {
    navNodes[i].onclick = function () {
      nowIndex = i;
      move (nowIndex);
    };
  }

  arrowNode.style.left = navNodes[0].getBoundingClientRect().left + navNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

  //滚轮事件的兼容性
  window.onmousewheel = wheel;
  window.addEventListener('DOMMouseScroll',wheel);
  //每一屏的索引
  let nowIndex = 0;
  //函数反抖
  let timer = null;

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
    for (let j = 0; j < navNodes.length; j++) {
      navNodes[j].className = '';
    }
    navNodes[nowIndex].className = 'active';
    arrowNode.style.left = navNodes[nowIndex].getBoundingClientRect().left + navNodes[nowIndex].offsetWidth/2 - arrowHalfWidth + 'px';
    list.style.top = -nowIndex * contentHight + 'px';
  }
}
