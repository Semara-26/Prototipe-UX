document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.querySelector('.timer');
  const otpInputs = document.querySelectorAll('.otp-inputs input');
  const numpadButtons = document.querySelectorAll('.numpad button');
  const backspaceButton = document.querySelector('.numpad button:last-child');
  const resendButton = document.querySelector('.resend-button');
  const submitButton = document.querySelector('.submit-button');
  
  let timer = parseInt(timerElement.textContent);
  let currentIndex = 0;
  let countdown;

  const startTimer = () => {
    timerElement.textContent = timer;
    clearInterval(countdown);

    countdown = setInterval(() => {
      if (timer > 0) {
        timer--;
        timerElement.textContent = timer;
      } else {
        clearInterval(countdown);
        resendButton.disabled = false;
      }
    }, 1000);
  };

  startTimer();

  numpadButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const number = button.textContent;

      if (number !== "⌫" && currentIndex < otpInputs.length) {
        otpInputs[currentIndex].value = number;
        currentIndex++;

        if (currentIndex < otpInputs.length) {
          otpInputs[currentIndex].focus();
        }
      }
    });
  });

  backspaceButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      otpInputs[currentIndex].value = '';
      otpInputs[currentIndex].focus();
    }
  });

  resendButton.disabled = true;

  resendButton.addEventListener('click', () => {
    if (timer === 0) {
      timer = 59;
      startTimer();
      resendButton.disabled = true;
    }
  });
});
