//Super class of AZLyricSource and DarkLyricSource


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

ILyricSource.method('getSourceURL', function () {
					return this.sourceURL;
					});
// Assuming the current tab in firefox is some page on last.fm with a song playing, this function grabs the song title and artist from the title tag and sets the respective labels in the sidebar to those values.
		function updateLyrics() {
			var tmpString = "";
			tmpString = parent.top.document.title;
			var splitString = tmpString.split("-",2);
			document.getElementById('artistNameLabel').setAttribute('value',alltrim(splitString[0]));
			document.getElementById('songTitleLabel').setAttribute('value',alltrim(splitString[1]));
		}

		// This is just a helper function that will trim any preceeding or trailing whitespace (regular expressions ftw).
		function alltrim(str) {
			return str.replace(/^\s+|\s+$/g, '');
		}
		
		function getLastFMSongName(){
			var basicString = "";
			basicString = parent.top.document.title;
			var newString = basicString.split("-",2);
			return alltrim(newString[1]);
		}

		function getLastFMSongArtist(){
			var basicString = "";
			basicString = parent.top.document.title;
			var newString = basicString.split("-",2);
			return alltrim(newString[0]);
		}




