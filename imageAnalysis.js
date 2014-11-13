var i = 0;
var imgArray = [];
var colorArray = [];
var normalized = [];
console.log("Loaded js")
video = document.getElementById("video1")
video.addEventListener('loadeddata', function() {
    video.currentTime = i;
//4972 seconds in Totoro
    var sampleSize = 994;
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
                    }, 600);
                }
            }, frame * 1000);
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

//Fills colorArray with averaged color values for each pixel
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

//The output of colorArray
colorArray = [61.21212083333333,219.85024583333333,199.8712625,200.93015416666668,215.0498125,222.26740416666667,331.09175,329.586875,304.5995958333333,314.0960416666667,305.7013333333333,305.33755833333333,306.0712458333333,310.9558916666667,217.00967500000002,294.338825,296.07075000000003,298.8635791666667,300.8811083333333,291.9736125,300.6068375,301.4332375,303.8531541666667,298.3946666666667,294.1627,60.63829583333333,273.8573416666667,278.6597291666667,186.46672916666665,214.66535000000002,227.51369583333332,255.664675,225.42184583333335,272.236125,234.807025,281.42075,237.18544583333335,245.04131666666666,169.49316666666667,219.43760416666666,267.966425,286.83880833333336,280.3864291666667,253.16295,253.547825,289.1294833333333,263.34045833333334,271.90295000000003,195.16444583333333,261.92519166666665,201.17258750000002,213.11489583333332,227.51159583333336,188.76414583333332,178.02172916666666,224.19265416666667,259.99015833333334,294.018575,258.9562166666667,286.27261666666664,267.13795833333336,271.0565916666667,302.46555,278.79615,263.06903750000004,257.2379833333333,258.4397375,229.74990416666665,209.31839166666666,229.70147083333333,251.18671250000003,261.6297125,245.2282625,264.07689166666665,237.7835208333333,220.74180833333332,233.88997083333334,268.8025833333333,272.93025833333337,219.94136666666668,265.74347083333333,225.4333208333333,266.64109583333334,272.2135083333333,211.301875,212.5147791666667,234.86045833333333,249.19339583333334,249.84657083333332,203.63353750000002,165.84450416666667,169.54829999999998,220.9618,230.43772916666666,245.93522916666666,257.1699541666667,165.37809583333333,216.76902916666666,185.07570416666667,193.500225,189.2576375,190.02457500000003,193.79717916666667,191.6900625,254.35870833333334,246.38254999999998,222.43781249999998,249.56434583333333,245.58265,247.79067500000002,254.05657083333332,226.17060416666666,240.811825,223.89843333333334,253.4409125,230.19564583333334,267.0400583333334,221.73206666666664,250.4631791666667,264.9292625,214.58496666666667,201.136875,145.25849166666666,232.7404625,104.33614583333333,187.83884166666667,145.848825,147.62956666666668,103.85683333333333,268.90329583333335,141.62131250000002,133.06366666666668,112.82825833333334,101.62664166666667,122.47815833333334,162.52237083333335,188.34260416666666,221.40957916666667,106.1928375,170.11003333333332,187.9681791666667,251.37112916666666,267.19367916666664,178.24820416666665,172.75798333333333,194.26836666666668,227.73804166666667,184.1805958333333,189.89792916666667,141.55476666666667,140.1164083333333,173.67420416666667,129.43120833333333,163.96684583333334,255.60325833333334,215.42900416666666,237.59404583333333,247.0772208333333,242.96031666666667,248.2305125,252.68449166666664,256.34063333333336,281.6795416666667,256.33364166666667,250.74207916666666,251.73728333333332,276.73024166666664,262.1569583333333,266.3709333333333,260.6063041666667,257.00035833333334,268.00577499999997,263.28435,267.22712916666666,262.55915416666664,265.0104875,106.454125,254.5498,285.3274666666667,275.9649125,263.7168625,248.009675,196.21769583333335,249.2608666666667,214.20623333333333,226.3311791666667,227.59780416666666,219.8589375,228.77057916666666,215.75327499999997,226.3943125,231.87135,229.47085833333333,191.90980000000002,186.2440666666667,194.24555416666666,197.98097916666666,195.40831250000002,183.48953749999998,194.65930833333334,217.9541,198.72757916666666,199.47746250000003,234.137625,248.50317083333331,254.81997916666666,248.5076166666667,237.85995000000003,117.95996666666666,143.42759166666667,180.44116666666667,103.2253875,105.59021666666666,128.277225,104.3253375,98.87726666666667,97.04371666666667,109.13639583333334,110.67514583333335,93.3716125,158.79390833333332,133.04407916666668,163.3018583333333,191.95387083333333,96.43352083333333,120.6794125,133.8607166666667,150.08527916666668,137.13200416666666,126.85699166666666,133.29205000000002,184.82329583333333,198.62739166666665,153.30386249999998,167.4928708333333,124.10068333333334,148.76504999999997,128.707375,258.53442083333334,241.72558750000002,52.5052125,252.24143750000002,317.309975,279.2309916666667,271.3565208333333,266.9521,272.81681249999997,313.033925,293.8357833333333,251.341425,265.59214583333335,257.4142083333333,259.3605083333333,300.9348791666667,304.6717208333333,247.0664875,252.66982916666666,202.88675416666666,199.25182083333334,206.80198333333334,238.21645416666667,285.6987458333333,246.09420416666666,246.00130416666667,242.35818333333333,273.2847958333333,258.7513666666666,287.1154833333334,261.35602916666664,254.19300416666664,256.9680875,284.3211,280.43736666666666,244.8836458333333,260.1584875,277.8577875,277.67630833333334,287.7717083333333,248.22965000000002,234.3973791666667,249.45555416666667,315.1662416666667,261.42532916666664,332.9800583333333,282.54617083333335,297.97551250000004,235.1404,162.36005,200.92359166666665,272.61901666666665,256.0989125,254.1210625,231.04795833333336,229.72820833333333,228.68980833333333,248.8390791666667,240.66933333333336,296.14633749999996,215.90881666666667,223.0750291666667,250.30442083333332,223.80392083333334,229.11326250000002,257.2978791666667,270.48232083333335,262.77613333333335,265.1083041666667,264.61445416666663,229.110875,236.41472916666666,252.51992083333334,251.96566666666666,249.03816666666665,281.2863791666667,306.3574625,326.71243749999996,291.33455833333335,248.66441666666668,260.13120833333335,227.37135,272.4778125,251.01330000000002,252.385775,154.54949583333334,246.50387916666665,240.16989999999998,266.1076875,250.75268749999998,286.0667458333333,287.2710083333333,255.95369166666666,246.022275,290.61502083333335,238.43835833333333,267.4146791666667,250.57397083333336,263.69625833333333,261.34335,281.25585,277.57465,164.21005416666665,84.63816666666666,173.52184583333334,247.55085833333334,146.32650416666667,253.37812499999998,250.07501666666667,259.1438083333333,244.32665833333334,286.438275,287.9047708333333,292.53698333333335,287.9453125,231.15900833333333,176.0678875,185.96746666666667,202.40947916666667,162.40385416666666,121.487275,134.10288333333332,154.44405416666666,148.12555833333334,156.7112,145.51037916666667,167.3348625,235.18301666666667,227.99271666666664,196.01816666666667,201.31197916666665,195.26425833333334,231.83771666666667,232.95385,229.284475,227.74187916666665,244.1843375,223.66969583333332,226.67409583333333,278.460375,260.9053583333333,290.7834541666667,248.34735833333332,221.45410833333332,233.49263333333334,215.4671875,239.49509583333332,239.18410416666666,253.76449583333334,255.158075,256.9826125,276.8672625,256.51115,285.4450708333333,247.08812916666665,261.08635833333335,273.6079708333333,235.493675,246.2510375,259.88189166666666,259.17691666666667,234.46005833333334,217.07317083333334,261.311625,220.98344166666666,249.95203333333333,254.32572083333332,263.43696666666665,217.0990875,231.82934166666666,195.97107499999998,194.82589583333333,247.4718208333333,226.78165833333335,191.08257083333334,244.9019166666667,252.37042083333333,259.01933333333335,239.86487499999998,240.89365833333335,242.80728750000003,173.88415416666666,187.17337083333334,224.509025,232.98553333333334,236.83895833333332,247.34343333333334,246.97997083333334,227.44283333333334,280.8946666666667,279.08454166666667,284.6491291666667,243.53969166666667,228.14465416666667,229.07040833333332,163.53000416666666,196.4015875,247.0803125,261.35872083333334,234.11399999999998,237.33150833333332,252.61458333333331,239.29952916666667,255.9426,241.50954583333336,241.36577499999999,240.3628958333333,231.86812500000002,283.8158375,301.5234,247.8717916666667,244.25115,212.0057375,199.31732499999998,200.7497125,154.28893333333335,272.7530875,188.01008333333334,185.63160833333333,150.4442125,229.86452916666667,244.41764583333332,178.64134583333333,256.2554625,142.3756875,154.087125,221.72026666666665,218.69622499999997,221.674925,166.92739583333335,162.07843333333332,207.95728333333335,207.5970625,316.9791583333333,219.65059583333334,228.687275,145.2677125,95.4825375,244.02367083333334,192.33353333333335,276.623875,272.9756875,228.73231666666663,253.0451291666667,348.4386,287.3520208333333,265.69657083333334,255.29149583333333,241.04760416666664,253.3410166666667,283.1965416666667,204.4774083333333,260.5140166666667,283.2675125,267.26223749999997,330.64060416666666,327.8248708333333,321.9192,260.6618875,253.11079166666667,330.80219166666666,237.57060833333333,189.95512499999998,192.88831666666667,272.51761250000004,284.8567291666667,281.82997916666665,190.86550833333334,193.66729166666664,205.55901666666665,181.01482083333335,182.91687083333335,163.1790375,179.40949583333332,176.4630625,186.57657916666665,206.31220416666667,212.65105833333337,233.28902083333332,228.75747083333331,205.91683333333333,210.80587500000001,213.28947916666664,229.43197499999997,217.61894999999998,223.77013749999998,226.72730833333333,222.74701666666667,218.00465416666668,189.6455875,183.346475,204.78412916666667,200.25320833333333,169.74867083333334,171.756925,189.9054625,202.99065,216.35101666666665,223.7622875,210.69164583333333,128.3227625,127.62809583333333,152.27971250000002,174.33120833333334,248.33805833333332,194.130975,215.42416250000002,242.01830416666667,240.23652499999997,193.97856666666667,142.49453333333332,140.5260583333333,206.9086125,215.16002916666667,167.82404583333334,160.64981666666665,132.61429583333333,132.7820625,157.06877916666667,100.73912916666667,121.602175,131.95257916666668,116.67522916666667,158.93046249999998,143.69804166666665,107.38633333333334,131.35891666666666,134.58985416666667,126.56787083333333,223.54115000000002,228.51855,161.57734583333334,160.47204166666668,205.53682083333334,163.01583333333335,207.51284166666665,122.11778333333334,120.82930416666667,131.11200416666668,109.92910833333335,124.76133333333334,173.37780833333335,169.02350833333333,157.7865375,225.20488749999998,183.23445416666667,215.28441249999997,125.48587083333334,160.91047083333333,160.57104999999999,149.81255,219.38285416666668,222.0373,152.73714999999999,214.79730833333335,194.16274166666668,193.03130416666667,185.1420625,137.22528333333332,171.43845,165.85354583333333,156.59620416666667,122.32976249999999,151.60718333333335,154.8483125,131.0114375,132.44135833333334,93.94348333333333,143.45217083333333,141.21454166666666,153.83099166666668,163.19419166666665,209.89718333333334,189.31775,105.41665833333333,141.42601666666667,195.3026,217.4697833333333,172.97178333333335,176.89620416666668,173.273075,172.10207083333333,123.4365875,96.2003625,105.352375,125.69479166666666,149.95252083333332,142.29896666666667,130.31816666666668,194.82484166666666,203.68947083333336,197.40654583333333,155.03605833333333,202.42702083333336,154.30133333333333,146.86377916666666,209.10748333333333,142.424475,135.13747916666665,215.38532083333337,271.0592833333334,349.419,201.29270833333334,245.11522083333335,307.91975,236.2968125,228.53659583333334,363.619,251.69006666666667,248.3250708333333,160.44908333333333,157.54072083333335,208.49649583333334,156.98702083333333,134.21649166666668,159.49012916666666,147.33249583333333,142.512475,148.4043875,179.92627083333332,189.4681875,183.6198875,156.02032916666667,154.43501666666668,155.99417083333333,153.943225,159.0123125,134.92362083333333,159.52820833333334,158.03877083333333,161.8412,163.08506666666665,157.14010833333333,188.89503333333332,151.34144166666667,151.28009583333335,155.4137,144.26707083333332,111.7501375,107.722625,120.15201666666667,126.46183333333333,152.0037375,105.3487125,132.2468,135.28804583333334,157.14256666666665,162.37073333333333,159.82630833333332,153.4959125,159.36236250000002,144.3851,65.21563333333333,139.53594166666667,108.82237916666666,147.73498333333333,168.47617083333336,134.94805416666668,168.20049166666666,156.23455416666667,155.17059166666667,190.61860416666667,188.19533333333334,189.10718333333335,133.6191375,176.2854125,183.1754375,140.11670416666666,82.17299583333333,271.7068958333333,315.75135416666666,234.15814583333332,263.31614583333334,257.52864999999997,206.30143333333336,206.5875458333333,248.08754166666665,265.26369166666666,209.170175,225.7364125,208.61388749999998,252.33425,165.16547500000001,180.94667916666666,186.57065,200.9094166666667,202.37520833333332,232.44735416666668,234.25850833333334,179.83587083333333,181.005475,233.01063333333335,222.5148375,225.73060416666667,226.86295416666667,238.70234166666665,257.0544458333334,262.7922083333333,240.7248125,223.49112083333335,223.51589166666668,225.85672916666667,227.12880833333332,254.04895,255.82242083333335,251.78314166666667,291.05191249999996,258.54268333333334,247.92487500000001,255.2737833333333,255.10250416666668,231.20540416666665,230.9656375,179.9122375,181.43030416666667,171.3694125,250.85786666666667,188.70677500000002,194.8082875,214.94382083333332,193.21237083333335,190.4307875,136.8952375,152.77997083333332,139.52918333333332,137.77387083333332,157.1413375,168.89815416666667,229.72564166666666,181.87691666666666,188.76224166666665,166.50636666666668,148.08354166666666,153.45543750000002,120.12382916666667,179.2000625,187.80183333333332,256.1693875,215.58895416666667,196.91269166666666,175.35297500000001,187.08111666666665,263.7347666666667,203.03205,250.4630416666667,258.6429166666667,264.14306666666664,220.22730416666667,249.2046375,219.86685,259.6938666666667,212.81169166666666,217.97750833333333,231.4481416666667,215.76800000000003,194.32061249999998,220.42217083333333,182.1722125,188.27935416666668,218.62832916666665,217.05975,225.62054999999998,187.28359583333332,278.163925,214.00929583333334,193.38927916666668,190.97777916666666,192.43562500000002,191.99859583333333,218.4361,199.609075,210.61976249999998,208.65982916666667,238.80027916666666,220.26067916666665,271.625025,172.90497916666666,207.0457166666667,171.66506666666666,174.28823333333332,221.20265833333335,246.26538750000003,233.65690416666666,265.8566916666666,154.72395,245.84322500000002,236.88342083333333,235.88892500000003,230.463325,172.80869166666668,179.23022916666665,159.22172916666665,184.49211250000002,174.74137916666666,188.22225833333334,216.6370625,224.4037625,254.93789166666667,260.00986666666665,215.38643333333334,212.5146125,261.45034583333336,194.06239166666666,197.1627125,284.5963625,268.2915833333334,241.79864583333335,178.79181250000002,271.7496875,183.29486666666665,229.307725,201.8899625,240.69960416666666,241.57289583333335,235.33974583333332,242.67715000000004,242.44305833333334,270.86553749999996,173.0569875,260.0481208333333,207.874125,99.5036125,137.99229166666666,138.31047916666665,170.19661250000001,201.037325,159.85973333333334,254.02822916666668,196.8159875,102.60676666666666,220.14158333333336,204.45855833333334,168.42766666666665,222.2499916666667,230.70330416666667,264.3258333333333,281.57960833333334,279.16505416666666,273.81937916666664,233.14252916666666,251.584975,264.62144166666667,208.749725,198.12519583333335,208.17604583333335,239.77342083333332,118.98716666666667,143.24982083333333,154.21262916666666,177.40554583333332,174.06840833333334,105.19373333333333,123.71293750000001,97.823125,79.37786666666668,100.01575416666667,207.57607916666666,225.44708333333332,216.1920333333333,195.22393333333335,187.22278333333333,173.94271666666668,296.6195916666667,185.8008125,248.03434166666665,121.15472083333333,201.7597875,204.07127916666667,233.70008333333334,158.54171250000002,182.47397916666665,234.8971875,193.18960833333333,208.96852916666666,211.1552375,276.60109166666666,243.74662916666668,211.59524583333334,210.17104999999998,230.45573333333334,231.16792916666668,248.838575,223.6359791666667,200.6795875,207.01814166666668,181.42402083333334,163.83692083333335,199.5346166666667,214.12088333333335,127.83611250000001,256.118075,161.00785,169.43495416666667,192.9938625,193.3590875,207.59872916666666,207.59872916666666,256.03400416666665,219.8834541666667,214.08700833333333,229.7495416666667,241.7346,230.27938750000004,161.964325,236.40357916666667,200.35035416666665,241.8724208333333,256.5521625,184.8423,186.74877916666668,254.22261249999997,191.33316666666667,243.69390833333333,165.1304,211.83671666666666,159.61446666666666,158.587625,244.63090833333334,230.09934166666665,232.55800833333336,244.9363666666667,200.62367916666665,226.91963333333334,226.14070416666664,145.48910416666666,155.46872083333335,141.15527916666667,137.86114166666667,234.88927916666668,194.95949166666668,147.44477083333334,138.95187083333332,55.44074583333333,290.7464708333333,293.54145833333337,311.03485,301.93073333333336,311.8006916666667,311.8006916666667,315.3053208333333,315.3053208333333,316.7792333333333,307.0025875,310.775375,300.3275291666667,315.44342916666665,315.2751833333333,315.3965,294.1139375,294.1139375,295.67921666666666,295.67921666666666,298.80533749999995,294.54919583333333,297.81275833333336,48.000808333333325]

function normalize(){
    var sum = 0
    for (var i =0; i<colorArray.length; i++){
        sum+=colorArray[i]
    }
    var average = sum/colorArray.length;
    console.log(average);

    for (var i=0; i<colorArray.length; i++){
        normalized[i] = colorArray[i] - average;
    }

    console.log(normalized);
    console.log("Average: " + average);
    console.log("Highest luminence value: " + Math.max.apply(Math, normalized));
    console.log("Lowest luminence value: " + Math.min.apply(Math, normalized));
}
normalize();