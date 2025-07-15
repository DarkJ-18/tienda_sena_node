// Archivo de pruebas para la API de productos
// Puedes usar este archivo con herramientas como Postman o ejecutarlo con Node.js

const API_BASE = 'http://localhost:3000/api/productos'; // Cambia el puerto según tu configuración

// Datos de ejemplo para pruebas
const productoEjemplo = {
    nombre: "Camiseta SENA",
    descripcion: "Camiseta oficial del SENA, 100% algodón",
    stock: 15,
    categoria: "Moda",
    color: "Azul",
    precio_original: 35000,
    en_oferta: true,
    descuento: 15,
    referencia: "CAM001",
    imagenes: [
        {
            url: "https://ejemplo.com/camiseta1.jpg",
            descripcion: "Vista frontal"
        },
        {
            url: "https://ejemplo.com/camiseta2.jpg", 
            descripcion: "Vista posterior"
        }
    ]
};

// Pruebas que puedes realizar:

console.log('=== PRUEBAS PARA LA API DE PRODUCTOS ===\n');

console.log('1. Obtener todos los productos:');
console.log(`GET ${API_BASE}`);
console.log(`GET ${API_BASE}?page=1&limit=5&sortBy=precio_final&sortOrder=desc\n`);

console.log('2. Buscar productos:');
console.log(`GET ${API_BASE}/buscar?q=camiseta`);
console.log(`GET ${API_BASE}/buscar?categoria=Moda&color=Azul`);
console.log(`GET ${API_BASE}/buscar?oferta=true&minPrecio=10000&maxPrecio=50000\n`);

console.log('3. Obtener por categoría:');
console.log(`GET ${API_BASE}/categoria/Moda`);
console.log(`GET ${API_BASE}/categoria/Tecnologia\n`);

console.log('4. Productos en oferta:');
console.log(`GET ${API_BASE}/ofertas\n`);

console.log('5. Estadísticas:');
console.log(`GET ${API_BASE}/estadisticas\n`);

console.log('6. Crear producto:');
console.log(`POST ${API_BASE}`);
console.log('Body:', JSON.stringify(productoEjemplo, null, 2));
console.log();

console.log('7. Obtener producto específico (usar ID real):');
console.log(`GET ${API_BASE}/6123456789abcdef12345678\n`);

console.log('8. Actualizar producto (usar ID real):');
console.log(`PUT ${API_BASE}/6123456789abcdef12345678`);
console.log('Body: { "precio_original": 40000, "descuento": 20 }\n');

console.log('9. Gestionar stock (usar ID real):');
console.log(`PATCH ${API_BASE}/6123456789abcdef12345678/stock`);
console.log('Body: { "cantidad": 5, "operacion": "add" }\n');

console.log('10. Eliminar producto (usar ID real):');
console.log(`DELETE ${API_BASE}/6123456789abcdef12345678\n`);

async function realizarPruebas() {
    const baseUrl = 'http://localhost:3000'; // Ajusta según tu configuración
    
    try {
        // Aquí puedes agregar código para hacer solicitudes HTTP reales
        console.log('Iniciando pruebas automáticas...');
        
        // Ejemplo con fetch (si estás en un entorno que lo soporte):
        /*
        const response = await fetch(`${baseUrl}/api/productos`);
        const data = await response.json();
        console.log('Productos obtenidos:', data);
        */
        
    } catch (error) {
        console.error('Error en las pruebas:', error);
    }
}

// Datos adicionales para más pruebas
const productosEjemplo = [
    {
        nombre: "Laptop Gaming ASUS",
        descripcion: "Laptop para gaming con RTX 4060",
        stock: 5,
        categoria: "Tecnologia", 
        color: "Negro",
        precio_original: 2500000,
        en_oferta: false,
        descuento: 0,
        referencia: "LAP001"
    },
    {
        nombre: "Artesanía en Madera",
        descripcion: "Figura tallada a mano por artesanos locales",
        stock: 3,
        categoria: "Artesania",
        color: "Ninguno", 
        precio_original: 75000,
        en_oferta: true,
        descuento: 10,
        referencia: "ART001"
    },
    {
        nombre: "Reloj Inteligente",
        descripcion: "Smartwatch con monitor de salud",
        stock: 20,
        categoria: "Accesorios",
        color: "Negro",
        precio_original: 150000,
        en_oferta: true,
        descuento: 25,
        referencia: "REL001"
    }
];

console.log('\n=== PRODUCTOS DE EJEMPLO ADICIONALES ===');
productosEjemplo.forEach((producto, index) => {
    console.log(`\nProducto ${index + 1}:`);
    console.log(JSON.stringify(producto, null, 2));
});

// Casos de prueba de error
console.log('\n=== CASOS DE PRUEBA DE ERROR ===');
console.log('1. ID inválido:');
console.log(`GET ${API_BASE}/invalid-id`);

console.log('\n2. Producto no encontrado:');
console.log(`GET ${API_BASE}/123456789012345678901234`);

console.log('\n3. Referencia duplicada:');
console.log(`POST ${API_BASE}`);
console.log('Body: { "referencia": "CAM001", ...otrosDatos }');

console.log('\n4. Campos faltantes:');
console.log(`POST ${API_BASE}`);
console.log('Body: { "nombre": "Test" } // Faltan campos obligatorios');

module.exports = {
    productoEjemplo,
    productosEjemplo,
    realizarPruebas
};
