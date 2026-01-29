# Clasificación de puntos en un círculo

## 1. Descripción del problema

El objetivo es clasificar puntos en un plano bidimensional según
si pertenecen o no a una región circular.

- Entrada: (x1, x2)
- Salida: 
  - 1 si el punto está dentro del círculo
  - 0 si está fuera

Este tipo de problema aparece en:
- detección de regiones
- visión artificial
- sensores y radares
- clasificación espacial

## 2. Limitación de una sola neurona

Una neurona artificial define una frontera de decisión lineal,
equivalente a una recta en el plano.

Un círculo no puede ser separado del resto del plano mediante
una única recta, por lo que una sola neurona es insuficiente.

## 3. Uso de una capa de neuronas

Al utilizar una capa oculta con múltiples neuronas:

- Cada neurona aprende una frontera lineal distinta
- La combinación de estas fronteras permite aproximar
  regiones curvas como círculos o anillos

## 4. Objetivo visual

El objetivo del ejemplo es observar cómo múltiples fronteras
lineales se combinan para formar una frontera no lineal,
mostrando el poder expresivo de las redes neuronales multicapa.
