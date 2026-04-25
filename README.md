# Calculadora de Comisiones de Ventas

Aplicación web para calcular comisiones de vendedores según sus ventas mensuales, descuentos aplicados y país donde operan.

## Objetivo

El objetivo del proyecto es ofrecer una herramienta clara para que los vendedores puedan conocer su comisión de forma rápida y para que la empresa mantenga transparencia en el cálculo.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript

## Países incluidos

| País | Código | Moneda | Comisión |
|---|---|---|---|
| India | IN | INR | 10% |
| Estados Unidos | US | USD | 15% |
| Reino Unido | UK | GBP | 12% |
| República Dominicana | DO | DOP | 13% |
| México | MX | MXN | 11% |
| Canadá | CA | CAD | 16% |

## Funcionamiento

1. El usuario (vendedor) selecciona el país donde opera.
2. Ingresa las ventas totales y descuentos en la moneda nativa del país.
3. El sistema calcula las ventas netas.
4. Calcula la comisión en moneda nativa.
5. Convierte la comisión final a USD usando una tasa fija de ejemplo.

## Fórmula

```text
Ventas netas = Ventas totales - Descuentos
Comisión nativa = Ventas netas × Porcentaje del país
Comisión final USD = Comisión nativa × Tasa de cambio a USD
```

## Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir el archivo `index.html`.
4. Usar Live Server o abrir el archivo directamente en el navegador.

## Estructura del proyecto

```text
calculadora-comisiones-ventas-6-paises/
│
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── index.html
└── README.md
```

## Autor

Proyecto desarrollado como parte del parcial final de Programación II - Calculadora de Comisiones de Ventas