

var enemies = 0;  // number of bugs to avoid, more for harder levels
var speedMultiplier = 0;  // bugs are faster at harder levels

var score = 0;  // keep track of score
var pause = false;  // true at end of game, false while game in progress
var canvasWidth = 505;  // width of playing field
var canvasHeight = 606;  // height of playing field

var avoidAllBugs = +100;  // points awarded when stream is reached
var collideWithBug = -25;  // points lost when hitting a bug
var winningScore = 1000;  // win game by accumulating this score
var losingScore = -200;  // lost game by reaching this score

/*
    'restart' button not displayed while game in progress
*/
document.getElementById('restartButton').style.display = "none";

/*
    Instructions displayed for player
*/
document.getElementById('instructions').innerHTML = "Use the arrow keys to get past the bugs.  Score " + avoidAllBugs + " points by reaching the stream, lose " + collideWithBug + " points for hitting a bug.  " + winningScore + " points wins the game, but you lose if your score reaches " + losingScore + ".";
document.getElementById('instructionRow').style.maxWidth = canvasWidth + "px";

/*
    game levels
*/
var level1 = "Easy";
var level2 = "Medium";
var level3 = "Hard";

/*
    Initialize level selection buttons
*/
document.getElementById('level1Button').value = level1;
document.getElementById('level1Button').innerHTML = level1;

document.getElementById('level2Button').value = level2;
document.getElementById('level2Button').innerHTML = level2;

document.getElementById('level3Button').value = level3;
document.getElementById('level3Button').innerHTML = level3;

var level = level1;  // default level

/*
    Create Enemies that the player must avoid
*/
var Enemy = function(x, y, speed)
{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/*
    Update the enemy's position, required method for game
    Parameter: dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt)
{
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    // when enemy reaches border call reset
    if (this.x > this.canvasWidth)
    {
        this.reset()
    }
};

/*
    Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    move the enemy back to starting point, clear scoreboard line
*/
Enemy.prototype.reset = function()
{
    ctx.clearRect(10, 30, this.canvasWidth, this.canvasWidth);
    this.x = -200;
};

/*
    Now write your own player class
    This class requires an update(), render() and
    a handleInput() method.
*/

// Sets player starting coordinates
var startX = 200;
var startY = 400;

var Player = function()
{
  this.x = startX;
  this.y = startY;
  score = 0;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function()
{
  //set x axis boundaries
  if (this.x < 0)
  {
    this.x = 0;
  }
  else if (this.x > 400)
  {
    this.x = 400;
  }

  //set y axis boundaries
  if (this.y > 400)
  {
    this.y = 400;
  }
  //reset if player reaches stream, and update score
  else if (this.y < 0)
  {
    this.reset();
    score += avoidAllBugs;
  }
};

/*
    reset function sets the player back to the start coordinates,
    clears scoreboard line
*/
Player.prototype.reset = function()
{
    ctx.clearRect(10, 30, this.canvasWidth, this.canvasWidth);
    this.x = startX;
    this.y = startY;
};

/*
    Draw the player on the screen, required method for game
*/
Player.prototype.render = function()
{
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
    Set values for the level selected by the player, then instantiate the enemies.
*/
function setLevel()
{
    document.getElementById('level1Button').className = "levelButton";
    document.getElementById('level2Button').className = "levelButton";
    document.getElementById('level3Button').className = "levelButton";

    if (this.level == level1)
    {
        this.enemies = 2;
        this.speedMultiplier = 1;
        document.getElementById('level1Button').className = "selectedButton";
    }

    if (this.level == level2)
    {
        this.enemies = 3;
        this.speedMultiplier = 2;
        document.getElementById('level2Button').className = "selectedButton";
    }

    if (this.level == level3)
    {
        this.enemies = 4;
        this.speedMultiplier = 3;
        document.getElementById('level3Button').className = "selectedButton";
    }

    /*
     set Y coordinate for each enemy using incrementer
     set X coordinate randomly
     set speed to a base of 80 and then randomize each enemy, using speedMultiplier to
        make enemies faster for higher levels
     store enemies in allEnemies array
    */

    this.allEnemies = [];
    for (var i = 0; i < this.enemies; i++)
    {
        var enemyY = 65 + 80 * i;
        var enemyX = Math.floor(Math.random() * 30);
        var enemySpeed = 80 + Math.floor(Math.random() * 400 * this.speedMultiplier);
        allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
    }
}

/*
    Enemy objects are stored in an array called allEnemies.  'setLevel' instantiates
    the enemies.
*/
var allEnemies = [];
setLevel();


/*
    Place the player object in a variable called player
*/
var player = new Player();

/*
    This listens for key presses and sends the keys to your
    Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function(e)
{
    var allowedKeys =
    {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
    switch statement takes the key event listener and adjusts x or y accordingly
*/
Player.prototype.handleInput = function(key)
{
    if (!pause)
    {
        switch (key)
        {
            case 'up':
              this.y -= 90;
              break;

            case 'down':
              this.y += 90;
              break;

            case 'left':
              this.x -= 100;
              break;

            case 'right':
              this.x += 100;
              break;

            default:
              break;
          }
        }
};