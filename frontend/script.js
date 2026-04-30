const API_URL = " http://3.92.18.194:3000"; // Ajusta según el puerto de tu backend

// Cambiar entre vistas de Registro y Login
function toggleView(view) {
  document.getElementById('register-section').style.display = view === 'register' ? 'block' : 'none';
  document.getElementById('login-section').style.display = view === 'login' ? 'block' : 'none';
}

// 1. Manejo de Registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('reg-name').value,
    username: document.getElementById('reg-user').value,
    email: document.getElementById('reg-email').value,
    password: document.getElementById('reg-pass').value
  };

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (res.ok) {
      alert("Usuario registrado. Verifica tu email antes de entrar.");
      toggleView('login');
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error(err);
  }
});

// 2. Manejo de Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('log-user').value;
  const password = document.getElementById('log-pass').value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok) {
      // Guardar el accessToken devuelto por el backend
      localStorage.setItem('token', data.accessToken);
      showDashboard(username);
    } else {
      alert("Login fallido: " + data.message);
    }
  } catch (err) {
    console.error(err);
  }
});

// 3. Acceso a la página temporal (Dashboard)
function showDashboard(username) {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'block';
  document.getElementById('user-info').innerText = `Hola, ${username}. Has iniciado sesión correctamente.`;
}

// 4. Probar ruta privada usando el middleware del backend
async function getPrivateData() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/private`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  document.getElementById('api-response').innerText = JSON.stringify(data, null, 2);
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}