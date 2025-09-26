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
    alert('Demo will be available very soon...');
    // window.open('', '_blank');
}