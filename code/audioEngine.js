export function initAudioEngine(){
    const audio = document.getElementById("audio");

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const src = ctx.createMediaElementSource(audio);

    const analyzer = ctx.createAnalyser();
    src.connect(analyzer);
    analyzer.connect(ctx.destination);

    analyzer.fftSize = 64;

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);

    function tick(){
        requestAnimationFrame(tick);
        analyzer.getByteFrequencyData(dataArray);

        const bass = dataArray[2] / 255;
        console.log("Bass:", bass);
    }

    tick();
}
