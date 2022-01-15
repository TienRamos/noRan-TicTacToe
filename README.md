# noRan-TicTacToe
noRan (from NOt RANdom) is a bot designed to be a competitive, but not perfect, tic-tac-toe opponent whose moves are based on both strategy and predetermined move sets. 

How noRan works:
- Before making a move, noRan searches for winning boxes.
- If no such boxes are found, noRan checks if PLAYER is about to win, and blocks the right box
- Otherwise, a move is executed based on a randomly selected predetermined move set.
- Scores are tallied and carried over after every round, unless restart button is pressed.

Personal note:
I originally thought of making noRan a bot that plays a perfect game every time (either WIN or DRAW, but never LOSE). I decided to not go on that route since playing a game with such an opponent is pretty pointless, in my opinion.
