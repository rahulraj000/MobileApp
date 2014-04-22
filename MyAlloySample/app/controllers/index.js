$.index.open();
var Barcode = require('ti.barcode');

Barcode.allowRotation = true;
Barcode.displayedMessage = ' ';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = true;
var scannedBarcodes = {}, scannedBarcodesCount = 0;
function doClick(e) {
     reset();
  Barcode.capture({
        animate: true,
        overlay:$.overlay,
        showCancel: false,
        showRectangle: false,
        keepOpen: true
    });
   }
   
function reset() {
    scannedBarcodes = {};
    scannedBarcodesCount = 0;
    $.cancelButton.title = 'Cancel';
    $.scanResult.text = ' ';
    $.scanContentType.text = ' ';
    $.scanFormat.text = ' ';
    $.scanParsed.text = ' ';
    
}
Barcode.addEventListener('error', function (e) {
    
     $.scanContentType.text = ' ';
     $.scanFormat.text = ' ';
     $.scanParsed.text = ' ';
     $.scanResult.text = e.message;
      
    
});
Barcode.addEventListener('cancel', function (e) {
    Ti.API.info('Cancel received');
});
Barcode.addEventListener('success', function (e) {
    Ti.API.info('Success called with barcode: ' + e.result);
    if (!scannedBarcodes['' + e.result]) {
         scannedBarcodes[e.result] = true;
         scannedBarcodesCount += 1;
         $.cancelButton.title = 'Finished (' + scannedBarcodesCount + ' Scanned)';
	     $.scanResult.text += e.result + ' ';
         $.scanContentType.text += parseContentType(e.contentType) + ' ';
         $.scanFormat.text += e.format + ' ';
         $.scanParsed.text += parseResult(e) + ' ';
        Barcode.cancel();
        
       
    }
});

function parseContentType(contentType) {
    switch (contentType) {
        case Barcode.URL:
            return 'URL';
        case Barcode.SMS:
            return 'SMS';
        case Barcode.TELEPHONE:
            return 'TELEPHONE';
        case Barcode.TEXT:
            return 'TEXT';
        case Barcode.CALENDAR:
            return 'CALENDAR';
        case Barcode.GEOLOCATION:
            return 'GEOLOCATION';
        case Barcode.EMAIL:
            return 'EMAIL';
        case Barcode.CONTACT:
            return 'CONTACT';
        case Barcode.BOOKMARK:
            return 'BOOKMARK';
        case Barcode.WIFI:
            return 'WIFI';
        default:
            return 'UNKNOWN';
    }
}

function parseResult(event) {
    var msg = '';
    switch (event.contentType) {
        case Barcode.URL:
            msg = 'URL = ' + event.result;
            break;
        case Barcode.SMS:
            msg = 'SMS = ' + JSON.stringify(event.data);
            break;
        case Barcode.TELEPHONE:
            msg = 'Telephone = ' + event.data.phonenumber;
            break;
        case Barcode.TEXT:
            msg = 'Text = ' + event.result;
            break;
        case Barcode.CALENDAR:
            msg = 'Calendar = ' + JSON.stringify(event.data);
            break;
        case Barcode.GEOLOCATION:
            msg = 'Geo = ' + JSON.stringify(event.data);
            break;
        case Barcode.EMAIL:
            msg = 'Email = ' + event.data.email + '\nSubject = ' + event.data.subject + '\nMessage = ' + event.data.message;
            break;
        case Barcode.CONTACT:
            msg = 'Contact = ' + JSON.stringify(event.data);
            break;
        case Barcode.BOOKMARK:
            msg = 'Bookmark = ' + JSON.stringify(event.data);
            break;
        case Barcode.WIFI:
            return 'WIFI = ' + JSON.stringify(event.data);
        default:
            msg = 'unknown content type';
            break;
    }
    return msg;
   }

function doCancel()
{
	Barcode.cancel();
	
	
}
function switchCamera()
{
	Barcode.useFrontCamera = !Barcode.useFrontCamera;
    switchButton.title = Barcode.useFrontCamera ? 'Back Camera' : 'Front Camera';
	
	
}
