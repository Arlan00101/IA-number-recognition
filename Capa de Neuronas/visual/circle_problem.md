# Clasificación de puntos dentro de un círculo

## 1. Objetivo

Clasificar puntos en un plano bidimensional según si pertenecen
a una región circular.

- Entrada: (x1, x2)
- Salida:
  - 1 si el punto está dentro del círculo
  - 0 si está fuera

## 2. Regla subyacente

La regla real que genera los datos es:

x1² + x2² < r²

La red neuronal no conoce esta fórmula, solo recibe ejemplos.

## 3. Limitación de una neurona

Una sola neurona define una frontera lineal (una recta).
Un círculo no es separable linealmente, por lo que se requiere
una red con al menos una capa oculta.

## 4. Red neuronal utilizada

- 2 entradas
- 1 capa oculta con múltiples neuronas
- 1 neurona de salida

Cada neurona de la capa oculta aprende una frontera lineal distinta.
La combinación de todas permite aproximar una frontera curva.

## 5. Objetivo visual

Observar cómo múltiples fronteras lineales se combinan
para formar una frontera no lineal similar a un círculo.
