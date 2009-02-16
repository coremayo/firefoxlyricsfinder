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
//			var tmpString = "";
//			tmpString = parent.top.document.title;
//			var splitString = tmpString.split("-",2);
//			document.getElementById('artistNameLabel').setAttribute('value',alltrim(splitString[0]));
//			document.getElementById('songTitleLabel').setAttribute('value',alltrim(splitString[1]));
			var songTitle = getLastFMSongName();
			var artistName = getLastFMSongArtist();
			var lyricSrc = new AZLyricSource(songTitle,artistName);
			document.getElementById('artistNameLabel').setAttribute('value',artistName);
			document.getElementById('songTitleLabel').setAttribute('value',songTitle);
			document.getElementById('lyricsTextbox').setAttribute('value',lyricSrc.getLyrics());
			if(lyricSrc.hasLyrics())
			alert('nope');
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




function AZLyricSource(songName, artistName)  {
		this.songName = songName;
		this.artistName = artistName;
		this.lyrics = '';
		this.sourceURL = '';
	
		searchURL = ('http://search.azlyrics.com/search.php?q=' + artistName + ' ' + songName).replace(/ /g, '+');
		search = getPage(searchURL);
		resultMatch = (new RegExp("<a href=\"([\S]+)\" TARGET=\"_blank\">","mi")).exec(search);
		if(resultMatch) {
			pageURL = $1;
			page = getPage(pageURL);
			match = (new RegExp("<!-- END OF RINGTONE 1 -->(.*)<!-- RINGTONE 2 -->", "mi")).exec(page);
			if(match) {
				this.lyrics = $1;
				this.sourceURL = pageURL;
			}
		}
		else {
			alert('none found');
		}
	}
	
AZLyricSource.method('getLyrics', function () { 
					return this.lyrics; 
					});
	
AZLyricSource.method('hasLyrics', function () {
					return this.lyrics.length != 0;
					});
	
AZLyricSource.method('getSourceURL', function () {
					return this.sourceURL;
					});




// From http://www.rgagnon.com/jsdetails/js-0035.html
function getPage(url) {
	pageURL = new	java.net.URL(url);
	
	// step 1, open the URL
	var openConnection = pageURL.openConnection;
	theConnection = openConnection();
	
	// step 2, connect to server
	var t=theConnection.connect;
	t();
	
	// step 3, read the file using HTTP protocol
	var getContent = theConnection.getContent;
	var theURLStream = getContent();
	
	// step 4, get an handle and fetch the content length
	var readStream = theURLStream.read;
	var gcl = theConnection.getContentLength;
	gcLen = gcl(); 
	
	// and finally, read into a variable
	theText ="";
	for (i = 1; i <gcLen; i++) {
		theText += new java.lang.Character(readStream());
	}
	
	return(theText);
}
