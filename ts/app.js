"use strict";
class Timer {
    constructor(seconds) {
        this.seconds = seconds;
        this.timerInterval = null;
    }
    setInitialTime(minutes, seconds) {
        this.seconds = minutes * 60 + seconds;
    }
    start() {
        var _a, _b;
        const isStart = ((_a = document.getElementById('startBtn')) === null || _a === void 0 ? void 0 : _a.textContent) == 'START';
        const startBtn = document.getElementById('startBtn');
        if (isStart) {
            startBtn.textContent = 'STOP';
            this.timerInterval = setInterval(() => {
                var _a;
                this.updateTimeDisplay();
                this.seconds--;
                if (this.seconds < 0) {
                    this.stop();
                    startBtn.textContent = 'RESTART';
                    (_a = document.getElementById('ring')) === null || _a === void 0 ? void 0 : _a.classList.add('ending');
                }
            }, 1000);
        }
        else if (!isStart) {
            if (startBtn.textContent == 'STOP') {
                startBtn.textContent = 'START';
                this.stop();
            }
            else {
                startBtn.textContent = 'START';
                this.setInitialTime(parseInt('15'), parseInt('00'));
                (_b = document.getElementById('ring')) === null || _b === void 0 ? void 0 : _b.classList.remove('ending');
                this.start();
            }
        }
    }
    stop() {
        clearInterval(this.timerInterval);
    }
    updateTimeDisplay() {
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        minutesElement.value = String(minutes).padStart(2, '0');
        secondsElement.value = String(seconds).padStart(2, '0');
    }
}
const startButton = document.getElementById('startBtn');
const settingsBtn = document.getElementById('settingsBtn');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const timer = new Timer(0);
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', () => {
    timer.setInitialTime(parseInt(minutes.value), parseInt(seconds.value));
    timer.start();
});
settingsBtn === null || settingsBtn === void 0 ? void 0 : settingsBtn.addEventListener('click', () => {
    if (timer) {
        timer.stop();
        minutes.disabled = !minutes.disabled;
        seconds.disabled = !seconds.disabled;
    }
});
