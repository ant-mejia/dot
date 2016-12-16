/*jshint esversion:6*/

// Create a levels class object with

function getRotationDegrees(obj) {
  var angleD;
  var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform") ||
    obj.css("-ms-transform") ||
    obj.css("-o-transform") ||
    obj.css("transform");
  if (matrix !== 'none') {
    var values = matrix.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    angleD = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  } else {
    angleD = 0;
  }
  return (angleD < 0) ? angleD += 360 : angleD;
}
let game = {
  init: function() {
    $('#circle-container').velocity({
      rotateZ: '360deg'
    }, {
      loop: true,
      easing: 'linear',
      duration: 2000
    });
  }
};
$('.wrapper').click(function(event) {
  $('.wrapper .circles .dots').first().children().first().velocity({
    backgroundColor: '#01ab1c',
    top: -(($('.wrapper .circles .dot').first().offset().top - $('#circle-container ul').offset().top) - ($('#circle-container ul').innerHeight() - 30)),
  }, {
    complete: function() {
      $(this).appendTo('.main-container #circle-container ul').css('top', '0');
      console.log('angle: ', getRotationDegrees($('#circle-container')));
      console.log('offset', $('.wrapper .circles .dot').first().offset().top - $('#circle-container ul').offset().top);
    }
  });
  $('.wrapper .circles .dots').last().children().last().velocity({
    backgroundColor: '#01ab1c',
    top: '30%'
  }, {
    complete: function() {
      $(this).appendTo('.main-container #circle-container ul').css('top', '0');
    }
  });
});

game.init();
