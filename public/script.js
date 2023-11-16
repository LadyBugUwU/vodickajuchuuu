document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.querySelector('form');

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nick = document.getElementById('nick').value;
        const je_plavec = document.querySelector('input[name="je_plavec"]:checked').value;
        const kanoe_kamarad = document.getElementById('kanoe_kamarad').value;

        // Validace přezdívky, je_plavec, kanoe_kamarad (stejný kód jako dříve)

        const formData = {  // Definice formData na této úrovni
            nick: nick,
            je_plavec: je_plavec,
            kanoe_kamarad: kanoe_kamarad
        };

        // Odeslání dat na server pomocí Fetch API
        fetch('/submit-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                showSuccess(data.message);
            } else {
                showError(data.message);
            }
        })
        .catch(error => {
            showError('Chyba při odesílání dat na server.');
        });
    });

    // Zbývající kód pro zobrazování chyb a úspěchu
});
