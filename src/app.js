/*jshint esversion:6*/

function spaceBarPressed(e) {
  return e.keyCode === 32;
}
// Create a levels class object with
class Level {
  constructor(num) {
    this.num = num;
    this.bgColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }
  render() {
    game.updateText(this.num);
    game.changeBackground(this.bgColor);
  }
  updateCircle() {
    $('.mini-circle-wrapper').velocity('transition.fadeOut', {
      complete: function() {
        $(this).css('transform', 'rotateZ(' + Math.floor(Math.random() * 360) + '48deg)').velocity('transition.fadeIn');
      }
    });

  }
}

let game = {
  highScore: 0,
  progress: false,
  currentLevel: 1,
  init: function() {
    $('#control').click(function(event) {
      console.log(event);
    });
    $('body').keyup(function(e) {
      if (spaceBarPressed(e) && game.progress === false) {
        game.startGame();
      }
    });
  },
  startGame: function() {
    game.progress = true;
    let level = new Level(game.currentLevel);
    level.render();
    $('.controls').velocity({
      rotateZ: '360deg'
    }, {
      loop: true,
      easing: 'linear',
      duration: 2000
    });
    $('body').keydown(function(e) {
      if (spaceBarPressed(e)) {
        if (game.collisionDetect() === true) {
          level.updateCircle();
          game.currentLevel++;
          $('.number').text(game.currentLevel);
        } else {
          game.endGame();
        }
      }
    });
  },
  updateText: function(text) {
    $('#big-circle .number').text(text);
  },
  changeBackground: function(col) {
    $('body').velocity({
      backgroundColor: col
    });
  },
  collisionDetect: function() {
    if ($('#control').offset().left <= $('.mini-circle').offset().left && $('#control').offset().left + $('#control').innerWidth() >= $('.mini-circle').innerWidth()) {
      return true;
    } else {
      return false;
    }
  },
  endGame: function() {
    $('.controls').velocity("stop");
    $('#control').velocity({
      backgroundColor: '#8c8c8c'
    });
    $('#big-circle').velocity('transition.fadeOut');
    if (game.highScore < game.currentLevel) {
      game.highScore = game.currentLevel;
    }
    $('.wrapper').prepend(`<div class="play-again"><div class="play-button">Play Again</div><h2>High Score: ${game.highScore}</h2></div>`);
    $('.play-button').click(function() {
      game.playAgain();
    });
  },
  playAgain: function() {
    game.currentLevel = 1;
    $('.play-again').velocity('transition.slideUpOut', {
      complete: function() {
        $('.mini-circle-wrapper').css('transform', 'rotateZ(0deg)');
        $('.controls').css('transform', 'rotateZ(0deg)');
        $('#big-circle').velocity('transition.fadeIn', {
          display: 'table'
        });
        game.startGame();
      }
    });
  }
};
game.init();
