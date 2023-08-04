// Function to play audio when the button is clicked
function playAudio() {
    var audioElement = document.getElementById('myAudio');
    audioElement.play();
  }
  
  // Function to start the typewriter effect
  async function startTypewriterEffect() {
    const typewriterDivs = document.querySelectorAll(".typewriter");
  
    async function typeText(row, index) {
      if (index < textRowsToType[row].length) {
        typewriterDivs[row].textContent += textRowsToType[row][index];
        index++;
  
        await new Promise(resolve => setTimeout(resolve, 65)); // Adjust typing speed here (in milliseconds)
        await typeText(row, index);
      }
    }
  
    async function typeRow(row) {
      await typeText(row, 0);
  
      if (row < textRowsToType.length - 1) {
        typewriterDivs[row].textContent += "\n"; // Add a line break at the end of the row
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay between rows (in milliseconds)
        await typeRow(row + 1);
      } else {
        // Typing is complete for all rows, add a completion message
        typewriterDivs[row].textContent += "\n\nSandflower the sourcerer";
        const element = document.getElementById('link');
        element.innerHTML = "Start Game!";
      }
    }
  
    await typeRow(0);
  }
  
  // Wait for the page to fully load
  window.addEventListener('load', function() {
    var playButton = document.getElementById('playButton');
  
    // Add click event listener to the play button
    playButton.addEventListener('click', function() {
      playAudio();
      startTypewriterEffect();
    });
  });
  
  const textRowsToType = [
    "Dear adventurer!",
    "I hope this message reaches you before its too late! I write to you from Muzak, a village about to be besieged by Moonwalkers! We had almost abandoned all hope. Then, the songbirds fortold us about your vast knowledge of Rythms! With your help, we just might have a chance to defeat the beasts! When you reach the town, click on the divine light to construct the blue tower of Tempo. Then, when the evil Moonwalkers cross the line of Muzak, click on the tower to smite them! Hurry adventurer! You carry the fate of our people within your grasp! Yours in hope and desperation,"
  ];
  