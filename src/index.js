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
    console.log('event emitted 2');
    projects[i].style.transform =
      'perspective(400px) rotateX(0deg) rotateY(0deg)';
  });
}
