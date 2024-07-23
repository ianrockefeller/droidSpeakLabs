var NUM_SLIDES = 5;
var currSlideIdx = 0;
var lastSlideIdx = 0;

function SmoothVerticalScrolling(e, time, where) {
    var eTop = e.getBoundingClientRect().top;
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt, where);
        curTime += time / 100;
    }
}

function SVS_B(eAmt, where) {
    if(where == "center" || where == "")
        window.scrollBy(0, eAmt / 2);
    if (where == "top")
        window.scrollBy(0, eAmt);
}


$(function() {
  $('.scrolldown').click(function() {
    $('.slideBtn')[1].click();
  });

  $(".slideBtn").click(function(e) {
    lastSlideIdx = currSlideIdx;
    currSlideIdx = $(this).index();

    var curr_section = $('.sections>section')[currSlideIdx];
    var last_section = $('.sections>section')[lastSlideIdx];
    // curr_section.focus();
    // SmoothVerticalScrolling(curr_section, 200, 'top')
    // curr_section.scrollIntoView({behavior: 'smooth', block: 'end'});

    // console.log(curr_section)

    if(curr_section != null) {
      $('html, body').animate({
        scrollTop: $(curr_section).offset().top
      }, 300)
      
      $('.slideBtn').removeClass('is-active');
      $(this).addClass('is-active');
  
      setTimeout(function() {
        $('.nav-wrapper').removeClass('black').removeClass('white');
        $('.logo').removeClass('black').removeClass('white').removeClass('blue');
        $('.hamburger-wrapper').removeClass('black').removeClass('white').removeClass('blue');
        if($(curr_section).hasClass('white-font')) {
          $('.nav-wrapper').addClass('white');
          $('.hamburger-wrapper').addClass('white');
          $('.logo').addClass('white');
        } else if($(curr_section).hasClass('black-font')) {
          $('.nav-wrapper').addClass('black');
          $('.hamburger-wrapper').addClass('black');
          $('.logo').addClass('black');
        } else if($(curr_section).hasClass('blue-font')) {
          $('.nav-wrapper').addClass('blue');
          $('.hamburger-wrapper').addClass('blue');
          $('.logo').addClass('blue');
        }
      }, 500);
    }
  });

  $('.anim-typewriter').on('animationiteration webkitAnimationIteration oAnimationIteration MSAnimationIteration',   
  function(e) {
    // Word finished typing/deleting
    if(e.originalEvent.animationName === 'typewriter') {
      // change the word
      sIdx++;
      sIdx %= skills.length;
      setWord($(this), skills[sIdx])
    }
  });

  $('.hamburger').click(function() {
    // hamburger is active
    if($('.hamburger').hasClass('is-active')) {
      scrolling = false;
      $('.hamburger').removeClass('is-active');
      $('.menu-wrapper').removeClass('is-active');
      setTimeout(function() { 
        if($('.nav-wrapper').hasClass('black')) {
          $('.logo').removeClass('white');
          $('.hamburger-wrapper').removeClass('white');
          $('.logo').addClass('black');
          $('.hamburger-wrapper').addClass('black');
        }

        $('.menu-wrapper').toggle(); 
        
      }, 300);
    } else {
      scrolling = true;
      $('.menu-wrapper').toggle();
      setTimeout(function() { 
        $('.menu-wrapper').addClass('is-active');

        if($('.nav-wrapper').hasClass('black')) { // the slide is black
          $('.logo').removeClass('black');
          $('.hamburger-wrapper').removeClass('black');
          $('.logo').addClass('white');
          $('.hamburger-wrapper').addClass('white');
        } 

        $('.hamburger').addClass('is-active');  
      }, 200)
    }
  });

  disableScroll();

  var skills = [
    'Digital',
    'Website',
    // 'Design',
    'AI',
    'Marketing',
    'Hosting',
    'WordPress',
    'Software',
    'E-Commerce',
    'SEO',
    // 'CMS',
    // 'Shopify',
    'Web App',
    // 'Hybrid Mobile',
    // 'Cutting-edge'
  ];

  var sIdx = 0;

  setWord($('.tw-line'), skills[sIdx]);

  function setWord(el, skill) {
    el.html(skill);
    el.css('animation', 'typewriter 3s steps(' + skill.length + ') 1s infinite normal, blinkTextCursor 500ms steps(' + skill.length + ') infinite normal')
  } 

  $('.slideBtn')[0].click();

});