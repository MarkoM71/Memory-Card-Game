# Memory-Card-Game


PSEUDOCODE

-STEP ONE
A Board is rendered, with the cards turned over.  There are 12 Cards.
    There are 6 items items.  There is an array of 12, with duplicates of each of the items.  An algorithm goes through the array and creates a randomly popluated 2nd array. 

-STEP TWO
The user selects one card, by clicking on it.  The card turns over, and stays that way.
    Handle Clicks are on each card, which reveal the item under that card.  The Handle Click makes it display the image under the card.  The default is the backside.  Same back side used for all the cards.


-STEP THREE
The user selects the second card, by clicking on it.  The card turns over. Both cards should stay turned over for a second so the user processes whether it's a match or a miss. 
    If the 2nd card matches the 1st card.  Both Cards disappear from the screen.  Moves is updated to 1.  
    If the 2nd card doesn't match, both cards turn back facedown.  Moves is updated to 1.  And misses is updated to 1.
    No additional cards can be clicked until the cards are removed (match) or turned facedown (miss).  So no 3 cards in a row can be clicked.

-STEP FOUR
This process continues, until the screen is empty after all the cars disappear.  A You win! statement appears on the screen.  An accuracy, amount is rendered in percentage.  This calculates the amount amount of moves you got correct.  

-STEP FIVE
There is a play again button, which resets the board, and the statistics of moves, misses, and accuracy.  You can press the play again button to reset the board and the statistics at anytime.  


