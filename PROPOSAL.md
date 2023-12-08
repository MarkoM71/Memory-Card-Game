PROJECT CHOICE

Memory Card Game


PROJECT DESCRIPTION
My app is called Memory Card.  It's a game for an individual who wants to play a memory card game online.  There are 12 cards on the screen.  One player chooses 2 cards, and if they match, they disappear.  If they don't match, the cards turn face down.  You win the game once you match all of the cards, and there are no cards left on the screen.  

They game keeps track of how many moves you make.  One move is considered when you turn over 2 cards.   The game keeps track of how many misses you make.  Misses are considered when you turn over 2 cards and no matches occur.  After you win the game.  Your move accuracy is calculated.  The screen announces you Win.  And you there is a play again button.

Possibly to think about 6 random pairs of objects.  
Or make it themed based, sports themes: (soccer ball, basketball, football, baseball, tennis ball, golf ball)
Game based themes: 6 cyberpunk characters.  6 streetfighers characters.


WIRE FRAMES

INITIAL LANDING VIEW   

<!-- image -->

RESULTS VIEW

<!-- image -->

USER STORIES

MVP GOALS

As a player, I want to be able to turn over 2 cards. And the computer to determine whether they match or not.
As a player, I want the computer to remove cards if they match.  And to turn them facedown if they don't.
As I player, I want the computer to keep track of how many moves I made.
As a player, I want the computer to keep track of how many misses I make.
As a player, I want the computer to announce I won.  When the screen is empty and I matched all the cards.
As a player, I want the computer to let me know how accurate I was in making moves.
As a player, I want UI to look nice and be engaging.  
As a player, I want the computer to give me functionality to play again.  


STRETCH GOALS

As a player, I'd like a lose state, meaning if I don't get the matches in a certain amount of time.  I lose the game.
As a player, I'd to see functionality to input my name.
As a player, I'd like to see a leadership board showing the highest scores.
As a player, I'd like to see storage, so it stores the leadership board upon page refresh.
As a player, I'd like to see modals to improve the UI.



NOTIONBOARD TEMPLATE

<!-- Notionboard template for building projects ( You can use this for any project ) https://www.notion.so/GA-Unit-3-Tunr-Lab-da2c82fafd4e4a7aa654676732db9ee3 -->

TIMELINE - DAILY ACCOUNTABILITY

<!-- Example of a Timeline to keep organized and on task for hitting goals every single day you’re on the sprint for your project.

Create your own table using this markdown table generator website: https://www.tablesgenerator.com/markdown_tables

Do not neglect to plan, you will thank yourself later for being proactive! -->

Friday:
Create and present proposal.  Create html, js, css files.

Saturday:
Create basic scaffolding

Sunday:
Add functionality

Monday:
Add styling

Tuesday:
Finalize MVP

Wednesday:
Work on stretch goals

Thursday:
Work on icebox items if applicable

Friday:
Presentation Day!


INITIAL PROJECT PSEUDOCODE

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
