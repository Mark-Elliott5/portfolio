import anime from 'animejs';

anime({
  targets: '#blinking-underscore',
  keyframes: [
    { opacity: 0, duration: 530 },
    { opacity: 1, duration: 530 },
  ],
  loop: true,
});
