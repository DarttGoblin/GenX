const user_title_input = document.querySelector('.user-title-input');
const user_story_input = document.querySelector('.user-story-input');

const title_samples = [
    "The Time Traveler's Dilemma",
    "Midnight Whispers",
    "Lost in the Echo",
    "The Final Countdown",
    "The Dark Horizon",
    "Shadows of Yesterday",
    "Echoes from the Abyss",
    "City of Forgotten Dreams",
    "The Silent Prophecy",
    "Beneath the Crimson Sky"
];
  
const story_samples = [
    "A scientist accidentally discovers time travel and struggles with the consequences of altering the past, facing moral dilemmas as he attempts to fix his mistakes.",
    "A group of strangers start receiving mysterious messages at midnight, which lead them to uncover dark secrets about their lives and the people around them.",
    "In a world where memories are fading, a young woman embarks on a quest to find the source of the mysterious sound that echoes through the city, hoping to restore her forgotten past.",
    "As a dangerous comet approaches Earth, a group of scientists races against time to stop a global catastrophe, but internal betrayals threaten their mission.",
    "On a distant planet, a crew of explorers faces a growing threat from an unknown alien force. With resources dwindling, they must make a desperate decision to survive.",
    "A man wakes up every day in a different version of his past, searching for the event that led to his endless loop while trying to find a way out of the cycle.",
    "Deep beneath the ocean, a research team uncovers an ancient artifact that triggers visions of a forgotten civilization, but some secrets were meant to stay buried.",
    "A city where dreams take physical form begins to crumble as people lose their ability to dream. A young artist must uncover the cause before reality itself unravels.",
    "A mute girl finds an old book that seems to predict the future, but as events unfold, she realizes someone else is reading it too, and they are not on her side.",
    "A small town is thrown into chaos when a red star appears in the sky, bringing with it a series of unexplained events that threaten to change life forever."
];   

GeneratePlaceHolders(title_samples, user_title_input);
GeneratePlaceHolders(story_samples, user_story_input);

function GeneratePlaceHolders(samples, location) {
    var samples_index = 1;
    SlowTyping(samples[0].split(""), location);
    setInterval(() => {
        var samples_letters = samples[samples_index].split("");
        location.placeholder = "";
        SlowTyping(samples_letters, location);
        samples_index == samples.length - 1 ? samples_index = 0 : samples_index++;
    }, 7000);
}

function SlowTyping(samples_letters, location) {
    for (var i = 0; i < samples_letters.length; i++) {
        (function(index) {
            setTimeout(() => { location.placeholder += samples_letters[index]; }, 30 * index);
        })(i);
    }
}