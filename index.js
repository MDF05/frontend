// Variabel global
let recordRTC;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const mongodbURL = 'https://server-cam.vercel.app/upload'; // Ganti dengan URL MongoDB Anda

// Fungsi untuk memulai perekaman
function startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
            const options = {
                mimeType: 'video/mp4',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2000000,
                bitsPerSecond: 2000000
            };
            recordRTC = RecordRTC(stream, options);
            recordRTC.startRecording();
        })
        .catch(function(error) {
            console.error('Kesalahan saat mengakses perangkat media: ', error);
        });
}


// function videoElement(buffer) {

//     const modifiedBuffer = new Uint8Array(buffer.data);
//     const blob = new Blob([modifiedBuffer], { type: 'video/webm' })
//     const elemenVideo = document.querySelector('video')
//     const urlSrc = URL.createObjectURL(blob);
//     const source = `<source src='${urlSrc}' type='video/mp4' />`
//     elemenVideo.innerHTML = source

//     return console.log(modifiedBuffer);
// }

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

        // formData.append('video', blob, 'video.webm');
        // fetch("http://localhost:3000/upload", {
        //     method: 'POST',
        //     body: formData
        //     })
        //     .then(e => e.json())
        //     .then(response => console.log(response))
        //     .catch(error => console.log('gagal menyimpan', error))

        // URL.revokeObjectURL(dataURL)
    });
}

setTimeout(() => {
    stopRecording()
}, 7000)

startRecording()

// Event listener untuk tombol mulai merekam
// startButton.addEventListener('click', startRecording);

// Event listener untuk tombol berhenti merekam
// stopButton.addEventListener('click', stopRecording);