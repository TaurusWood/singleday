$(function () {
  var slider = document.querySelector('#slider');
  var box = document.querySelector('#box');
  var back = document.querySelector('#back');
  var forward = document.querySelector('#forward');
  var index = 1;
  var animated = false;
  var timer;

  function animate(offset) {
    if (offset == 0) {
      return;
    }
    animated = true;
    var newLeft = parseInt(box.style.left) + offset;
    var time = 350; //   位移总时间
    var interval = 10; //   位移时间间隔
    var length = offset / (time / interval); // 每次的偏移量
    function go() {
      if ((offset < 0 && parseInt(box.style.left) > newLeft) || (offset > 0 && parseInt(box.style.left) < newLeft)) {
        box.style.left = parseInt(box.style.left) + length + 'px';
        setTimeout(go, interval);
      } else {
        animated = false;
        box.style.left = newLeft + 'px';
        if (newLeft > -1120) {
          box.style.left = -3360 + 'px';
        }
        if (newLeft < -3360) {
          box.style.left = -1120 + 'px';
        }
      }
    }
    go();
  }
  function play() {
    timer = setInterval(function() {
      forwards.onclick();
    }, 2000);
  }
  function stop() {
    clearInterval(timer);
  }
  forwards.onclick = function() {
    if (animated) {
      return;
    }
    if (index == 6) {
      index = 1;
    } else {
      index += 1;
    }
    // showButton();
    animate(-1120);
  };
  back.onclick = function() {
    if (animated) {
      return;
    }
    if (index == 1) {
      index = 6;
    } else {
      index -= 1;
    }
    animate(1120);
  };

  slider.onmouseover = stop;
  slider.onmouseout = play;
  play();

  // 左边栏  右边栏
  var $leftBar = $('#leftBar');
  var $rightBar = $('#rightBar');
  var eleven = $('#parts-eleven').offset().top;
  $(window).scroll(function(){
    var top = $(window).scrollTop();
    if (top > 900) {
      $leftBar.css({
        "position": "fixed",
        "top": 72
      })
    } else {
      $leftBar.css({
        "position": "absolute",
        "top": "initial"
      })
    }

    if (top > 4756 && top < eleven + 125) {
      $rightBar.parent().css({
        "margin-right": 20
      });
      $rightBar.css({
        "position": "fixed",
        "bottom": "initial",
        "top": 0
      });
    } else if (top >= eleven + 125) {
      $rightBar.css({
        "position": "fixed",
        "top": eleven - top
      });
    } else {
      $rightBar.parent().css({
        "margin-right": 0
      });
      $rightBar.css({
        "position": "relative",
        "top": "initial",
        "bottom": "initial"
      })
    }
  });


  // parts-one
  var $partsOneSquare = $('.parts-one .square-radius');
  $partsOneSquare.find('.shadow').on('mouseenter', function () {
    $(this).css('opacity', 1);
    $(this).prev().hide();
  });
  $partsOneSquare.find('.shadow').on('mouseleave', function () {
    $(this).css('opacity', 0);
    $(this).prev().show();
  });

  // parts-three parts-four
  var $arrowUp = $('.parts .arrow-up');
  $arrowUp.on('mouseenter', function () {
    $(this).parent().next().slideDown();
    $(this).fadeOut();
  });
  $arrowUp.closest('.square').on('mouseleave', function () {
    $(this).find('.slide-text').slideUp();
    $(this).find('.arrow-up').fadeIn();
  });
});