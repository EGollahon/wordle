const rootReducer = (state, action) => {
    let activeGuess = state.guesses[state.guessNum];
    let newGuesses = state.guesses;

    switch (action.type) {
        case 'Delete':
            let nd;
            if (!state.end) {
                let item;
                let stop = false;

                for (let i = activeGuess.length - 1; 0 <= i; i--) {
                    if (!stop) {
                        if (activeGuess[i] !== '') {
                            item = activeGuess[i];
                            stop = true;
                        }
                    }
                }

                if (activeGuess.indexOf('') === 0) {
                    let letterBlock = document.getElementById('guesses').children[state.guessNum].children[0];
                    letterBlock.style.animation = 'boxVibrate 0.3s 1';
                    setTimeout(function() {
                        letterBlock.style.animation = 'none';
                    }, 300);

                    let alert = document.getElementById('alert');
                    if (alert.style.animationName.length < 5) {
                        alert.innerHTML = 'Nothing to delete';
                        alert.style.animation = 'alertFade 3s 1';
                        setTimeout(function() {
                            alert.style.animation = 'none';
                        }, 3000);
                    }
                }

                const index = activeGuess.lastIndexOf(item);
                activeGuess[index] = '';

                newGuesses[state.guessNum] = activeGuess;

                nd = {
                    ...state,
                    guesses: newGuesses,
                    change: !state.change,
                }

                return nd;
            }
            break;

        case 'InputLetter':
            let nl;

            if (!state.end) {
                const index = activeGuess.indexOf('');
                if (activeGuess.includes('') && index < state.answer.length) {
                    activeGuess[index] = action.value;
                } else {
                    let letterBlock = document.getElementById('guesses').children[state.guessNum].children[4];
                    letterBlock.style.animation = 'boxVibrate 0.3s 1';
                    setTimeout(function() {
                        letterBlock.style.animation = 'none';
                    }, 300);

                    let alert = document.getElementById('alert');
                    if (alert.style.animationName.length < 5) {
                        alert.innerHTML = 'Too many letters';
                        alert.style.animation = 'alertFade 3s 1';
                        setTimeout(function() {
                            alert.style.animation = 'none';
                        }, 3000);
                    }
                }
            }

            newGuesses[state.guessNum] = activeGuess;
            nl = {
                ...state,
                guesses: newGuesses,
                change: !state.change,
            }
            return nl;

        case 'SubmitGuess':
            let newTry = state.guessNum + 1;
            let win = state.win;
            let end = state.end;
            let ng;
            let guessBlock = document.getElementById('guesses').children[state.guessNum];
            let keys = document.getElementById('keys');
            let alert = document.getElementById('alert');

            if (activeGuess.indexOf('') === -1 && !state.end) {
                newGuesses[state.guessNum] = activeGuess;

                for (let i = 0; i < 5; i++) {
                    let color = 'transparent';

                    if (newGuesses[state.guessNum][i] === state.answer[i]) {
                        color = '#538D4E';
                    } else if (state.answer.indexOf(newGuesses[state.guessNum][i]) !== -1) {
                        color = '#B59F3B';
                    } else {
                        color = '#3B3A3D';
                    }

                    guessBlock.children[i].style.setProperty('--color', color);

                    setTimeout(function() {
                        guessBlock.children[i].style.animation = 'boxFlip 0.6s 1 forwards';
                    }, 400*i);
                    setTimeout(function() {
                        guessBlock.children[i].style.animation = 'none';
                        guessBlock.children[i].style.backgroundColor = color;
                        guessBlock.children[i].style.border = '2px solid ' + color;

                        for (let j = 0; j < 27; j++) {
                            if (keys.children[j].innerHTML === guessBlock.children[i].innerHTML) {
                                keys.children[j].style.backgroundColor = color;
                            }
                        }
                    }, 600*(i+1));
                }

                if (newGuesses[state.guessNum].join('') === state.answer.join('')) {
                    win = true;
                    end = true;

                    alert.innerHTML = 'You won! The word was ' + state.answer.join('') + '.  Reload the window to play again.';
                    alert.style.animation = 'alertStay 1.5s 1 forwards';
                }

                if (newTry === 6) {
                    end = true;
                    if (!win) {
                        alert.innerHTML = 'You lost! The word was ' + state.answer.join('') + '. Reload the window to play again.';
                        alert.style.animation = 'alertStay 1.5s 1 forwards';
                    } else {
                        alert.innerHTML = 'You won! The word was ' + state.answer.join('') + '. Reload the window to play again.';
                        alert.style.animation = 'alertStay 1.5s 1 forwards';
                    }
                }

                ng = {
                    ...state,
                    guesses: newGuesses,
                    guessNum: newTry,
                    change: !state.change,
                    win: win,
                    end: end
                }

                return ng;
            } else {
                for (let i = 0; i < 5; i++) {
                    guessBlock.children[i].style.animation = 'boxVibrate 0.3s 1';
                    setTimeout(function() {
                        guessBlock.children[i].style.animation = 'none';
                    }, 300);
                }

                let alert = document.getElementById('alert');
                if (alert.style.animationName.length < 5) {
                    alert.innerHTML = 'Not enough letters';
                    alert.style.animation = 'alertFade 3s 1';
                    setTimeout(function() {
                        alert.style.animation = 'none';
                    }, 3000);
                }

                ng = {
                    ...state
                }

                return ng;
            }

        case 'SetAnswer':
            let na;
            let answerArray = action.value.split('');

            na = {
                ...state,
                answer: answerArray
            }

            return na;

        default:
            return state;
    }
}

export default rootReducer;