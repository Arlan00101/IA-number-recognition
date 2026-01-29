const x1 = document.getElementById("x1")
const x2 = document.getElementById("x2")
const w1 = document.getElementById("w1")
const w2 = document.getElementById("w2")
const bias = document.getElementById("bias")

const circle = document.getElementById("circle")
const result = document.getElementById("result")
const zValue = document.getElementById("zValue")

function update() {
  document.getElementById("x1Val").innerText = x1.value
  document.getElementById("x2Val").innerText = x2.value

  let z =
    (x1.value * w1.value) +
    (x2.value * w2.value) +
    Number(bias.value)

  let output = z >= 0 ? 1 : 0

  zValue.innerText = `z = ${z.toFixed(2)}`

  if (output === 1) {
    circle.style.background = "green"
    circle.innerText = "✔"
    result.innerText = "PRÉSTAMO APROBADO"
  } else {
    circle.style.background = "red"
    circle.innerText = "✖"
    result.innerText = "PRÉSTAMO RECHAZADO"
  }
}

document.querySelectorAll("input").forEach(i =>
  i.addEventListener("input", update)
)

update()
