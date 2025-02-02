import domReady from '@wordpress/dom-ready';

async function fetchApiKey() {
    try {
        if (typeof window.wpApiSettings === "undefined") {
            throw new Error("wpApiSettings is not defined. Ensure it's properly localized.");
        }

        const response = await fetch(`${window.wpApiSettings.root}formular-blocks/v1/settings/`, {
            method: 'GET',
            headers: {
                'X-WP-Nonce': window.wpApiSettings.nonce,
                'Content-Type': 'application/json'
            }
        });

        const text = await response.text(); // ✅ Get raw response first
        console.log("Raw API Response:", text); // ✅ Debugging step

        const data = JSON.parse(text); // ✅ Try to parse it
        return data['formular-api-key'];
    } catch (error) {
        console.error('Error fetching API key:', error);
        return null;
    }
}

domReady(() => {
    console.log("DOM Ready! Checking wpApiSettings...");
    // console.log(window.wpApiSettings); // Debugging

    const form = document.querySelector('.form-cta-form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputField = form.querySelector('.form-cta-input');
            const cnpValue = inputField.value.trim();

            if (!cnpValue) {
                alert('Te rog sa introduci un CNP');
                return;
            }

            const apiUrl = `https://api.openapi.ro/api/validate/cnp/${cnpValue}`;
            
            let apiKey = await fetchApiKey();

            if (!apiKey) {
                alert("Nu s-a putut obține cheia API.");
                return;
            }

            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'x-api-key': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error('Eroare la validarea CNP-ului.');
                }

                const data = await response.json();
                console.log('Rezultatul validării:', data);

                alert(`Rezultat: ${JSON.stringify(data, null, 2)}`);

            } catch (error) {
                console.error('Eroare API:', error);
                alert('A apărut o eroare la validarea CNP-ului. Verifică din nou.');
            }
        });
    }
});
