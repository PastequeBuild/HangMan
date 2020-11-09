const words = ['alibaba', 'bateau', 'piscine', 'zoro']
let randomWord = words[Math.floor(Math.random() * (words.length - 0) + 0)]
let detecKeyPress = true
let numberOfTrials = 0
let numberOfFails = 0
let numberOfRemainingLetters = randomWord.length
let lettersAlreadyTried = []

const hiddenWordContainerElt = document.getElementById('hiddenWordContainer')

for (let i = 0; i < randomWord.length; i++) {
	const letterContainerElt = document.createElement('div')
	letterContainerElt.id = 'letterContainer'
	const letterElt = document.createElement('span')
	letterElt.className = 'letter'
	letterElt.id = 'letter:' + i
	letterElt.textContent = randomWord[i]
	letterElt.style.visibility = 'hidden'
	letterContainerElt.appendChild(letterElt)
	hiddenWordContainerElt.appendChild(letterContainerElt)
}

document.onkeypress = e => {

	if (detecKeyPress) {
	    e = e || window.event

	    const letter = String.fromCharCode(e.keyCode)

	    if (isLetter(letter) && !lettersAlreadyTried.includes(letter)){

	    	numberOfTrials++

	    	if (randomWord.includes(letter)) {

	    		let i = 0
	    		for (randomWordLetter of randomWord) {
	    			if (randomWordLetter === letter) {
	    				document.getElementById('letter:' + i).style.visibility = 'visible'
	    				numberOfRemainingLetters--
	    			}
	    			i++
	    		}

	    		if (numberOfRemainingLetters === 0) {
	    			detecKeyPress = false
	    			document.getElementById('winText').style.visibility = 'visible'
	    			setTimeout( () => {
	    				location.reload()
	    			}, 2000)    			
	    		}

	    	} else {

	    		numberOfFails++

		    	document.getElementById('failuresCounter').textContent = numberOfFails + '/10 échecs'
		    	document.getElementById('hangManImage').src = './images/' + numberOfFails + '.jpg'
			    	
	    		if (numberOfFails === 10) {
	    			detecKeyPress = false
	    			document.getElementById('loseText').textContent += ' Le mot était ' + randomWord + ' !'
	       			document.getElementById('loseText').style.visibility = 'visible'
	    			setTimeout( () => {
	    				location.reload()
	    			}, 2000)
	    		} else {
			    	lettersAlreadyTried.push(letter)
			    	const triedLettersElt = document.getElementById('triedLetters')
			    	const newTriedLetterElt = document.createElement('span')
			    	newTriedLetterElt.textContent = letter.toUpperCase()
			    	newTriedLetterElt.id = 'triedLetter'
			    	triedLettersElt.appendChild(newTriedLetterElt)
		    	}
	    	}
	    }
	}
}

function isLetter(str) {
 	return str.length === 1 && str.match(/[a-z]/i);
}