// store images to change each time player wins
const playerImg = ['images/char-boy.png','images/char-pink-girl.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-princess-girl.png'];

// store row height and column width of the game board as const to manage measures easily
const rowH = 83;
const colW = 101;

// Enemies our player must avoid
let Enemy = function(y) {
    // Variables applied to each of Enemy instances: x and y ini coord., random speed 10-800 px per sec, and image
	this.x = -colW*3;
	this.y = y;
	this.randSpeed = Math.random()*790+10;
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game. Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplying randSpeed by dt gives the progress of enemy along x coord. each time the browser draws the scene
	this.x += this.randSpeed*dt;
	if (this.x > colW*10) {
		this.x = -colW*10;
	}
	// Check if collision - then reset
	if ((this.y == player.y)&&(this.x+colW >= player.x+colW/4)&&(this.x <= player.x+colW*3/4)) {
		resetPositions(200);
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class with update(), render() and handleInput() methods
function Player() {
	this.x = colW*2;
 	this.y = rowH*5-20;
	this.numImg = 0;
    this.sprite = playerImg[0];
	this.update = function() {
		// Note: the update functionality is implemented in handleInput
	};
	this.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
	// Process the key returned by keyPressed event listener
	this.handleInput = function(keyPressed) {
		switch (keyPressed) {
			case 'left':
				if (this.x >= colW) {
					this.x -= colW;
				}
				break;
			case 'right':
				if (this.x <= colW*3) {
					this.x += colW;
				}
				break;
			case 'down':
				if (this.y <= rowH*4-20) {
					this.y += rowH;
				}
				break;
			case 'up':
				if (this.y >= rowH-20) {
					this.y -= rowH;
					// Check if player won - then "upgrade" player's character image and reset
					if (this.y < rowH-20) {
						this.numImg++;
						if (this.numImg == 5) {
							this.numImg = 0;
						}
						this.sprite = playerImg[this.numImg];
						resetPositions(700);
					}
				}
		}
	};
}

// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(rowH-20), new Enemy(rowH*2-20), new Enemy(rowH*3-20), new Enemy(rowH-20), new Enemy(rowH*2-20), new Enemy(rowH*3-20)];

// Place the player object in a variable called player
let player = new Player();

// Reset all characters positions
function resetPositions(delayMsec) {
	setTimeout(function (delayMsec) {
		allEnemies.forEach(function(enemy) {
			enemy.x = -colW*3;
			enemy.randSpeed = Math.random()*700+100;
		});
		player.x = colW*2;
		player.y = rowH*5-20;
	}, delayMsec);
}

// This listens for key pressed and sends the key to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
