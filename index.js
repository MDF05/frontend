fetch('https://server-cam.vercel.app/data', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video: 'value' })
    })
    .then(response => response.json())
    .then(response => console.log(response))

.catch(error => {
    // Tangani error
    console.log(error)
});