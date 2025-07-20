const generate_poster = document.querySelector('.generate-poster');
const movies_genres = document.querySelector('.movies-genres');

generate_poster.onclick = function() {
    if (user_title_input.value == '' || user_story_input.value == '' || movies_genres.value == 'choose genre') {return}

    const user_input = {
        title: user_title_input,
        story: user_story_input
    }

    console.log(user_title_input.value);
    console.log(user_story_input.value);
    generate_poster.innerHTML = 'Analysing...';
    console.log('Sending to model...');
    SendToModel(user_input.value);
}

function SendToModel(user_input) {
    fetch('http://localhost:6969', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_input }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('success!');
            CreateResponse(data.img);
            generate_poster.innerHTML = 'Analyse Text';
        }

        else {
            console.error('Error:', error);
            alert('There was an error processing your information! Please try again.');
            generate_poster.innerHTML = 'Analyse Text';
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('There was an error with the server! Please try again.');
        generate_poster.innerHTML = 'Analyse Text';
    });
}

function CreateResponse(img) {
    const result = document.createElement('img');
    result.src = img;
    document.body.appendChild(result);
}