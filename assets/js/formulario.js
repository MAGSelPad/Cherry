// Formulario de suscripción - envío de datos por HTTP POST
(function() {
  const form = document.getElementById('subscriptionForm');
  const resultContainer = document.getElementById('subscriptionResult');
  const formEndpoint = 'https://formspree.io/f/mlgyekoa'; // Reemplaza con tu endpoint POST real

  function showMessage(type, title, message) {
    const colors = {
      success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
      info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
      error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
    };

    resultContainer.innerHTML = `
      <div class="mt-6 p-4 rounded-md ${colors[type]}">
        <p class="font-semibold">${title}</p>
        <p class="text-sm mt-2">${message}</p>
      </div>
    `;
  }

  async function sendPost(formData) {
    return await fetch(formEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  if (!form || !resultContainer) {
    return;
  }

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    showMessage('info', '⏳ Enviando solicitud...', 'Por favor espera mientras procesamos tu mensaje.');

    const formData = new FormData(form);

    try {
      const response = await sendPost(formData);

      if (response.ok) {
        showMessage('success', '✓ ¡Solicitud enviada correctamente!', 'El formulario se envió correctamente.');
        form.reset();
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      showMessage('error', '✗ Error al enviar la solicitud', 'Ocurrió un problema enviando el formulario. Intenta de nuevo más tarde.');
    }
  });
})();
