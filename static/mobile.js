window.onload = function () {
  var slider = document.querySelector('#slider');
  var box = document.querySelector('#box');
  var buttons = document.getElementById('buttons').querySelectorAll('[data-index]');
  var index = 1;
  var animated = false;
  var timer;
  // 导航栏
  var nav = document.querySelector('#nav');
  var navDrop = nav.querySelector('#more');
  var initNavTop = nav.offsetTop;
  navDrop.addEventListener('click', function () {
    var status = navDrop.getAttribute('data-status');
    if (status === 'up') {
      nav.style.height = '1.5rem';
      navDrop.setAttribute('data-status', 'down');
      navDrop.innerText = '-';
    }
    if (status === 'down') {
      nav.style.height = '0.5rem';
      navDrop.setAttribute('data-status', 'up');
      navDrop.innerText = '+';
    }
  });
  // 滑动
  var lis = document.querySelectorAll('li');
  window.onscroll = function () {
    lazyLoad();
    if (navDrop.getAttribute('data-status') === 'down') {
      nav.style.height = '0.5rem';
      navDrop.setAttribute('data-status', 'up');
      navDrop.innerText = '+';
    }
  };
  function lazyLoad() {
    var scrollTop = document.body.scrollTop || window.pageYOffset ||document.documentElement.scrollTop;
    var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
    if (scrollTop  >= initNavTop) {
      nav.style.position = 'fixed';
      nav.style.marginTop = 0;
    } else {
      nav.style.position = 'relative';
      nav.style.marginTop = '0.2rem';
    }
    for (var j = 0; j < lis.length; j++) {
      if (lis[j].offsetTop < scrollTop + clientHeight) {
        for(var i = 0; i < lis[j].getElementsByTagName('img').length; i++) {
          if (lis[j].getElementsByTagName('img')[i].getAttribute('data-src')) {
            lis[j].getElementsByTagName('img')[i].src =lis[j].getElementsByTagName('img')[i].getAttribute('data-src');
            lis[j].getElementsByTagName('img')[i].removeAttribute('data-src');
          }
        }
      }
    }
  }
  var starPositionX;
  box.addEventListener('touchstart', function (event) {
    starPositionX = event.targetTouches[0].pageX;
    stop();
  });
  box.addEventListener('touchmove', function (event) {
    var changeX = event.targetTouches[0].pageX - starPositionX;
    event.preventDefault();
    if (changeX > 0) {
      // left
      if (animated) {
        return;
      }
      if (index == 1) {
        index = 3;
      } else {
        index -= 1;
      }
      showButton();
      animate(6);
    } else if (changeX < 0) {
      // right
      startAnimate()
    }
  });

  box.addEventListener('touchend', function () {
    play();  // 开始自动轮播
  });

  function startAnimate() {
    if (animated) {
      return;
    }
    if (index == 3) {
      index = 1;
    } else {
      index += 1;
    }
    showButton();
    animate(-6);
  }

  function showButton() {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className == 'on') {
        buttons[i].className = '';
      }
    }
    buttons[index - 1].className = 'on';
  }
  function animate(offset) {
    if (offset === 0) {
      return;
    }
    animated = true;
    var newLeft = +box.style.left.replace('rem', '') + offset;
    var time = 200; //   位移总时间
    var interval = 10; //   位移时间间隔
    var length = offset / (time / interval); // 每次的偏移量
    function go() {
      if ((offset < 0 && +box.style.left.replace('rem', '') > newLeft) || (offset > 0 && +box.style.left.replace('rem', '') < newLeft)) {
        box.style.left = +box.style.left.replace('rem', '') + length + 'rem';
        setTimeout(go, interval);
      } else {
        animated = false;
        box.style.left = newLeft + 'rem';
        if (newLeft > -6) {
          box.style.left = -18 + 'rem';
        }
        if (newLeft < -18) {
          box.style.left = -6 + 'rem';
        }
      }
    }
    go();
  }
  function play() {
    timer = setInterval(function() {
      startAnimate();
    }, 5000);
  }
  function stop() {
    clearInterval(timer);
  }
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      if (this.className == 'on') {
        return;
      }
      var myindex = parseInt(this.getAttribute('data-index'));
      var offset = -6 * (myindex - index);
      index = myindex;
      showButton();
      if (!animated) {
        animate(offset);
      }
    }
  }
  play();
};