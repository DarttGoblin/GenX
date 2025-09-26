
const user_input_container = document.querySelector('.user-input-container');
const generate_poster = document.querySelector('.generate-poster');
const user_type_input = document.querySelector('.user-type-input');
const user_title_input = document.querySelector('.user-title-input');
const user_story_input = document.querySelector('.user-story-input');

generate_poster.onclick = function() {
    if (user_title_input.value == '' || user_story_input.value == '' || user_type_input.value == 'choose movie type') {
        alert('Movie details are missed!');
        return;
    }

    const user_input = {
        prompt: `${user_type_input.value} movie poster titled "${user_title_input.value}" about ${user_story_input.value}`,
        negative_prompt: "blurry, low quality, distorted, watermark",
        steps: 30,
        guidance_scale: 7.5
    };

    console.log(user_type_input.value);
    console.log(user_title_input.value);
    console.log(user_story_input.value);

    generate_poster.textContent = 'Analysing...';
    
    console.log('Sending to model...');
    SendToModel(user_input.value);
}

function SendToModel(user_input) {
    fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_input }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            generate_poster.textContent = 'Analyse Text';
            console.log('success!');
            CreateResponse(data.img);
        }

        else {
            console.error('Error:', error);
            alert('There was an error processing your information! Please try again, or watch the demo instead.');
            generate_poster.textContent = 'Analyse Text';
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('There was an error with the server! Please try again, or watch the demo instead.');
        generate_poster.textContent = 'Analyse Text';
    });
}

function CreateResponse(image) {
    const result_container = document.createElement('div');
    const result_text_container = document.createElement('div');
    const result_movie_type = document.createElement('span');
    const result_movie_title = document.createElement('span');
    const result_movie_story = document.createElement('span');
    const result_image = document.createElement('img');
    
    result_movie_type.textContent = `Type: ${user_type_input.value}`
    result_movie_title.textContent = `Title: ${user_title_input.value}`
    result_movie_story.textContent = `Story: ${user_story_input.value}`
    result_image.src = image;

    result_image.classList.add('result-image');
    result_text_container.classList.add('result-text-container');
    result_container.classList.add('result-container');

    result_text_container.appendChild(result_movie_type);
    result_text_container.appendChild(result_movie_title);
    result_text_container.appendChild(result_movie_story);
    result_container.appendChild(result_text_container);
    result_container.appendChild(result_image);
    user_input_container.appendChild(result_container);
}