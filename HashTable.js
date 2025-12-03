/**
 * HASH TABLE (Mapa Hash / Diccionario)
 *
 * Concepto clave:
 * → Estructura clave → valor con acceso promedio O(1)
 * → Función hash convierte cualquier clave en un índice
 *
 * Colisiones → inevitables (principio del palomar)
 *
 * DOS ESTRATEGIAS PRINCIPALES PARA RESOLVER COLISIONES:
 *
 * ┌─────────────────────────────────────┬────────────────────────────────────────────────────┬────────────────────────────────────────────────────┐
 * │ Estrategia                          │ Ventajas                                           │ Desventajas                                        │
 * ├─────────────────────────────────────┼────────────────────────────────────────────────────┼────────────────────────────────────────────────────┤
 * │ 1. SEPARATE CHAINING                │ • No sufre clustering                              │ • Más uso de memoria (arrays / nodos)              │
 * │ (Encadenamiento separado)           │ • Funciona bien incluso con load factor > 1        │ • Peor localidad de caché                          │
 * │                                     │ • Borrado muy fácil                                │                                                    │
 * ├─────────────────────────────────────┼────────────────────────────────────────────────────┼────────────────────────────────────────────────────┤
 * │ 2. OPEN ADDRESSING                  │ • Mejor uso de caché (todo contiguo)               │ • Primary Clustering → cadenas largas              │
 * │ (Direccionamiento abierto)          │ • Menos overhead de memoria                        │ • Degrada fuerte al pasar ~0.7 de load factor      │
 * │                                     │ • Más rápido cuando hay buen hash                  │ • Borrado complicado (necesita tombstones)         │
 * └─────────────────────────────────────┴────────────────────────────────────────────────────┴────────────────────────────────────────────────────┘
 * 
 * Load Factor (factor de carga) = elementos / tamaño del array
 *   • Separate Chaining → funciona bien hasta > 1.0
 *   • Open Addressing → empieza a degradarse en > 0.7
 *
 * Complejidad promedio (buena distribución):
 * ┌────────────┬────────┬────────────────────────────────────┐
 * │ Operación  │ Big O  │               Notas                │
 * ├────────────┼────────┼────────────────────────────────────┤
 * │ set/get/has│ O(1)   │ promedio con buena función hash    │
 * │ delete()   │ O(1)   │ más fácil con separate chaining    │
 * │ keys/values│ O(n)   │ debe recorrer toda la tabla        │
 * └────────────┴────────┴────────────────────────────────────┘
 *
 * HashTable vs HashMap
 *   → Son en esencia el mismo concepto
 *
 * Implementaciones nativas en JavaScript:
 * ┌────────────┬────────────────────┬────────────────────┬────────────────────┐
 * │            │ Object             │ Map                │ Implementación P.  │
 * ├────────────┼────────────────────┼────────────────────┼────────────────────┤
 * │ Claves     │ string / Symbol    │ cualquier valor    │ depende            │
 * │ Orden      │ sí (ES2015+)       │ sí (inserción)     │ depende            │
 * │ null clave │ no                 │ sí                 │ depende            │
 * │ Métodos    │ pocos              │ ricos              │ depende            │
 * │ Uso actual │ legado/simple      │ recomendado        │ depende            │
 * └────────────┴────────────────────┴────────────────────┴────────────────────┘
 *
 * Thread-safety en JavaScript:
 *   → JS es single-threaded (event loop)
 *   → NO hay concurrencia real → NO necesitas sincronización
 *   → Object, Map y cualquier HashTable que hagas son seguros por diseño
 *
 */

// Implementación con Array  

class HashTable {
  constructor(size = 53) {
    this.dataMap = new Array(size);
    this.size = size;
  }

  _hash(key) {
    let hash = 0;
    const prime = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash = (hash + key.charCodeAt(i) * prime) % this.size;
    }

    return hash;
  }

  set(key, value) {
    let index = this._hash(key);

    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
      this.dataMap[index].push([key, value]);
      return this;
    }

    for (const subarray of this.dataMap) {
        if(subarray[0] === key) {
            subarray[1] = key;
            return this;
        }
    }

    this.dataMap[index].push([key, value]);
    return this;
  }

  get(key) {
    let index = this._hash(key);

    if (this.dataMap[index]) {
      for (let i = 0; i < this.dataMap[index].length; i++) {
        if (this.dataMap[index][i][0] === key) return this.dataMap[index][i][1];
      }
    }
    return undefined;
  }

 delete(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        const deleted = bucket[i][1];
        bucket.splice(i, 1);
        return deleted;
      }
    }
    return undefined;
  }

  keys() {
    const result = [];
    for (const bucket of this.table) {
      if (bucket) {
        for (const [key] of bucket) {
          result.push(key);
        }
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (const bucket of this.table) {
      if (bucket) {
        for (const [, value] of bucket) {
          result.push(value);
        }
      }
    }
    return result;
  }
}
// Ejercicios

// Ejercicio 1:
function commonElements(array1, array2) {
  let map = new Map();
  for (let key of array1) {
    map.set(key, true);
  }
  for (let key of array2) {
    if (map.get(key)) return true;
  }
  return false;
}

// Ejercicio 2:
function findDuplicates(array1) {
  let map = new Map();
  let result = [];

  for (let item of array1) {
    if (map.has(item)) {
      result.push(item);
      continue;
    }
    map.set(item, true);
  }

  return result;
}

// Ejercicio 3:
function firstNonRepeatingChar(string) {
  let obj = {};
  let firstChar = null;
  for (let char of string) {
    if (!obj[char]) {
      obj[char] = 0;
    }
    obj[char] += 1;
  }
  for (let char of string) {
    if (obj[char] === 1) {
      firstChar = char;
      break;
    }
  }

  return firstChar;
}
