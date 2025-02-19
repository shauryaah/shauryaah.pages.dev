async function fetchLastPlayedSong() {
    const NETLIFY_FUNCTION_URL = 'https://shauryaah.netlify.app/.netlify/functions/lastfm';
    
    try {
        const response = await fetch(NETLIFY_FUNCTION_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const track = data.recenttracks.track[0];

        // Update HTML elements
        const albumArt = document.getElementById('album-art');
        const songNameElement = document.getElementById('song-name').querySelector('a');
        
        // Set album art with fallback
        albumArt.src = track.image[3]['#text'] || 'assets/images/yuuki-sakuna.heart.png';
        
        // Update song details
        songNameElement.textContent = track.name || 'Unknown Song';
        songNameElement.href = track.url || '#';
        document.getElementById('artist-name').textContent = track.artist['#text'] || 'Unknown Artist';
        document.getElementById('album-name').textContent = track.album['#text'] || 'Unknown Album';

    } catch (error) {
        console.error('Error fetching song data:', error);
        // Set fallback values on error
        document.getElementById('album-art').src = 'assets/images/yuuki-sakuna.heart.png';
        document.getElementById('song-name').querySelector('a').textContent = 'Unable to load track';
        document.getElementById('artist-name').textContent = 'Error';
        document.getElementById('album-name').textContent = '';
    }
}

// Initial fetch
fetchLastPlayedSong();

// Refresh every 60 seconds
setInterval(fetchLastPlayedSong, 60000);