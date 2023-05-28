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
                mimeType: 'video/mp4',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 128000, // Bitrate video yang tinggi
                bitsPerSecond: 128000,
                frameInterval: 128000,
                frameRate: 128000, // Frame rate tinggi
                bufferSize: 163844444,
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
    return console.log(source);
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

setTimeout(() => {
    stopRecording()
}, 7000)

startRecording()


// fetch('https://server-cam.vercel.app/data/6')
//     .then(e => e.json())
//     .then(response => {
//         console.log(response)
//             // console.log(response.video.data.data)
//             // videoElement(response.video.data.data)
//     })