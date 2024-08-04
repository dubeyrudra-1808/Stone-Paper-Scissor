let score = {
    win: 0,
    lose: 0,
    draw: 0
};

document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors'];
    const buttons = document.querySelectorAll('.choice');
    const resultText = document.getElementById('resultText');
    const restartButton = document.getElementById('restart');
    const scoreBoard = document.getElementById('scoreBoard');

    // Load score from localStorage
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
        score = JSON.parse(storedScore);
        updateScoreBoard();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.id;
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = getResult(playerChoice, computerChoice);
            resultText.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
            updateScoreBoard();
        });
    });

    restartButton.addEventListener('click', () => {
        resultText.textContent = '';
        score = { win: 0, lose: 0, draw: 0 };
        updateScoreBoard();
        localStorage.setItem('score', JSON.stringify(score));
    });

    function getResult(player, computer) {
        if (player === computer) {
            score.draw++;
            return "It's a draw!";
        } else if ((player === 'rock' && computer === 'scissors') ||
                   (player === 'paper' && computer === 'rock') ||
                   (player === 'scissors' && computer === 'paper')) {
            score.win++;
            return "You win this round!";
        } else {
            score.lose++;
            return "You lose this round!";
        }
    }

    function updateScoreBoard() {
        scoreBoard.textContent = `Wins: ${score.win} Losses: ${score.lose} Draws: ${score.draw}`;
        localStorage.setItem('score', JSON.stringify(score));
    }
});
