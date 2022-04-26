
function changeTheme() {
    let light = document.getElementById('light-css');
    let dark = document.getElementById('dark-css');

    if (light.media === 'none') {
        light.media = '';
        dark.media = 'none';
    } else {
        light.media = 'none';
        dark.media = '';
    }
}