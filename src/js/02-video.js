const Player = require("@vimeo/player");
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

    player.on('timeupdate', throttle(function (evt) {
        console.log(evt.seconds);
        localStorage.setItem('videoplayer-current-time', JSON.stringify(evt.seconds));
    }, 1000));

    if (localStorage.getItem('videoplayer-current-time')) {
    player.setCurrentTime(JSON.parse(localStorage.getItem('videoplayer-current-time'))).then(function (seconds) {
    console.log(`Час відтворення відео із localeStorage: ${seconds}`);
})
    .catch(function (error) {
    switch (error.name) {
    case 'RangeError':
    console.log('Час був менше 0 або більше, ніж тривалість відео');
    break;

    default:
    console.log('помилки викликані іншими причинами');
    break;
}
});
}