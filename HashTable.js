/**
 * HASH TABLE (Mapa Hash / Diccionario)
 *
 * Concepto clave:
 *  → Almacena pares clave-valor permitiendo acceso, inserción y eliminación en O(1) promedio
 *  → Usa una función hash para convertir la clave en un índice del array subyacente
 *
 * Función hash ideal:
 *  • Determinista     → misma clave → siempre mismo hash
 *  • Uniforme         → distribuye las claves de forma pareja
 *  • Rápida           → O(1) o O(longitud clave)
 *
 * Colisiones (inevitables por el principio del palomar):
 * Dos estrategias principales:
 *
 * 1. Separate Chaining (encadenamiento separado)
 *    → En cada slot del array guardamos una lista (array o linked list)
 *    → Peor caso: O(n) si todas las claves colisionan
 *
 * 2. Open Addressing (direccionamiento abierto)
 *    → Al colisionar, buscamos el siguiente slot libre
 *    → Variantes: Linear Probing, Quadratic Probing, Double Hashing
 *
 * Complejidad promedio (con buena función hash):
 * ┌──────────┬─────────────┐
 * │ Operación│ Tiempo      │
 * ├──────────┼─────────────┤
 * │ set()    │ O(1)        │
 * │ get()    │ O(1)        │
 * │ delete() │ O(1)        │
 * │ keys()   │ O(n)        │
 * └──────────┴─────────────┘
 *
 * En JavaScript:
 *  • Object y Map son hash tables internas
 *  • Map mantiene orden de inserción y permite cualquier tipo como clave
 *  • Object convierte claves a string y tiene problemas heredados
 */

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
    let arreglo = [key, value];

    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
    }

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }

    this.dataMap[index].push(arreglo);


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

  keys() {
    let keys = [];
    for (let i = 0; i < this.dataMap.length; i++) {
      if (this.dataMap[i]) {
        for (let y = 0; y < this.dataMap[i].length; y++) {
          keys.push(this.dataMap[i][y][0]);
        }
      }
    }

    return keys;
  }
}

let hash = new HashTable(10);
hash.set("dowo", 33);
hash.set("dowoo", 66)

hash.set("dowooo", 66)
hash.set("dowoooo", 66)
hash.set("dowooooo", 66)
hash.set("dowoooooo", 66)
console.log(hash.keys());

// ejercicio encontar elementos iguales Array

function elementosEnComun(array1, array2) {
  let obj = {};
  for (let key of array1) {
    obj[key] = true;
  }
  for (let key of array2) {
    if (obj[key]) return true;
  }
  return false;
}

function findDuplicates(array1) {
  let hash = {}
  let result = [];

  for (let item of array1) {
    if (hash[item]) {
      result.push(item);
      continue;
    }
    hash[item] = true;
  }

  return result;
}

let array1 = [1, 2, 1, 1, 3, 4, 5, 6, 7, 1, 2, 3, 4];
let array2 = [4, 5, 6];

console.log(elementosEnComun(array1, array2));
console.log(findDuplicates(array1));

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

let string = "dowwo"
let string2 = "ddooww"

console.log(firstNonRepeatingChar(string))
console.log(firstNonRepeatingChar(string2))

console.log(+"c");
