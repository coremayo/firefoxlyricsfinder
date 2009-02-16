//Super class of AZLyricSource and DarkLyricSource
//Do not instantiate directly.

function ILyricSource(songName, artistName) {
	this.songName = songName;
	this.artistName = artistName;
	this.lyrics = '';
	this.sourceURL = '';
}

ILyricSource.method('getLyrics', function () { 
					return this.lyrics; 
					});

ILyricSource.method('hasLyrics', function () {
					return this.lyrics.length != 0;
					});

ILyricSource.method('getSourceURL', function 90 {
					return this.sourceURL;
					});