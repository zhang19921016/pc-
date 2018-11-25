/**
 * Created by 94326 on 2018/11/24.
 */
export default function () {
  //获取小圆点和轮播图
  const carouNodes = document.querySelectorAll('.home .home-carousel li');
  const pointNodes = document.querySelectorAll('.home .home-point li');
  const homeNodes = document.querySelector('.home');


  //前一个索引
  let lastIndex = 0;
  //当前索引
  let nowIndex = 0;
  //函数节流
  let lastTime = 0;
  //定时器
  let timer = null;

  for (let i = 0; i < pointNodes.length; i++) {
    pointNodes[i].onclick = function () {
      nowIndex = i;
      let nowTime = Date.now();
      if (nowTime - lastTime < 2000) {
        return;
      }
      if (nowIndex === lastIndex) return;
      if (nowIndex > lastIndex) {
        //点击右边
        carouNodes[nowIndex].className = 'common-title rightShow';
        carouNodes[lastIndex].className = 'common-title leftHide';
      }else {
        //点击左边
        carouNodes[nowIndex].className = 'common-title leftShow';
        carouNodes[lastIndex].className = 'common-title rightHide';
      }

      //对应小圆点
      pointNodes[nowIndex].className = 'active';
      pointNodes[lastIndex].className = '';
      //更新
      lastIndex = nowIndex;
      lastTime = nowTime;

    }
  }
  //自动轮播
  autoPlay();
  homeNodes.onmouseenter = function () {
    clearInterval(timer);
  }
  homeNodes.onmouseleave = autoPlay;


  //封装轮播
  function autoPlay () {
    timer = setInterval(function(){
      nowIndex++;
      if (nowIndex > 3) nowIndex = 0;
      //点击右边
      carouNodes[nowIndex].className = 'common-title rightShow';
      carouNodes[lastIndex].className = 'common-title leftHide';
      //对应小圆点
      pointNodes[nowIndex].className = 'active';
      pointNodes[lastIndex].className = '';
      //更新
      lastIndex = nowIndex;
    },2500)
  }
}