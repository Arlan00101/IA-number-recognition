const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// ---------- Dataset ----------
const dataset = [];
for (let i = 0; i < 200; i++) {
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  const label = (x*x + y*y < 0.5) ? 1 : 0;
  dataset.push({x,y,label});
}

// ---------- Red neuronal ----------
const HIDDEN = 6; // más neuronas
const lr = 0.005;
let epoch = 0;
let running = false;

let w1 = Array.from({length:HIDDEN},()=>[(Math.random()-0.5)*0.3,(Math.random()-0.5)*0.3]);
let b1 = Array.from({length:HIDDEN},()=>0);
let w2 = Array.from({length:HIDDEN},()=> (Math.random()-0.5)*0.3);
let b2 = 0;

const sigmoid = x=>1/(1+Math.exp(-x));

// ---------- Forward ----------
function forward(x,y){
  const h = [];
  for(let i=0;i<HIDDEN;i++){
    h[i] = sigmoid(x*w1[i][0]+y*w1[i][1]+b1[i]);
  }
  let z2 = b2;
  for(let i=0;i<HIDDEN;i++) z2 += h[i]*w2[i];
  return {h,out:sigmoid(z2)};
}

// ---------- Entrenamiento ----------
function train(){
  let totalError=0;
  dataset.forEach(p=>{
    const {h,out}=forward(p.x,p.y);
    const error = out - p.label;
    totalError += error*error;

    // Capa salida
    for(let i=0;i<HIDDEN;i++) w2[i]-=lr*error*h[i];
    b2 -= lr*error;

    // Capa oculta
    for(let i=0;i<HIDDEN;i++){
      const dh = error*w2[i]*h[i]*(1-h[i]);
      w1[i][0]-=lr*dh*p.x;
      w1[i][1]-=lr*dh*p.y;
      b1[i]-=lr*dh;
    }
  });
  epoch++;
  document.getElementById("epoch").textContent = `Epoch: ${epoch}`;
  document.getElementById("error").textContent = `Error: ${(totalError/dataset.length).toFixed(3)}`;
  draw();
}

// ---------- Visualización ----------
const neuronColors = ["rgba(255,255,0,0.2)","rgba(0,255,255,0.2)","rgba(255,0,255,0.2)",
                      "rgba(0,255,0,0.2)","rgba(255,165,0,0.2)","rgba(128,0,255,0.2)"];

function draw(){
  const res=120;
  const cell=W/res;
  ctx.clearRect(0,0,W,H);

  // ---------- Heatmap final con alpha animada ----------
  for(let i=0;i<res;i++){
    for(let j=0;j<res;j++){
      const x=(i/res)*2-1;
      const y=(j/res)*2-1;
      const {out}=forward(x,y);
      // efecto respiración: alpha modulado por sin de epoch
      const alpha = 0.5 + 0.3*Math.sin(epoch/10);
      const r = Math.floor(200*(1-out));
      const g = Math.floor(200*out*0.3);
      const b = Math.floor(200*out);
      ctx.fillStyle=`rgba(${r},${g},${b},${alpha})`;
      ctx.fillRect(i*cell,H-j*cell,cell,cell);
    }
  }

  // ---------- Activación de cada neurona oculta ----------
  for(let k=0;k<HIDDEN;k++){
    for(let i=0;i<res;i++){
      for(let j=0;j<res;j++){
        const x=(i/res)*2-1;
        const y=(j/res)*2-1;
        const z = x*w1[k][0]+y*w1[k][1]+b1[k];
        const h = sigmoid(z);
        // umbral dinámico que fluctúa con el tiempo
        if(Math.abs(h-0.5)<0.03 + 0.02*Math.sin(epoch/5 + k)){
          ctx.fillStyle=neuronColors[k];
          ctx.fillRect(i*cell,H-j*cell,cell,cell);
        }
      }
    }
  }

  // ---------- Puntos ----------
  dataset.forEach(p=>{
    ctx.beginPath();
    ctx.arc((p.x+1)*0.5*W,H-(p.y+1)*0.5*H,4,0,Math.PI*2);
    ctx.fillStyle = p.label ? "lime" : "red";
    ctx.fill();
  });
}


// ---------- Botón y loop ----------
document.getElementById("toggle").onclick=()=>{
  running = !running;
  document.getElementById("toggle").textContent = running ? "⏸ Pausar" : "▶ Entrenar";
};

function loop(){
  if(running){
    const steps = document.getElementById("speed").value;
    for(let i=0;i<steps;i++) train();
  }
  requestAnimationFrame(loop);
}
loop();
draw();
