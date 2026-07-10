document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  btn.addEventListener('click', doSearch);
  input.addEventListener('keypress', (e)=>{ if(e.key==='Enter') doSearch(); });

  function doSearch(){
    const q = input.value.trim().toLowerCase();
    if(!q) {
      // show all
      document.querySelectorAll('.cards .card').forEach(c=>c.style.display='block');
      return;
    }
    document.querySelectorAll('.cards .card').forEach(c=>{
      const text = c.innerText.toLowerCase();
      c.style.display = text.includes(q) ? 'block' : 'none';
    });
  }

  // Carousel for editors' pick
  const carousel = document.getElementById('editorsCarousel');
  if(carousel){
    const slidesEl = carousel.querySelector('.slides');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsEl = document.getElementById('carouselDots');
    let index = 0;
    let timer = null;

    function renderDots(){
      // show simple dots using • characters or ellipsis per spec
      dotsEl.innerHTML = slides.map((s,i)=> i===index ? '●' : '○').join(' ');
    }

    function goTo(i){
      index = (i + slides.length) % slides.length;
      slidesEl.style.transform = `translateX(-${index * 100}%)`;
      renderDots();
      // control arrow visibility: hide prev on first, hide next on last
      if(prevBtn) prevBtn.style.display = (index === 0) ? 'none' : 'block';
      if(nextBtn) nextBtn.style.display = (index === slides.length - 1) ? 'none' : 'block';
    }

    function next(){ goTo(index+1); }
    function prev(){ goTo(index-1); }

    prevBtn.addEventListener('click', ()=>{ prev(); resetTimer(); });
    nextBtn.addEventListener('click', ()=>{ next(); resetTimer(); });
    renderDots();
    // initial arrow visibility: hide prev on first slide
    if(prevBtn) prevBtn.style.display = 'none';

    function resetTimer(){ if(timer) clearInterval(timer); timer = setInterval(next, 5000); }
    resetTimer();

    // allow clicking dots to change (make dots clickable)
    dotsEl.addEventListener('click', (e)=>{
      const txt = e.target.innerText;
      // fallback: cycle
      next(); resetTimer();
    });
  }
});
