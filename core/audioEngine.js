let analyzer, dataArray;

export function initAudioEngine(){
    const audio = document.getElementById("audio");

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const src = ctx.createMediaElementSource(audio);

    analyzer = ctx.createAnalyser();
    src.connect(analyzer);
    analyzer.connect(ctx.destination);

    analyzer.fftSize = 64;
    dataArray = new Uint8Array(analyzer.frequencyBinCount);
}

export function getBass(){
    if(!analyzer) return 0;

    analyzer.getByteFrequencyData(dataArray);
    return dataArray[2]/255;
}
