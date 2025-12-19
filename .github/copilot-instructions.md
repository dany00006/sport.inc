# Instrucciones para agentes (Copilot) — sport.inc

Resumen rápido
- Repositorio: sitio estático frontend (HTML/CSS/JS) con integraciones cliente-side a Supabase.
- Página principal: [INDEX.HTML](INDEX.HTML) contiene el catálogo y la lógica del carrito (localStorage `energySportsCart`).

Qué hay que saber primero
- Arquitectura: cliente puro. No hay backend propio en este repo; las operaciones persistentes se hacen contra Supabase desde el navegador (`boletin.js`, `login.js`, `registro.js`, `dashboard.html`).
- Flujo de carrito: `INDEX.HTML` mantiene el carrito en memoria y lo persiste en `localStorage` bajo la llave `energySportsCart`. La finalización de compra redirige a `finalizar_compra.html`.

Archivos clave (ejemplos y patrones)
- [INDEX.HTML](INDEX.HTML): componente central — productos como <article class="producto"> con un botón `.btn-comprar` que usa atributos `data-id`, `data-name`, `data-price`, `data-image`.
- [boletin.js](boletin.js): cliente Supabase (import por ESM) usado para registrar suscripciones al boletín.
- [login.js](login.js) y [registro.js](registro.js): muestras de cómo se inicializa `createClient(...)` y se hace insert/select contra Supabase.
- [finalizar_compra.html](finalizar_compra.html): destino de `checkout()` — revisar para integrar envío de pedido si se añade backend.

Convenciones del proyecto
- Nombres de archivos: hay mezcla de mayúsculas (`INDEX.HTML`, `LOGIN.HTML`) — el sistema de archivos es Linux (case-sensitive). Mantener exactamente el nombre y la ruta.
- Precios: se almacenan como enteros (ej. `689000`) y se formatean con `Intl.NumberFormat('es-CO', { currency: 'COP', minimumFractionDigits: 0 })`.
- Scripts: se usan `type="module"` en algunos scripts (ej. `boletin.js`), y también hay scripts inline en `INDEX.HTML`. Mantener compatibilidad de módulos cuando se muevan o refactoricen archivos.

Patrones de datos y UX
- LocalStorage: `energySportsCart` guarda el array completo de items. Buscar/actualizar con `JSON.parse`/`JSON.stringify`.
- Event delegation: los botones `.btn-comprar` se buscan con `querySelectorAll` y se asocian eventos en `DOMContentLoaded`.

Integraciones y secretos
- Supabase está presente en varios archivos (ver `boletin.js`, `login.js`, `registro.js`, `dashboard.html`). Algunas claves públicas (`anon key`) están embebidas; evita mover o exponer claves privadas. Si necesitas cambiar la instancia, actualiza las URLs/keys en esos archivos.

Desarrollo local y comprobaciones rápidas
- Previsualizar el sitio estático: en la raíz del repo ejecutar:

  python3 -m http.server 8000

  o

  npx serve .  # si tienes node/npm

- Entorno: devcontainer basado en Ubuntu 24.04.3 LTS (no hay pasos de build ni tests automatizados incluidos).

Cómo modificar o añadir productos
- Copiar/añadir un bloque `<article class="producto">` en [INDEX.HTML](INDEX.HTML) y añadir un botón con los atributos `data-*`. Ejemplo:

  <article class="producto">
    <img src="...">
    <h2>Nombre</h2>
    <p class="precio">$xxx COP</p>
    <button class="btn-comprar" data-id="3" data-name="Producto" data-price="123000" data-image="img.jpg">Añadir al carrito</button>
  </article>

Errores y puntos a revisar (observables)
- Navegación: hay enlaces con contenido mal formateado (ej. `partidos/a></li>` en `INDEX.HTML`). Revisa el HTML por pequeñas erratas si actualizas el nav.
- Consistencia Supabase: varias páginas usan diferentes `supabaseUrl`/`supabaseKey` — confirmar cuál es la instancia correcta antes de cambios que afecten datos.

Qué pedir al usuario antes de grandes cambios
- Confirmar si debemos centralizar la configuración de Supabase (archivo único de configuración) y si las claves han de moverse a variables de entorno en CI/CD.
- Si se añade un backend para pedidos, confirmar formato esperado del carrito (precio en COP, estructura de item) para compatibilidad.

Contacto y siguientes pasos
- Si necesitas, puedo:
  - Refactorizar la inicialización de Supabase a un único archivo módulo.
  - Añadir documentación de cómo añadir nuevos productos y páginas.
  - Corregir enlaces rotos en `INDEX.HTML`.

Por favor revisa y dime si quieres que amplíe la sección de Supabase (instancias/keys) o añada ejemplos de tests o de despliegue.
