import anime from 'animejs';

anime({
  targets: '#blinking-underscore',
  keyframes: [
    { opacity: 0, duration: 530 },
    { opacity: 1, duration: 530 },
  ],
  loop: true,
});

anime({
  targets: '.project',
  keyframes: [
    { translateY: 500, opacity: 0, duration: 100 },
    { translateY: 0, opacity: 1, duration: 2000 },
  ],
  autoplay: true,
  easing: 'spring(1, 30, 20, 0)',
});

const projects = document.getElementsByClassName('project');

for (let i = 0; i < projects.length; i += 1) {
  projects[i].addEventListener('mousemove', (e) => {
    const boundingBox = projects[i].getBoundingClientRect();
    const centerX = boundingBox.left + boundingBox.width / 2;
    const centerY = boundingBox.top + boundingBox.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const tiltX = (mouseY / centerY) * 10; // Adjust the tilt sensitivity
    const tiltY = -(mouseX / centerX) * 10; // Adjust the tilt sensitivity

    projects[
      i
    ].style.transform = `perspective(400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  projects[i].addEventListener('mouseleave', () => {
    projects[i].style.transform =
      'perspective(400px) rotateX(0deg) rotateY(0deg)';
  });
}

// function generateBinaryString() {
//   const length = window.innerWidth;
//   let string = '';
//   for (let i = 0; i < length; i += 1) {
//     const randomInt = Math.floor(Math.random() * 2);
//     string += randomInt;
//   }
//   return string;
// }

function newGenerateBinaryString() {
  const spaces = Math.floor(window.innerWidth / 4.8);
  const length = spaces / 4;
  let string = '';
  const randomPercent = (Math.random() * 99) / 100;
  const newStringLength = Math.floor(randomPercent * length) + 5;
  for (let i = 0; i < newStringLength; i += 1) {
    const randomInt = Math.floor(Math.random() * 2);
    string += `${randomInt}`;
  }
  const stringMidpoint = Math.floor(string.length / 2);
  const remainingSpaceLength = spaces - newStringLength;
  let newString = '';
  const repeatedString = ` `.repeat(remainingSpaceLength);
  newString += string.slice(0, stringMidpoint);
  newString += repeatedString;
  newString += string.slice(stringMidpoint);
  return newString;
}

const colorsClasses = ['green-color', 'amber-color'];

const blinkingUnderscore = document.getElementById('blinking-underscore');
blinkingUnderscore.addEventListener('click', () => {
  const currentColor = colorsClasses.shift();
  const root = document.querySelector(':root');
  root.classList = '';
  root.classList.add(currentColor);
  colorsClasses.push(currentColor);
});

function updateBackground() {
  const svg = document.getElementById('background-svg');
  svg.replaceChildren();
  const width = window.innerWidth;
  const height = window.innerHeight;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', `${window.innerWidth}`);
  svg.setAttribute('height', `${window.innerHeight}`);
  for (let i = 1; i < height + 1; i += 8) {
    const textElem = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    textElem.setAttribute('x', '1');
    textElem.setAttribute('y', i);
    textElem.setAttribute(
      'style',
      `font-size: 8px; white-space: pre; text-wrap: nowrap; fill: var(--main-color); white-space: pre;`
    );
    textElem.textContent = newGenerateBinaryString();
    svg.append(textElem);
  }
  const intervalTime = 500;
  setTimeout(updateBackground, intervalTime);
}

updateBackground();