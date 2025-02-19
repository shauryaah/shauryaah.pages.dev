// assets/js/fetch.js
async function fetchLastPlayedSong() {
    const url = `https://shauryaah.netlify.app/.netlify/functions/lastfm`;
    const DEFAULT_LASTFM_IMAGE = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
    const FALLBACK_IMAGE = '../images/yuuki-sakuna.heart.png'; // Absolute path

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Handle non-200 responses
        }

        const data = await response.json();

        // Debugging: Log the entire data object to the console
        console.log("Last.fm data:", data);

        const track = data.recenttracks.track[0];

        // Robust error handling for missing data
        if (!track) {
            console.warn("No track data found in Last.fm response.");
            document.getElementById('album-art').src = FALLBACK_IMAGE;
            return; // Exit the function
        }

        // Update HTML
        let albumArtUrl = null;
        if (track.image && track.image[3] && track.image[3]['#text']) {
            albumArtUrl = track.image[3]['#text'];
        }

        document.getElementById('album-art').src =
            (albumArtUrl && albumArtUrl !== DEFAULT_LASTFM_IMAGE)
                ? albumArtUrl
                : FALLBACK_IMAGE;

        const songNameElement = document.getElementById('song-name').querySelector('a');
        songNameElement.textContent = track.name || 'Unknown Song';
        songNameElement.href = track.url || '#';

        document.getElementById('artist-name').textContent = track.artist['#text'] || 'Unknown Artist';
        document.getElementById('album-name').textContent = track.album['#text'] || 'Unknown Album';

    } catch (error) {
        console.error('Error fetching song data:', error);
        document.getElementById('album-art').src = FALLBACK_IMAGE;
    }
}

// Fetch song data on load
fetchLastPlayedSong();

// Optionally refresh every 60 seconds
setInterval(fetchLastPlayedSong, 60000);