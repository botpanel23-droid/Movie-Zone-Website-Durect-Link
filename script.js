// =======================
// Normal JS for movie site
// =======================

let timerInterval;

// WATCH MOVIE BUTTON CLICK
function watchMovie() {
    // Get links from HTML data attributes
    const adLink = document.getElementById("watchBtn").dataset.ad;
    const waitTime = parseInt(document.getElementById("watchBtn").dataset.wait);

    // Store end time
    const endTime = Date.now() + waitTime * 1000;
    localStorage.setItem("adEndTime", endTime);

    // Open Ad
    window.open(adLink, "_blank");

    // Start timer
    startTimer();
}

// TIMER FUNCTION
function startTimer() {
    const timerText = document.getElementById("timerText");
    const getBtn = document.getElementById("getMovieBtn");

    timerText.style.display = "block";

    timerInterval = setInterval(() => {
        const endTime = localStorage.getItem("adEndTime");
        if (!endTime) return;

        const remaining = Math.ceil((endTime - Date.now()) / 1000);

        if (remaining <= 0) {
            clearInterval(timerInterval);
            timerText.style.display = "none";
            getBtn.style.display = "block";
        } else {
            timerText.innerText = `⏳ Please wait ${remaining}s`;
        }
    }, 1000);
}

// GET MOVIE BUTTON CLICK
function getMovie() {
    // Get movie link from HTML data attribute
    const movieLink = document.getElementById("getMovieBtn").dataset.movie;
    window.open(movieLink, "_blank");
}

// ON LOAD CHECK
window.onload = () => {
    const endTime = localStorage.getItem("adEndTime");
    const getBtn = document.getElementById("getMovieBtn");
    const timerText = document.getElementById("timerText");

    if (endTime && Date.now() < endTime) {
        startTimer();
    } else if (endTime && Date.now() >= endTime) {
        getBtn.style.display = "block";
        timerText.style.display = "none";
    }
};
