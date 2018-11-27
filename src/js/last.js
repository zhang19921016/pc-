/**
 * Created by 94326 on 2018/11/26.
 */
export default function () {
  //获取ul和li
  const liNodes = document.querySelectorAll('.team-person li');
  const ulNode = document.querySelector('.team-person');
  let canvas = null;
  let timer1 = null;
  let timer2 = null;


//鼠标移入事件
  for (let i = 0; i < liNodes.length; i++) {
    liNodes[i].onmouseenter = () => {
      for (let j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = 0.5;
      }
      liNodes[i].style.opacity = 1;
      createCanvas (i);
    }

  }
//鼠标移出
  ulNode.onmouseleave = () => {
    for (let j = 0; j < liNodes.length; j++) {
      liNodes[j].style.opacity = 1;
    }
    //清除画布
    canvas.remove();
    canvas = null;
    clearInterval(timer1);
    clearInterval(timer2);
  }

  const width = liNodes[0].offsetWidth;
  const height = liNodes[0].offsetHeight;
  function createCanvas (index) {
    if (!canvas) {
      //创建一个画布
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      //定位
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = index * width + 'px';
      bubble();
      ulNode.appendChild(canvas);
    } else {
      canvas.style.left = index * width + 'px';
    }
  }
  function bubble () {
    const canArr = [];
    timer1 = setInterval(() => {

      //随机的颜色
      let r = Math.round(Math.random()*255);
      let g = Math.round(Math.random()*255);
      let b = Math.round(Math.random()*255);
      //随机的半径
      let cr = Math.round(Math.random()*8 + 2);
      //随机位置
      let x = Math.round(Math.random()*width);
      let y = height - cr;
      //初始化弧度
      let rad = 0;
      //随机系数
      let n = Math.round(Math.random()*50 + 20);
      canArr.push({
        r,
        g,
        b,
        cr,
        x,
        y,
        rad,
        n
      })
    },20)
    timer2 = setInterval(() => {
      if (canvas.getContext) {
        console.log(2);
        //获取画笔
        const paiting = canvas.getContext('2d');
        //清除画布
        paiting.clearRect(0,0,width,height);

        canArr.forEach(item => {
          item.rad += 0.08;
          const a = item.x + Math.sin(item.rad)*item.n;
          const b = item.y - item.rad*item.n;
          //重新起笔
          paiting.beginPath();
          paiting.fillStyle = `rgb(${item.r},${item.g},${item.b})`
          paiting.arc(a,b,item.cr,0,2*Math.PI);
          paiting.fill();
        })
      }
    },1000/60)
  }

}