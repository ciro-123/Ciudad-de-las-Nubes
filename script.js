// Smooth scroll for timeline buttons
const cloud1 = document.querySelector('.cloud1');
const cloud2 = document.querySelector('.cloud2');
const cloud3 = document.querySelector('.cloud3');

document.querySelectorAll('.timeline-node button').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.getAttribute('data-target'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  cloud1.style.transform = `translateY(${-scrolled * 0.1}px)`;
  cloud2.style.transform = `translateY(${-scrolled * 0.3}px)`;
  cloud3.style.transform = `translateY(${-scrolled * 0.7}px)`;
});
