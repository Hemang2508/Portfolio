
/* File: script.js */
(function(){
  // Minimal JS to enable interactivity: navigation, modal, filters, contact form
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  // Smooth scroll behavior for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // close nav on small screens
          if(navList.classList.contains('show')) navList.classList.remove('show');
        }
      }
    })
  });

  // Project modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalMeta = document.getElementById('modalMeta');
  const modalClose = document.getElementById('modalClose');

  function openModal(data){
    modalTitle.textContent = data.title || 'Project';
    modalBody.textContent = data.desc || '';
    modalMeta.textContent = data.skills ? ('Skills: ' + data.skills) : '';
    modal.setAttribute('aria-hidden','false');
    modal.style.display = 'flex';
    // trap focus lightly
    modalClose.focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modal.style.display = 'none';
  }
  document.querySelectorAll('.js-open-project').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      try{const data = JSON.parse(btn.getAttribute('data-project')); openModal(data);}catch(e){openModal({title:'Details',desc:'No details available.'});}
    })
  });
  if(modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  // Certificates quick view
  document.querySelectorAll('.cert-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      try{const info = JSON.parse(btn.getAttribute('data-cert')); openModal({title:info.title, desc: info.issuer + ' — ' + info.date, skills:''});}catch(e){openModal({title:'Certificate'});}    
    });
  });

  // Projects filter
  const filterSelect = document.getElementById('filterSelect');
  const projectsGrid = document.getElementById('projectsGrid');
  if(filterSelect && projectsGrid){
    filterSelect.addEventListener('change', ()=>{
      const val = filterSelect.value;
      projectsGrid.querySelectorAll('.card').forEach(card=>{
        const cat = card.getAttribute('data-category');
        if(val === 'all' || val === cat) card.style.display = '';
        else card.style.display = 'none';
      });
    })
  }

  // Contact form validation & fake submission
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(name.length < 2){ formStatus.textContent = 'Please enter a valid name.'; form.name.focus(); return; }
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ formStatus.textContent = 'Please enter a valid email.'; form.email.focus(); return; }
      if(message.length < 6){ formStatus.textContent = 'Please write a short message.'; form.message.focus(); return; }

      // Simulate submission success
      formStatus.textContent = 'Message sent — thank you!';
      form.reset();
      setTimeout(()=>{ formStatus.textContent = ''; }, 4200);
    });
  }

})();
