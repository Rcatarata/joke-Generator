const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//disable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passsing joke to voicerss api
function tellMe(joke) {
    console.log('tell me:', joke);
     VoiceRSS.speech({
        key: '150e6acb013b465e891ae2dff1be78f5',
        src: joke,
        hl: 'en-au',
        v: 'Isla',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from joke APi
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Pun';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}` 
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        // disable button
        toggleButton();
    }catch(error) {
        //catch Errors here
        console.log('whoops', error);
    }
}

// event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);