const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const filter=btn.dataset.filter;
  document.querySelectorAll('.gallery-item').forEach(item=>item.classList.toggle('hidden',filter!=='all'&&item.dataset.category!==filter));
}));

const lightbox=document.getElementById('lightbox'), lightboxArt=lightbox.querySelector('.lightbox-art'), lightboxTitle=lightbox.querySelector('h3');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  lightboxArt.style.background=item.style.getPropertyValue('--bg'); lightboxArt.innerHTML=item.querySelector('.placeholder-object').outerHTML;
  lightboxTitle.textContent=item.dataset.title; lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');
}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const form=document.getElementById('quoteForm');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(form);
  const subject=encodeURIComponent(`3D Shapeshifter Quote Request — ${d.get('project')}`);
  const body=encodeURIComponent(
`Hello 3D Shapeshifter,

I would like to request a quote.

Name: ${d.get('name')}
Email: ${d.get('email')}
Phone: ${d.get('phone')||'Not provided'}
Project: ${d.get('project')}
Quantity: ${d.get('quantity')||'Not specified'}

Project description:
${d.get('description')}

Reference file: ${d.get('file')?.name||'None attached'}

Preferred contact method: ${d.get('phone')?'Phone/WhatsApp':'Email'}

Thank you.`
  );
  window.location.href=`mailto:KianbothaMTV@gmail.com?subject=${subject}&body=${body}`;
  form.querySelector('.form-message').textContent='Your email application should open with your quote request ready to send.';
});
