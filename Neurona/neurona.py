class Neurona:
    def __init__(self, pesos, bias):
        self.pesos = pesos
        self.bias = bias

    def forward(self, entradas):
        salida = 0
        for x, w in zip(entradas, self.pesos):
            salida += x * w
        salida += self.bias
        return salida

# Prueba
neurona = Neurona(
    pesos=[0.5, -0.3],
    bias=0.1
)

resultado = neurona.forward([1, 2])
print(resultado)
