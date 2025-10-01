const submit = document.querySelector('.submit');
const git = document.querySelector('.git');
const demo = document.querySelector('.demo');

submit.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

git.onclick = function() {
    window.open('https://github.com/DarttGoblin/GenX_server', '_blank');
}

demo.onclick = function() {
    window.open('https://drive.google.com/file/d/1OH1SILnZrUPCJNHu0IQKPr4nieBpq1Ab/view?usp=sharing', '_blank');
}