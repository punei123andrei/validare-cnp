import domReady from '@wordpress/dom-ready';

async function fetchApiKey() {
    try {
        // Ensure wpApiSettings is available before making requests
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

        if (!response.ok) throw new Error('Failed to fetch API key');
        const data = await response.json();
        return data['formular-api-key'];
    } catch (error) {
        console.error('Error fetching API key:', error);
        return null;
    }
}

domReady(() => {

    const form = document.querySelector('.form-cta-form');
    


    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputField = form.querySelector('.form-cta-input');
            const resultsDiv = document.querySelector('.cnp-result'); 
            const cnpValue = inputField.value.trim();

            if (!cnpValue) {
                alert('Te rog sa introduci un CNP');
                return;
            }

            const apiUrl = `https://api.openapi.ro/api/validate/cnp/${cnpValue}`;
            
            let apiKey = await fetchApiKey();

            if (!apiKey) {
                resultsDiv.innerHTML = `<p style="color: red;">Nu s-a putut obține cheia API.</p>`;
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
                // check if data is valid
                if (!data.valid) {
                    resultsDiv.innerHTML = `<p style="color: red;">CNP-ul introdus nu este valid.</p>`;
                    return;
                }
                console.log(data.parsed);

                const translatedData = `
                    <ul>
                        <li><strong>Indice Județ:</strong> ${data.parsed.county_index}</li>
                        <li><strong>Județul Nașterii:</strong> ${data.parsed.county_of_birth}</li>
                        <li><strong>Data Nașterii:</strong> ${data.parsed.date_of_birth}</li>
                        <li><strong>Rezident Străin:</strong> ${data.parsed.foreign_resident ? 'Da' : 'Nu'}</li>
                        <li><strong>Sex:</strong> ${data.parsed.sex === 'm' ? 'Masculin' : 'Feminin'}</li>
                    </ul>
                `;
                resultsDiv.innerHTML = translatedData;
            
            } catch (error) {
                console.error('Eroare API:', error);
                alert('A apărut o eroare la validarea CNP-ului. Verifică din nou.');
            }
        });
    }
});
