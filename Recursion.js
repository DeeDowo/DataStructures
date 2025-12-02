/**
 * RECURSIÓN Y CALL STACK
 *
 * Recursión
 * → Técnica en la que una función se llama a sí misma para resolver un problema
 *   dividiéndolo en subproblemas más pequeños del mismo tipo.
 *
 * Toda función recursiva correcta debe tener exactamente DOS partes:
 *
 * 1. Caso base (Base Case)
 *    → Condición que detiene la recursión
 *    → Devuelve un resultado directamente sin hacer más llamadas
 *    → Sin caso base → recursión infinita → Stack Overflow
 *
 * 2. Caso recursivo (Recursive Case)
 *    → La función se llama a sí misma con un parámetro “más pequeño”
 *    → Confía en que eventualmente se alcanzará el caso base
 *
 * Call Stack (pila de llamadas)
 * → Estructura LIFO interna de JavaScript
 * → Cada llamada a función (incluidas las recursivas) crea un stack frame
 * → Los frames se apilan y se desapilan en orden inverso al de llegada
 * → En recursión profunda → muchos frames → riesgo de Stack Overflow
 *
 * Ejemplo clásico – factorial(n):
 *   factorial(4) → 4 * factorial(3)
 *                  → 3 * factorial(2)
 *                         → 2 * factorial(1)
 *                                → 1 * factorial(0)
 *                                       → 1        ← caso base
 *
 * Complejidad típica de recursión simple:
 * ┌─────────────┬─────────────┬────────────────────────────────────┐
 * │ Métrica     │ Complejidad │               Notas                │
 * ├─────────────┼─────────────┼────────────────────────────────────┤
 * │ Tiempo      │ O(n) o peor │ depende de las llamadas            │
 * │ Espacio     │ O(n)        │ n frames en el call stack          │
 * └─────────────┴─────────────┴────────────────────────────────────┘
 *
 * Cuándo usar recursión
 *   ✓ Problema naturalmente divisible (árboles, grafos, backtracking, divide y conquista)
 *   ✓ Código más legible y elegante
 *   ✓ n es pequeño o moderado (≤ 10⁴ normalmente)
 *
 * Cuándo evitarla
 *   ✗ n muy grande → riesgo de Stack Overflow
 *   ✗ Performance crítica → versión iterativa suele ser más rápida
 */

function factorial(n) {
    if (n <= 0) return 1;
    return n * factorial(n-1);
}

function factorialIterativa(n) {
    if (n <= 0) return 1;
    
    let resultado = 1;
    for (let times = 2; times <= n; times--) {
        resultado *= (times);
    }
    return resultado;
}
