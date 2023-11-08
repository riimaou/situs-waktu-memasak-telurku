document.addEventListener("DOMContentLoaded", function() {
    let countdownInterval;
    let isCountingDown = false;

    const timerElement = document.getElementById("timer");
    const startButton = document.getElementById("start-button");
    const cancelButton = document.getElementById("cancel-button");
    const cookingLevelSelect = document.getElementById("cooking-level");
    const dingSound = document.getElementById("ding-sound");
    const stopSoundButton = document.getElementById("stop-sound-button");

    stopSoundButton.addEventListener("click", function() {
        dingSound.pause();
        dingSound.currentTime = 0;
        stopSoundButton.classList.add("hidden");
        isCountingDown = false;
    });

    startButton.addEventListener("click", function() {
        const cookingLevel = parseInt(cookingLevelSelect.value, 10);
        
        if (!isCountingDown) {
            startTimer(cookingLevel);
            isCountingDown = true;
        } else {
            resetTimer();
            isCountingDown = false;
        }
        
        startButton.disabled = true;
        cancelButton.disabled = false;
    });

    cancelButton.addEventListener("click", function() {
        resetTimer();
        isCountingDown = false;
    });

    function startTimer(durationInMinutes) {
        const endTime = new Date().getTime() + durationInMinutes * 60 * 1000;

        countdownInterval = setInterval(function() {
            const currentTime = new Date().getTime();
            const timeRemaining = endTime - currentTime;

            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            timerElement.textContent = `${minutes} menit ${seconds} detik`;

            if (timeRemaining < 0) {
                clearInterval(countdownInterval);
                timerElement.textContent = "Telur sudah matang!";
                dingSound.play();
                stopSoundButton.classList.remove("hidden");
                isCountingDown = false;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(countdownInterval);
        timerElement.textContent = "";
        startButton.disabled = false;
        cancelButton.disabled = true;
        dingSound.pause();
        dingSound.currentTime = 0;
        stopSoundButton.classList.add("hidden");
    }
});
