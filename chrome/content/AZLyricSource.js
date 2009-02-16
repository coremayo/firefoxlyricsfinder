function AZLyricSource(songName, artistName)  {
		this.songName = songName;
		this.artistName = artistName;
		this.lyrics = '';
		this.sourceURL = '';
	
		searchURL = ('http://search.azlyrics.com/search.php?q=' + artistName + ' ' + songName)
			.replace(/ /g, '+');
		search = getPage(searchURL);
		resultMatch = /<a href=\"([^\"])+\" TARGET=\"_blank\">/.exec(search);
		if(resultMatch) {
			pageURL = $1;
			page = getPage(pageURL);
			match = /<!-- END OF RINGTONE 1 -->(.*)<!-- RINGTONE 2 -->/.exec(page);
			if(match) {
				this.lyrics = $1;
				this.sourceURL = pageURL;
			}
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