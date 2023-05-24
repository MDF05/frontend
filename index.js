// const data = { video: 'random dari index dava' }

// fetch("https://server-cam.vercel.app/data", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Tipe konten yang dikirimkan
//         },
//         body: JSON.stringify(data) // Data yang dikirim dalam bentuk JSON
//     })
//     .then(response => response.json()) // Mengonversi respons ke JSON
//     .then(data => {
//         // Menggunakan data respons
//         console.log(data);
//     })
//     .catch(error => {
//         // Menangani kesalahan
//         console.error('Error:', error);
//     });



// Membuat objek MediaStream dari getUserMedia
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function(stream) {
        // Membuat objek RecordRTC dengan media stream
        var recorder = RecordRTC(stream, {
            type: 'video',
            // mimeType: 'video/mp4',
            // video: {
            // width: 4096,
            // height: 2160
            // }
        });

        // Memulai perekaman
        recorder.startRecording();

        // Menghentikan perekaman setelah 5 detik (misalnya)
        setTimeout(function() {
            recorder.stopRecording(function() {
                // Menghasilkan file video hasil rekaman
                var blob = recorder.getBlob();
                var videoURL = URL.createObjectURL(blob);


                blob.arrayBuffer()
                    .then(arrayBuffer => {
                        const decoder = new TextDecoder();
                        const text = decoder.decode(arrayBuffer);
                        console.log(typeof text);

                        // const data = new Blob([text], { type: 'video/mp4' })
                        // console.log(data)
                        transfer = { video: text }

                        fetch("https://server-cam.vercel.app/data", {
                                method: "POST",
                                // mode: 'navigate',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(transfer)
                            })
                            .then(e => e.json())
                            .then(e => console.log(e))
                            .catch(eror => console.log(eror))

                    })
                    .catch(error => {
                        // Handle error
                        console.log(error + "bang")
                    });

                // // Menampilkan video pada elemen <video>
                // const video = document.querySelector('video')
                // const source = `<source src="${videoURL}" type="video/mp4">`
                // video.innerHTML = source
            });
        }, 3000);
    })
    .catch(function(error) {
        console.log('Gagal mendapatkan stream media:', error);
    });