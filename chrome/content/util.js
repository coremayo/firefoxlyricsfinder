// Miscellaneous helper functions


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
