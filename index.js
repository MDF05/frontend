fetch('https://server-cam.vercel.app/', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video: 'value' })
    })
    .then(response => {
        // Lakukan sesuatu dengan respons
    })
    .catch(error => {
        // Tangani error
    });