fetch('https://server-cam.vercel.app/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token'
        },
        body: JSON.stringify({ video: 'value' })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Memproses data yang diterima
        console.log(data);
    })
    .catch(error => {
        // Menangani error
        console.error('Error:', error);
    });