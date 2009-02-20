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
			var songTitle = getLastFMSongName();
			var artistName = getLastFMSongArtist();
			var lyricSrc = new AZLyricSource(songTitle,artistName);
			if (lyricSrc.lyrics.length < 5) {
				lyricSrc = new DarkLyricsSource(songTitle,artistName);
			}
		  if (lyricSrc.lyrics.length < 5) {
				lyrics = 'lyrics not found';
			}
			document.getElementById('lyricsTextbox').setAttribute('value',lyricSrc.lyrics);
			document.getElementById('artistNameLabel').setAttribute('value',artistName);
			document.getElementById('songTitleLabel').setAttribute('value',songTitle);
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
		regex = new RegExp("<a href=\"(\\S+)\" TARGET=\"_blank\">","mi");
		resultMatch = regex.exec(search);
		if(resultMatch) {
		pageURL = resultMatch[1];
			page = getPage(pageURL);
			regex = new RegExp("<!-- END OF RINGTONE 1 -->([\\s\\S]*)<!-- RINGTONE 2 -->","mi");
			match = regex.exec(page);
			if(match) {
				this.lyrics = match[1].replace(/<.*>/g,'');
				this.lyrics = this.lyrics.replace(/^\s*/,'') + "\n\n\nhttp://www.azlyrics.com";
				this.sourceURL = pageURL;
			}
		}
	}
	
//AZLyricSource.method('getLyrics', function () { 
//					return this.lyrics; 
//					});
	
AZLyricSource.method('hasLyrics', function () {
					return this.lyrics.length != 0;
					});
	
AZLyricSource.method('getSourceURL', function () {
					return this.sourceURL;
					});




function getPage(url) {
	var request =  new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(null);
	var tmpTxt = request.responseText;
	return(tmpTxt);
}




function DarkLyricsSource(songName, artistName)  {
	this.songName = songName;
	this.artistName = artistName;
	this.lyrics = '';
	this.sourceURL = '';
	
	searchURL = ('http://search.darklyrics.com/cgi-bin/dseek.cgi?q=' + artistName + ' ' + songName).replace(/ /g, '+');
	search = getPage(searchURL);
	regex = new RegExp("<a href=\"(\\S+)\" TARGET=\"_blank\">", "mi");
	resultMatch = regex.exec(search);
	if(resultMatch) {
	pageURL = resultMatch[1];
	listPage = getPage(pageURL);
	findAlbum = new RegExp("<a href=\"(\\S+)\".*>.{0,4}" + songName, "mi");
 	listMatch = findAlbum.exec(listPage);

	if(listMatch) {
		albumURL = listMatch[1].replace(/\.\./, "http://www.darklyrics.com");
		albumPage = getPage(albumURL);
		regex = new RegExp(songName + "\\s*</b></font><br>([\\s\\S]+)(?:<br>\s*){3}", "mi");
		foundLyrics = regex.exec(albumPage);
		if(foundLyrics) {
			this.lyrics = foundLyrics[1].replace(/<.*>/g,'');
			this.lyrics = this.lyrics.replace(/^\s*/,'');
			this.lyrics = this.lyrics.substring(0,this.lyrics.search(/(?:\r\n\r\n\r\n|\n\n\n)/)) + "\n\n\nhttp://www.darklyrics.com";
			this.sourceURL = albumURL;
		}
	}
	}
}	
	
	DarkLyricsSource.method('getLyrics', function () { 
	return this.lyrics; 
	});
	
	DarkLyricsSource.method('hasLyrics', function () {
	return this.lyrics.length != 0;
	});
	
	DarkLyricsSource.method('getSourceURL', function () {
	return this.sourceURL;
	});
