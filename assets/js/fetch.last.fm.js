const apiKey = 'YOUR_LAST_FM_API_KEY';
const user = 'YOUR_LAST_FM_USERNAME';
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const tracks = data.recenttracks.track;
        tracks.forEach(track => {
            console.log(`Artist: ${track.artist['#text']}, Track: ${track.name}`);
        });
    })
    .catch(error => console.error('Error fetching data from Last.fm:', error));