async function fetchLastPlayedSong() {
    const url = `https://shauryaah.netlify.app/.netlify/functions/lastfm`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.recenttracks.track[0];

        // Update HTML
        document.getElementById('album-art').src = track.image[3]['#text'] || '../album.png';
        const songNameElement = document.getElementById('song-name').querySelector('a');
        songNameElement.textContent = track.name || 'Unknown Song';
        songNameElement.href = track.url || '#';

        document.getElementById('artist-name').textContent = track.artist['#text'] || 'Unknown Artist';
        document.getElementById('album-name').textContent = track.album['#text'] || 'Unknown Album';
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
}

// Fetch song data on load
fetchLastPlayedSong();

// Optionally refresh every 60 seconds
setInterval(fetchLastPlayedSong, 60000);