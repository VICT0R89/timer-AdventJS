class Timer {
  private seconds: number
  private timerInterval: NodeJS.Timeout | null

  constructor(seconds: number) {
    this.seconds = seconds
    this.timerInterval = null
  }

  setInitialTime(minutes: number, seconds: number) {
    this.seconds = minutes * 60 + seconds
  }

  start() {
    const isStart: boolean = document.getElementById('startBtn')?.textContent == 'START'
    const startBtn = document.getElementById('startBtn') as HTMLButtonElement
    if (isStart) {
      startBtn.textContent = 'STOP'
      this.timerInterval = setInterval(() => {
        this.updateTimeDisplay()
        this.seconds--

        if (this.seconds < 0) {
          this.stop()
          startBtn.textContent = 'RESTART'
          document.getElementById('ring')?.classList.add('ending')
        }
      }, 1000)
    } else if (!isStart){
      if (startBtn.textContent == 'STOP') {
        startBtn.textContent = 'START'
        this.stop()
      } else {
        startBtn.textContent = 'START'
        this.setInitialTime(parseInt('15'), parseInt('00'))
        document.getElementById('ring')?.classList.remove('ending')
        this.start()
      }
    }
  }

  stop() {
    clearInterval(this.timerInterval as NodeJS.Timeout)
  }

  updateTimeDisplay() {
    const minutesElement = document.getElementById('minutes') as HTMLInputElement
    const secondsElement = document.getElementById('seconds') as HTMLInputElement

    const minutes = Math.floor(this.seconds / 60)
    const seconds = this.seconds % 60

    minutesElement.value = String(minutes).padStart(2, '0')
    secondsElement.value = String(seconds).padStart(2, '0')
  }
}

const startButton = document.getElementById('startBtn')
const settingsBtn = document.getElementById('settingsBtn')
const minutes = document.getElementById('minutes') as HTMLInputElement
const seconds = document.getElementById('seconds') as HTMLInputElement

const timer = new Timer(0)

startButton?.addEventListener('click', () => {
  timer.setInitialTime(parseInt(minutes.value), parseInt(seconds.value))
  timer.start()
})

settingsBtn?.addEventListener('click', () => {
  if (timer) {
    timer.stop()
    minutes.disabled = !minutes.disabled
    seconds.disabled = !seconds.disabled
  }
})
