const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);

class LandscaperGame {
    constructor() {
        this.money = 0;
        this.tools = {
            teeth: 0,
            scissors: 0,
            pushLawnmower: 0,
            batteryLawnmower: 0,
            team: 0
        };
    }

    cutGrass() {
        this.money += (this.tools.teeth * 1) +
                      (this.tools.scissors * 5) +
                      (this.tools.pushLawnmower * 50) +
                      (this.tools.batteryLawnmower * 100) +
                      (this.tools.team * 250);
    }

    buyTool(tool) {
        const prices = {
            teeth: 0,
            scissors: 5,
            pushLawnmower: 25,
            batteryLawnmower: 250,
            team: 500
        };
        if (this.money >= prices[tool]) {
            this.money -= prices[tool];
            this.tools[tool]++;
            return true;
        }
        return false;
    }

    sellTool(tool) {
        const sellPrices = {
            teeth: 0,
            scissors: 2.5,
            pushLawnmower: 12.5,
            batteryLawnmower: 125,
            team: 250
        };
        if (this.tools[tool] > 0) {
            this.tools[tool]--;
            this.money += sellPrices[tool];
            return true;
        }
        return false;
    }

    checkWin() {
        return this.tools.team > 0 && this.money >= 1000;
    }

    resetGame() {
        this.money = 0;
        this.tools = {
            teeth: 0,
            scissors: 0,
            pushLawnmower: 0,
            batteryLawnmower: 0,
            team: 0
        };
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new LandscaperGame();

const promptUser = () => {
    console.log(`Money: $${game.money}`);
    console.log('Tools: ', game.tools);
    readline.question('Do you want to (C)ut grass, (B)uy tool, (S)ell tool, (R)eset game, or (Q)uit? ', (action) => {
        switch (action.toLowerCase()) {
            case 'c':
                game.cutGrass();
                if (game.checkWin()) {
                    console.log("Congratulations! You've won the game!");
                    readline.close();
                } else {
                    promptUser();
                }
                break;
            case 'b':
                readline.question('Which tool do you want to buy? (scissors, pushLawnmower, batteryLawnmower, team): ', (tool) => {
                    if (game.buyTool(tool)) {
                        console.log(`You bought a ${tool}.`);
                    } else {
                        console.log("Not enough money to buy that tool.");
                    }
                    promptUser();
                });
                break;
            case 's':
                readline.question('Which tool do you want to sell? (scissors, pushLawnmower, batteryLawnmower, team): ', (tool) => {
                    if (game.sellTool(tool)) {
                        console.log(`You sold a ${tool}.`);
                    } else {
                        console.log("You don't have that tool to sell.");
                    }
                    promptUser();
                });
                break;
            case 'r':
                game.resetGame();
                console.log("Game has been reset.");
                promptUser();
                break;
            case 'q':
                console.log("Thanks for playing!");
                readline.close();
                break;
            default:
                console.log("Invalid action. Please try again.");
                promptUser();
                break;
        }
    });
};

// Start the game
promptUser();

// Commit messages
// "landscaper: user can use teeth to cut grass"
// "landscaper: user can buy scissors"
// "landscaper: user can use scissors to cut grass"
// "landscaper: user can buy push lawnmower"
// "landscaper: user can use push lawnmower to cut grass"
// "landscaper: user can buy battery-powered lawnmower"
// "landscaper: user can use battery-powered lawnmower to cut grass"
// "landscaper: user can hire a team"
// "landscaper: user can use a team to cut grass"
// "landscaper: win scenario"
// "landscaper: added reset game functionality"
// "landscaper: user can have multiple tools"
// "landscaper: user can sell tools for half price"
