var i = 150;
var imgArray = [];
var colorArray = [];
console.log("Loaded js")
video = document.getElementById("video1")
video.addEventListener('loadeddata', function() {

    video.currentTime = i;

}, false);

video.addEventListener('seeked', function() {

    /// now video has seeked and current frames will show
    /// at the time as we expect
    generateThumbnail(i);

    /// when frame is captured, increase
    i += 5;
    console.log("seeked")
    /// if we are not passed end, seek to next interval
    if (i <= video.duration) {
        /// this will trigger another seeked event
        video.currentTime = i;

    } else {
        generateAverageColors();
        /// DONE!, next action
    }

}, false);

function generateThumbnail(i) {     
    //generate thumbnail URL data
    console.log("generated thumbnail");
    canvas = document.getElementById("imageCanvas")
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 600, 400);
    var imageData = context.getImageData(0, 0, 600, 400);
    var data = imageData.data;
    //var dataURL = canvas.toDataURL();

    //create img
    var img = document.createElement('img');
    //img.setAttribute('src', dataURL);

    imgArray[imgArray.length] = data;

/*    //append img in container div
    document.getElementById('thumbnailContainer').appendChild(img);*/
}

function generateAverageColors(){
    for (var i=0; i<imgArray.length; i++){
        var dataLength = imgArray[i].length;
        var data = imgArray[i];
        var red = 0;
        var green = 0;
        var blue = 0;
        for (var j=0; j<dataLength; j+=4) {

            red+=data[j]
            green+=data[j+1]
            blue+=data[j+2]
        }
        red/=dataLength/4
        green/=dataLength/4
        blue/=dataLength/4

        colorArray[i] = red + green + blue
    }
}