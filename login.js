// Conexión a Supabase
const supabaseUrl = "https://qambprqwzhsnahujbksa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbWJwcnF3emhzbmFodWpia3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDcyOTEsImV4cCI6MjA3ODUyMzI5MX0.y9Yc6oVm_BtQSt3k3eTJJH-k-F2dilE2CWXFWq0YUC4";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  if (!correo || !contrasena) {
    alert("Por favor llena todos los campos.");
    return;
  }

  try {
    // Busca el usuario con el correo y la contraseña
    const { data, error } = await supabase
      .from("Registro")
      .select("*")
      .eq("correo_electronico", correo)
      .eq("contrasena", contrasena)
      .maybeSingle();

    if (error) {
      console.error("Error de Supabase:", error);
      alert("Error al conectar con la base de datos.");
      return;
    }

    if (!data) {
      alert("❌ Usuario o contraseña incorrectos.");
      return;
    }

    // Si llega aquí, es correcto
    alert(`✅ Bienvenido ${data.nombre_de_usuario}`);
    localStorage.setItem("usuario", data.nombre_de_usuario);
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error("Error inesperado:", err);
    alert("Error inesperado. Intenta de nuevo.");
  }
});