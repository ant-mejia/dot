# .Dots.
![Screenshot](https://cloud.githubusercontent.com/assets/22961657/21468625/ffdc0366-c9e9-11e6-8c5d-d6f2b7dfbfc6.png)

## Description
I wanted to create a simple game that doesn't require any instructions.

Using the newest syntax of Javascript, I created a **Level** class object of their own, looping in the keyboard element in a method of that object.

```JS
class Level {
  constructor(num) {
    this.level = num;
    this.bgColor = "#000000".replace(/0/g, function() {
      return ((Math.random() * 16)).toString(16);
    });
  }
  render() {
    game.updateText(this.level);
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
```

Tying all of the pieces together in app.js, canvas is the platform where all of the
visual components were rendered using the draw() function, while simultaneously thredding the
overall functionality of the game. Simple enough!

For the cherry on top, I got fancy with the splash page to surprise players with the twist. And that's it!

## Built With
-   HTML
-   CSS
-   Vanilla Javascript

## Author
[Anthony Mejia](https://github.com/ant-mejia)

## Acknowledgments
My awesome squad leader Vince for helping me keep my head above water.
