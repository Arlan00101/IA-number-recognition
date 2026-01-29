# 🧠 Neurona Artificial – Aprobación de un Micro-Préstamo

Este ejemplo muestra cómo una **neurona artificial (perceptrón)** puede resolver un **problema real y sencillo de clasificación binaria**:  
decidir si se **aprueba o se rechaza** un micro-préstamo.

El objetivo no es usar librerías avanzadas, sino **entender qué hace realmente una neurona** y cómo cada parámetro afecta la decisión.

---

## 🎯 Problema planteado

Un banco desea automatizar la aprobación de micro-préstamos usando dos factores básicos:

| Variable | Descripción | Rango |
|--------|------------|-------|
| `x₁` | Ingreso mensual del solicitante | 0 – 100 |
| `x₂` | Historial crediticio | 0 – 10 |

La salida del modelo será:

- `1` → Préstamo **aprobado**
- `0` → Préstamo **rechazado**

---

## 🧮 Modelo matemático

La neurona calcula primero una combinación lineal:

\[
z = x₁·w₁ + x₂·w₂ + b
\]

Donde:

- `w₁`, `w₂` → pesos (importancia de cada entrada)
- `b` → bias (nivel de exigencia del sistema)

La neurona aplica una función escalón:

- Si `z >= 0` → salida = **1** (aprobado)
- Si `z < 0` → salida = **0** (rechazado)


---

## 🧠 Interpretación conceptual

- Los **pesos** determinan qué tan importante es cada factor.
- El **bias** controla cuán difícil es aprobar el préstamo.
- La neurona no “razona”: **suma, compara y decide**.

Este modelo representa la forma más simple de una red neuronal.

---

## 🎛️ Consideraciones del ejemplo visual

La visualización permite modificar en tiempo real:

### Entradas
- **Ingreso mensual (`x₁`)**
- **Historial crediticio (`x₂`)**

### Parámetros del modelo
- **Peso `w₁`** → importancia del ingreso
- **Peso `w₂`** → importancia del historial
- **Bias (`b`)** → nivel de exigencia del banco

Cada cambio recalcula el valor de `z` y actualiza la decisión.

---

## 👀 Qué enseña la visualización

1. **Las decisiones son matemáticas**, no mágicas  
2. Pequeños cambios en los pesos pueden cambiar el resultado  
3. El bias actúa como un “umbral” de aprobación  
4. Una neurona puede ser **injusta o absurda** si se configura mal  
5. El modelo no aprende aún: **solo ejecuta reglas**

---

## ⚠️ Limitaciones del modelo

- No aprende automáticamente
- Solo puede separar datos con una frontera lineal
- No maneja incertidumbre ni gradientes suaves
- No generaliza por sí solo

Estas limitaciones motivan los siguientes pasos:
- Funciones de activación continuas
- Función de pérdida
- Entrenamiento automático
- Redes multicapa

---

## 🚀 Próximo paso natural

Hacer que la neurona **aprenda sola** ajustando sus pesos a partir de ejemplos reales, usando:
- Error
- Descenso del gradiente
- Backpropagation

Este ejemplo es la base de todo lo que viene después.
