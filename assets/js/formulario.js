const recommendations = {
  "BLACKPINK": [
    "🎵 JUMP",
    "🎵 Pink Venom",
    "🎵 How You Like That"
  ],

  "TWICE": [
    "🎵 Strategy",
    "🎵 Feel Special",
    "🎵 Talk That Talk"
  ],

  "aespa": [
    "🎵 Supernova",
    "🎵 Drama",
    "🎵 Armageddon"
  ],

  "IVE": [
    "🎵 I AM",
    "🎵 HEYA",
    "🎵 LOVE DIVE"
  ],

  "NewJeans": [
    "🎵 Ditto",
    "🎵 OMG",
    "🎵 Super Shy"
  ],

  "(G)I-DLE": [
    "🎵 Queencard",
    "🎵 TOMBOY",
    "🎵 Fate"
  ]
};

// Formulario de suscripción - envío de datos por HTTP POST
(function () {
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

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    showMessage('info', '⏳ Enviando solicitud...', 'Por favor espera mientras procesamos tu mensaje.');

    const formData = new FormData(form);
    const userName = formData.get("name");
    const favoriteGroup = formData.get("favoriteGroup");

    try {
      const response = await sendPost(formData);

      if (response.ok) {
        showMessage('success', '✓ ¡Bienvenido a Cherry!', 'Tu suscripción fue registrada correctamente.');

        showPersonalizedContent(userName, favoriteGroup);

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


function showPersonalizedContent(name, favoriteGroup) {

  const section =
    document.getElementById("welcomeSection");

  const title =
    document.getElementById("welcomeTitle");

  const text =
    document.getElementById("welcomeText");

  const cards =
    document.getElementById("recommendationCards");

  title.textContent =
    `💖 Hola ${name}, ¡un gusto recibirte!`;

  text.innerHTML =
    `Sabemos que <strong>${favoriteGroup}</strong> es tu grupo favorito, así que creemos que estas canciones pueden gustarte.`;

  const recommendationsList =
    recommendations[favoriteGroup] || [];

  cards.innerHTML =
    recommendationsList
      .map(item => `
        <div
          class="rounded-xl bg-primary/10 border border-primary/20 p-4"
        >
          ${item}
        </div>
      `)
      .join("");

  section.classList.remove("hidden");

  section.scrollIntoView({
    behavior: "smooth"
  });
}