// Importar cliente de Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Configuración de tu proyecto Supabase
const supabaseUrl = 'https://qambprqwzhsnahujbksa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbWJwcnF3emhzbmFodWpia3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDcyOTEsImV4cCI6MjA3ODUyMzI5MX0.y9Yc6oVm_BtQSt3k3eTJJH-k-F2dilE2CWXFWq0YUC4'; // usa tu clave pública (anon key)
const supabase = createClient(supabaseUrl, supabaseKey);

// Elementos del DOM
const form = document.getElementById('form-newsletter');
const emailInput = document.getElementById('email');
const mensaje = document.getElementById('mensaje-newsletter');

// Escuchar el evento de envío
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    mensaje.textContent = 'Por favor, ingresa un correo válido.';
    mensaje.style.color = 'orange';
    return;
  }

  try {
    // Insertar en la tabla "boletin" en la columna "correo_electronico"
    const { error } = await supabase
      .from('boletin')
      .insert([{ correo_electronico: email }]);

    if (error) throw error;

    mensaje.textContent = '¡Gracias por suscribirte al boletín Energy Sports! ⚡';
    mensaje.style.color = 'limegreen';
    emailInput.value = '';
  } catch (err) {
    console.error('Error al guardar el correo:', err);
    mensaje.textContent = 'Hubo un error al guardar tu correo. Intenta nuevamente.';
    mensaje.style.color = 'red';
  }
});