function DarkLyricsSource(songName, artistName)  {
	this.songName = songName;
	this.artistName = artistName;
	this.lyrics = '';
	this.sourceURL = '';
	
	searchURL = ('http://search.azlyrics.com/search.php?q=' + artistName + ' ' + songName)
	.replace(/ /g, '+');
	search = getPage(searchURL);
	resultMatch = (new RegExp("<a href=\"([^\"])+\" TARGET=\"_blank\">")).exec(search);
	if(resultMatch) {
	pageURL = $1;
	listPage = getPage(pageURL);
	findAlbum = new RegExp("<a href=\"([^\"]+)\" target=\"_blank\"><FONT COLOR=\"#CCCCCC\">" 
							+ $songName, "i");
	listMatch = findAlbum.exec(listPage);

	if(listMatch) {
		albumURL = $1;
		albumPage = getPage(albumURL);
		foundLyrics = (new RegExp(songName + "\s*<\/b><\/font><br>(.+)<a name", "i")).exec(albumPage);
		if(foundLyrics) {
			this.lyrics=$1;
			this.sourceURL = albumURL;
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
	
	
	
	
	// From http://www.rgagnon.com/jsdetails/js-0035.html
	function getPage(url) {
	pageURL = new;
	java.net.URL(url);
	
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