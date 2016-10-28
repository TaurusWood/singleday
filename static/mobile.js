window.onload = function () {
  var slider = document.querySelector('#slider');
  var box = document.querySelector('#box');
  var buttons = document.getElementById('buttons').querySelectorAll('[data-index]');
  var index = 1;
  var animated = false;
  var timer;
  // 滑动
  window.onscroll = function () {

  };
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
    var time = 300; //   位移总时间
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