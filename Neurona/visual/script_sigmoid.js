document.addEventListener("DOMContentLoaded", () => {

  // Dataset simple (problema real: aprobación)
  const dataset = [
    { x1: 20, x2: 1, y: 0 },
    { x1: 30, x2: 2, y: 0 },
    { x1: 30, x2: 4, y: 0 },
    { x1: 40, x2: 3, y: 0 },
    { x1: 50, x2: 1, y: 0 },
    { x1: 40, x2: 3, y: 0 },
    { x1: 50, x2: 5, y: 1 },
    { x1: 60, x2: 6, y: 1 },
    { x1: 70, x2: 7, y: 1 },
    { x1: 80, x2: 8, y: 1 },
    { x1: 70, x2: 9, y: 1 },
    { x1: 50, x2: 9, y: 1 },
    { x1: 70, x2: 5, y: 1 }
  ];

  // DOM
  const x1 = document.getElementById("x1");
  const x2 = document.getElementById("x2");
  const w1 = document.getElementById("w1");
  const w2 = document.getElementById("w2");
  const bias = document.getElementById("bias");
  const lr = document.getElementById("lr");

  const trainBtn = document.getElementById("trainBtn");
  const autoTrainBtn = document.getElementById("autoTrainBtn");

  const circle = document.getElementById("circle");
  const result = document.getElementById("result");
  const zValue = document.getElementById("zValue");

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Neurona
  const sigmoid = z => 1 / (1 + Math.exp(-z));

  function forward(x1v, x2v) {
    const z =
      x1v * Number(w1.value) +
      x2v * Number(w2.value) +
      Number(bias.value);
    return { z, p: sigmoid(z) };
  }

  // Visualización
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sx = canvas.width / 100;
    const sy = canvas.height / 10;

    // Puntos
    dataset.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x1 * sx, canvas.height - d.x2 * sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = d.y ? "green" : "red";
      ctx.fill();
    });

    // Frontera
    const w1v = Number(w1.value);
    const w2v = Number(w2.value);
    const bv = Number(bias.value);
    if (w2v === 0) return;

    const y1 = (-bv - w1v * 0) / w2v;
    const y2 = (-bv - w1v * 100) / w2v;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - y1 * sy);
    ctx.lineTo(100 * sx, canvas.height - y2 * sy);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function updateUI() {
    const { z, p } = forward(Number(x1.value), Number(x2.value));
    zValue.innerText = `z = ${z.toFixed(2)}`;
    result.innerText = `Probabilidad: ${(p * 100).toFixed(1)}%`;
    circle.style.background = p >= 0.5 ? "green" : "red";
    circle.innerText = p >= 0.5 ? "✔" : "✖";
    draw();
  }

  // Entrenamiento
  trainBtn.onclick = () => {
    dataset.forEach(d => {
      const { p } = forward(d.x1, d.x2);
      const error = p - d.y;
      w1.value -= lr.value * error * d.x1;
      w2.value -= lr.value * error * d.x2;
      bias.value -= lr.value * error;
    });
    updateUI();
  };

  let interval = null;
  autoTrainBtn.onclick = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
      autoTrainBtn.innerText = "Entrenamiento automático";
    } else {
      autoTrainBtn.innerText = "Detener entrenamiento";
      interval = setInterval(trainBtn.onclick, 50);
    }
  };

  [x1, x2, w1, w2, bias].forEach(el =>
    el.addEventListener("input", updateUI)
  );

  updateUI();
});
