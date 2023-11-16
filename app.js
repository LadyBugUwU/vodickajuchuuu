const express = require('express');
const app = express();
const port = 22111;
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/registrace', (req, res) => {
    res.render('registrace');
});

app.use('/public', express.static('public'));

app.post('/submit-registration', (req, res) => {
    const { nick, je_plavec, kanoe_kamarad } = req.body;

    // Kontrola, zda-li je_plavec je true
    if (je_plavec !== '1') {
        return res.status(400).json({ message: 'Osoba musí být plavce.', code: 400 });
    }

    // Kontrola, zda-li nick je validní
    const nickRegex = /^[a-zA-Z0-9]{2,20}$/;
    if (!nick.match(nickRegex)) {
        return res.status(400).json({ message: 'Přezdívka musí obsahovat 2 až 20 znaků, pouze písmena a číslice.', code: 400 });
    }

    // Kontrola, zda-li kanoe_kamarad splňuje pravidla
    if (kanoe_kamarad) {
        if (!kanoe_kamarad.match(nickRegex)) {
            return res.status(400).json({ message: 'Kámoš na kanoe musí obsahovat 2 až 20 znaků, pouze písmena a číslice.', code: 400 });
        }
    }

    // Uložení registrace
    const registration = {
        nick,
        je_plavec: true,
        kanoe_kamarad: kanoe_kamarad || null
    };

    // Uložení registrace do souboru nebo databáze (místo této ukázky)
    // Zde by mělo být uložení dat do trvalého úložiště, např. souboru nebo databáze.

    return res.status(200).json({ message: 'Registrace úspěšně uložena.', code: 200 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
