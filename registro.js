// Conexión a Supabase

const supabaseUrl = "https://qambprqwzhsnahujbksa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbWJwcnF3emhzbmFodWpia3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDcyOTEsImV4cCI6MjA3ODUyMzI5MX0.y9Yc6oVm_BtQSt3k3eTJJH-k-F2dilE2CWXFWq0YUC4";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Función para registrar usuario
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector('input[placeholder="Nombre de usuario"]').value;
  const correo = document.querySelector('input[placeholder="Correo electrónico"]').value;
  const contrasena = document.querySelector('input[placeholder="Contraseña"]').value;
  const confirmar = document.querySelector('input[placeholder="Confirmar contraseña"]').value;

  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  

  try {
    // Insertar en la tabla "Registro" de Supabase
    const { data, error } = await supabase.from("Registro").insert([
      {
        nombre_de_usuario: nombre,
        correo_electronico: correo,
        contrasena: contrasena
      }
    ]);

    if (error) {
      console.error(error);
      alert("Error al registrar usuario: " + error.message);
    } else {
      alert("Usuario registrado con éxito ✅ Redirigiendo al inicio de sesión...");
      e.target.reset();

      // Espera un momento y luego redirige
      setTimeout(() => {
        window.location.href = "LOGIN.HTML";
      }, 1500);
    }
  } catch (err) {
    console.error("Error inesperado:", err);
    alert("Ocurrió un error inesperado.");
  }
});