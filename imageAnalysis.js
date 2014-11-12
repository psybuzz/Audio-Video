var i = 0;
var imgArray = [];
var colorArray = [];
console.log("Loaded js")
video = document.getElementById("video1")
video.addEventListener('loadeddata', function() {
    video.currentTime = i;

    var sampleSize = 10;
    for (var j=0; j<sampleSize + 1; j++){
        (function (frame) {
            var time = frame * video.duration / sampleSize;
            setTimeout(function (){
                if (frame >= sampleSize){
                    generateAverageColors();
                } else {
                    video.currentTime = time;
                    setTimeout(function (){
                        generateThumbnail(time);
                    }, 400);
                }
            }, frame * 800);
        })(j);
    }

}, false);

function playRandom (){
    video.play();
    (function abc (){
        setTimeout(function () {
            video.currentTime = Math.random() * video.duration - 1;
            if (!video.paused) abc();
        }, 1600);
    })();
}

function generateThumbnail(i) {
    //generate thumbnail URL data
    console.log("generated thumbnail");
    canvas = document.getElementById("imageCanvas")
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 600, 400);
    var imageData = context.getImageData(0, 0, 600, 400);
    imgArray.push(imageData.data);

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