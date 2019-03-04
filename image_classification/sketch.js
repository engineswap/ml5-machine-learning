let mobilenet;
let theImage;

function modelReady(){
    console.log('Model loaded!')
    document.getElementById('ModelStatus').innerHTML = 'Model status: ready!'
    document.getElementById('ModelStatus').style.cssText = "color: green; margin-left: 2%;"
    mobilenet.predict(theImage, gotResults)
}

function gotResults(error, results){
    if (error) console.error(error)
    else{
        console.log(results)
        let label = results[0].className
        let probobility = results[0].probability
        document.getElementById('imageClassification').innerHTML = "Label: " + label + '<br>Probablility: ' + probobility*100
        document.getElementById('imageClassification').style.cssText = "color: green; margin-left: 2%;"
    }
}

function imageReady(){
    image(theImage, 0, 0, width, height)
}

function setup(){
    createCanvas(640, 480)
    background(0)
    theImage = createImg('./images/image.jpg', imageReady);
    theImage.hide()
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}

