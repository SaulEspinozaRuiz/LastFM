const LastFM_URL = '';
const IMG_INVALID =
	'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
var time = 2;
let back;

function Actualizar(Anterior) {
	fetch(LastFM_URL)
		.then((response) => response.json())
		.then((json) => {
			if (!json.recenttracks.track[1]) return;
			const source = json.recenttracks.track[0];
			const second = json.recenttracks.track[1];
			// console.log(source);

			const track = {
				title: source.name,
				album: source.album['#text'],
				artist: source.artist['#text'],
				image: source.image[3]['#text'],
			};
			if (track.image === IMG_INVALID) {
				track.image = './ICON.gif';
			}
			if (
				!!Anterior &&
				Anterior.title == track.title &&
				Anterior.album == track.album
			)
				return;

			Actualizacion();

			function Actualizacion() {
				$('#img').html('<img src=' + track.image + ' id="image" height="150">');
				$('#container').html(
					'<div id="songInfoContainer"><p id="track"><marquee>' +
						track.title +
						'</marquee></p><br><p id="album">' +
						track.album +
						'</p><p id="artist">' +
						track.artist +
						'</p><img id=background src=' +
						track.image +
						' id=background/></div>'
				);
			}

			return (back = track);
		});
}

setInterval(() => {
	Actualizar(back);
}, time * 1000);
