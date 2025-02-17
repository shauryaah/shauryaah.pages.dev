async function fetchLastFmTrack() {
  const url = `https://shauryaah.netlify.app/.netlify/functions/lastfm`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const track = data.recenttracks.track[0];
    console.log(track); // Add this line to handle the fetched track
  } catch (error) {
    console.error('Error fetching the track:', error);
  }
}

// Call the function to fetch the track
fetchLastFmTrack();