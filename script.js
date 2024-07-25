document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://spotify-scraper.p.rapidapi.com/v1/track/download?track=${encodeURIComponent(searchInput)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f71ced5d5cmsh6977ce00554178bp1c5362jsndc33b8ecde10',
            'x-rapidapi-host': 'spotify-scraper.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        if (result.status && result.youtubeVideo ) {
            const songTitle = result.youtubeVideo.title;
            var coverImage = document.getElementById("coverImage");
            const audioUrl = result.youtubeVideo.audio[2].url; // Taking the first audio format
            const coverurl=result.spotifyTrack.album.cover[2].url;
            document.getElementById('songTitle').innerText = songTitle;

            // Set the display style to 'block'
            coverImage.style.display = "block";
            
            // Set the source of the image
            coverImage.src = coverurl;
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.style.display='block';
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        } else {
            document.getElementById('result').innerText = 'Song not found!';
        }
    } catch (error) {
        console.error(error);
        document.getElementById('result').innerText = 'An error occurred. Please try again.';
    }
});
