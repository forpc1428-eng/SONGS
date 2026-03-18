const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*2
    });
}

export function animateParticles(getBass){
    function draw(){
        requestAnimationFrame(draw);

        ctx.clearRect(0,0,canvas.width,canvas.height);

        const bass = getBass();

        particles.forEach(p=>{
            p.y += 0.2 + bass*2;
            if(p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x,p.y,p.size + bass*3,0,Math.PI*2);
            ctx.fillStyle = "rgba(0,255,255,0.6)";
            ctx.fill();
        });
    }

    draw();
}
