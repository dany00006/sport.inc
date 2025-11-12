
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvptoadhqhtoynxlniwh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  try {
    const { error } = await supabase
      .from("newsletter")
      .insert([{ email }]);

    if (error) {
      console.error(error);
      mensaje.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    } else {
      mensaje.innerHTML = `<p style="color:green;">¡Gracias por suscribirte!</p>`;
      form.reset();
    }
  } catch (err) {
    console.error("Error de conexión:", err);
    mensaje.innerHTML = `<p style="color:red;">No se pudo conectar a Supabase.</p>`;
  }
});