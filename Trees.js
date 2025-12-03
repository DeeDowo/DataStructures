/**
 * ÁRBOLES (Trees)
 *
 * Grafo
 * → Un grafo es un conjunto de nodos (vértices) conectados por aristas (edges)
 *   • Aristas pueden ser dirigidas (unidireccional) o no dirigidas (bidireccional)
 *   • Pueden tener pesos o no
 *   • Pueden tener ciclos (bucles) o no
 *
 * Tree (Árbol)
 * → Caso especial de grafo:
 *   • Conectado: todos los nodos alcanzables desde un nodo inicial
 *   • Acíclico: NO hay ciclos
 *   • Tiene un nodo raíz (root): el único sin padre
 *   • Hojas (leaves): nodos sin hijos
 *   • Cada nodo puede tener cualquier número de hijos (0 o más)
 *
 * ┌──────────────────────────┬────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────┐
 * │ Tipo                     │ Definición                                                         │ Impacto en complejidad / propiedades importantes                   │
 * ├──────────────────────────┼────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────┤
 * │ Complete Binary Tree     │ Todos los niveles llenos excepto posiblemente el último,           │ Ideal para heaps. Permite representación eficiente en array.       │
 * │                          │ que se llena de izquierda a derecha                                │                                                                    │
 * ├──────────────────────────┼────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────┤
 * │ Perfect Binary Tree      │ Todos los niveles completamente llenos. Todos los nodos internos   │ Altura exacta ⌊log₂(n+1)⌋ - 1. Nodos totales = 2^(h+1) - 1.        │
 * │                          │ tienen exactamente 2 hijos                                         │                                                                    │
 * ├──────────────────────────┼────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────┤
 * │ Balanced Binary Tree     │ Altura de subárboles izquierdo y derecho difiere en ≤ 1            │ Garantiza O(log n) en BST/AVL/Red-Black                            │
 * │                          │ (factor de balance -1, 0 o 1)                                      │                                                                    │
 * ├──────────────────────────┼────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────┤
 * │ BST simple (sin balance) │ BST normal sin restricciones de altura                             │ Mejor caso O(log n), peor caso O(n) si degenera                    │
 * └──────────────────────────┴────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────┘
 *
 * Ejemplos de estructuras basadas en grafos:
 *   • Singly Linked List → grafo dirigido acíclico lineal (grado salida máximo 1)
 *   • Doubly Linked List → grafo dirigido bidireccional acíclico lineal
 *
 * Binary Tree (Árbol Binario)
 * → Tree donde cada nodo tiene máximo 2 hijos: left (izquierdo) y right (derecho)
 * → NO requiere orden en los valores
 * → Complejidad típica (sin orden): búsqueda/inserción/eliminación → O(n)
 *
 * Binary Search Tree (BST)
 * → Binary Tree con propiedad de orden adicional:
 *   • Para cualquier nodo:
 *     - Todos los valores en subárbol izquierdo < nodo actual
 *     - Todos los valores en subárbol derecho > nodo actual
 *     (variante común: left < node ≤ right para permitir duplicados)
 * → Permite operaciones eficientes cuando está balanceado
 *
 * Complejidad en BST:
 * ┌────────────┬──────────────┬────────────────────────────────────┐
 * │ Operación  │ Balanceado   │ Desbalanceado (degenerado)         │
 * ├────────────┼──────────────┼────────────────────────────────────┤
 * │ insert     │ O(log n)     │ O(n)                               │
 * │ search     │ O(log n)     │ O(n)                               │
 * │ delete     │ O(log n)     │ O(n)                               │
 * │ traversal  │ O(n)         │ O(n)                               │
 * └────────────┴──────────────┴────────────────────────────────────┘
 *
 * Problema del BST simple:
 *   → Inserciones ordenadas (1,2,3...) → degenera en lista enlazada → O(n)
 *   → Soluciones avanzadas: AVL Tree, Red-Black Tree (auto-balanceados)
 *
 * Traversals (recorridos): 
 *   • In-order   (izq-raíz-der) → valores ordenados en BST
 *   • Pre-order  (raíz-izq-der) → útil para copiar árbol
 *   • Post-order (izq-der-raíz) → útil para eliminar árbol
 *   • Level-order (por niveles) → BFS con queue
 *
 * Casos de uso comunes:
 *   • BST: búsquedas rápidas, rangos, ordenación
 *   • Árboles en general: DOM HTML, sistemas de archivos, JSON, expresiones matemáticas
 *   • Heap (Priority Queue): basado en árbol binario completo con propiedad de orden 
 */

// Implemntación de un BST sin duplicados
class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
  constructor(...values) {
    this.root = null;

    if(values.length > 0){
        for (const value of values) {
            this.insert(value);
        }
    }
  }

  insert(value) {
    const node = new Node(value);

    if (!this.root) {
      this.root = node;
      return this;
    }
      let temp = this.root;

      while (true) {
        if (node.value === temp.value) return this; // no duplicados

        if (node.value > temp.value) {
          if (!temp.right) {
            temp.right = node;
            return this;
          }
          temp = temp.right;
        } else {
          if (!temp.left) {
            temp.left = node;
            return this;
          }
          temp = temp.left;
        }
      }
  }

  contains(value) {
    let temp = this.root;

    while(temp) {
        if(temp.value === value) return true;
        temp = temp.value > value ? temp.left : temp.right;
    }
    return false;
  }
}
