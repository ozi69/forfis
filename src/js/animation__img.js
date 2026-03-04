(function(){
  const N        = 24;
  const INTERVAL = 1800;
  const RADIUS   = window.innerWidth < 768 ? 1000 : 2200; 

  
  const ring  = document.querySelector('.img-animation');
  const items = Array.from(ring.querySelectorAll('.img-animation__item'));

  let groupAngle = 0;
  let activeIdx  = 0;
  const step     = 360 / N;

  function getOpacity(angleDeg) {
    const a    = ((angleDeg % 360) + 360) % 360;
    const dist = Math.min(a, 360 - a);
    return +(1 - (dist / 180) * 0.65).toFixed(2);
  }

  function render(animated) {
    items.forEach((el, i) => {
      const angleDeg = (step * i) + groupAngle;
      const angleRad = (angleDeg - 90) * (Math.PI / 180);

      const tx = Math.cos(angleRad) * RADIUS;
      const ty = Math.sin(angleRad) * RADIUS;

      const isActive = (i === activeIdx);
      const scale    = isActive ? 1.3 : 1;
      const opacity  = isActive ? 1 : getOpacity(angleDeg);

      el.style.transition = animated
        ? 'transform 0.85s cubic-bezier(0.76,0,0.24,1), opacity 0.85s ease'
        : 'none';

      el.style.transform = `translate(-50%,-50%) translate(${tx}px,${ty}px) rotate(${angleDeg}deg) scale(${scale})`;
      el.style.opacity   = opacity;
      el.style.zIndex    = isActive ? 50 : Math.round(opacity * 10);
    });
  }

  render(false);

  setInterval(() => {
    groupAngle -= step;

    let best = 0, bestDist = Infinity;
    for (let i = 0; i < N; i++) {
      let a = ((step * i + groupAngle) % 360 + 360) % 360;
      const d = Math.min(a, 360 - a);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    activeIdx = best;

    render(true);
  }, INTERVAL);
})();