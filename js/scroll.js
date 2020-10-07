// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1};
scrolling = false;

function preventDefault(e) {
  // console.log('prevent default')
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function nextSlide(n) {
  if(scrolling) {
    preventDefault();
    return false;
  }

  scrolling = true;
  setTimeout(function() {
    scrolling = false;
  }, 1000);

  var nextIdx = currSlideIdx + n;

  // not sure why I have to add this, some weird styling issue
  // hide first page text so it doesn't show up when scrolling 
  // through the other pages
  if(nextIdx === 0) {
    $('.tw-contents').show();
    $('.scrolldown').show();
  } else {
    $('.tw-contents').hide();
    $('.scrolldown').hide();
  }

  if(nextIdx <= (NUM_SLIDES - 1) && nextIdx >= 0) {
    $('.slideBtn')[nextIdx].click();
    currSlideIdx = nextIdx;
  }
}

function preventDefaultForWheel(e) {
  if(scrolling) {
    // console.log('prevent default for wheel STOPPED')
    preventDefault(e);
    return false;
  }
  // console.log('prevent default for wheel GO')

  if(e.deltaY < 0) {
    // up
    // console.log('UP nextslide')
    nextSlide(-1)
  } else {
    // down
    // console.log('DOWN nextslide')
    nextSlide(1)
  }

  preventDefault(e);
  return false;
}

function preventDefaultForScrollKeys(e) {
  // console.log('prevent default for scroll keys')
  switch(e.keyCode) {
    case 35:
    case 36:
      preventDefault(e);
      break;
    case 38:
    case 33:
      nextSlide(-1);  
      preventDefault(e);
      break;
    case 40:
    case 32:
    case 34:
      nextSlide(1); 
      preventDefault(e);
      break;
    default:
      return;
  }
  return false;
}

function disableScroll() {
  if (window.addEventListener) { // older FF
    window.addEventListener('DOMMouseScroll', preventDefaultForWheel, false);
    window.addEventListener('mousewheel', preventDefaultForWheel, false);    
  }
  window.onmousewheel = document.onmousewheel = preventDefaultForWheel; // older browsers, IE
  window.onwheel = preventDefaultForWheel; 
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;

  document.addEventListener('wheel', preventDefaultForWheel, { passive: false });
  // document.addEventListener('DOMMouseScroll', preventDefaultForWheel, {passive: false});
  // document.addEventListener('mousewheel', preventDefaultForWheel, {passive: false});
}

// function enableScroll() {
//     if (window.removeEventListener)
//         window.removeEventListener('DOMMouseScroll', preventDefault, false);
//     window.onmousewheel = document.onmousewheel = null; 
//     window.onwheel = null; 
//     window.ontouchmove = null;  
//     document.onkeydown = null;  
// }

var ts;
$(document).bind('touchstart', function (e){
   ts = e.originalEvent.touches[0].clientY;
});

$(document).bind('touchend', function (e){
   var te = e.originalEvent.changedTouches[0].clientY;
   if(ts > te+5){
      // slide_down();
      nextSlide(1);
   }else if(ts < te-5){
      // slide_up();
      nextSlide(-1);
   }
});