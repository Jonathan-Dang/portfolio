const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
let onceFlag = false;

document.getElementById('name').style.opacity = "1.0";

document.getElementById('HelloWorld').onmouseover = (event) => {
    if (onceFlag)
        return;
    let iterations = 0;
  
    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return event.target.dataset.value[index];
          } else return letters[Math.floor(Math.random() * 62)];
        })
        .join("");
  
      iterations += 1 / 10;
  
      if (iterations >= event.target.dataset.value.length)
        clearInterval(interval);
    }, 50);

    onceFlag = true;
  };