/* HazratAminOfficial — interactive layer */
(function(){
"use strict";
var root=document.documentElement;
/* ---------- theme ---------- */
try{var saved=localStorage.getItem('ha-theme');if(saved){root.setAttribute('data-theme',saved);}}catch(e){}
function currentTheme(){var t=root.getAttribute('data-theme');if(t)return t;return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
/* ---------- progress bar ---------- */
var prog=document.createElement('div');prog.id='haProgress';document.body.appendChild(prog);
function onScroll(){var h=document.documentElement;var max=h.scrollHeight-h.clientHeight;prog.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
/* ---------- floating buttons ---------- */
var fabs=document.createElement('div');fabs.className='ha-fabs';
var bTheme=document.createElement('button');bTheme.className='ha-fab';bTheme.title='Dark / light mode';bTheme.setAttribute('aria-label','Toggle dark mode');
function themeIcon(){bTheme.textContent=currentTheme()==='dark'?'☀️':'🌙';}
themeIcon();
bTheme.onclick=function(){var n=currentTheme()==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('ha-theme',n);}catch(e){}themeIcon();};
var bSearch=document.createElement('button');bSearch.className='ha-fab';bSearch.textContent='🔍';bSearch.title='Search the website';bSearch.setAttribute('aria-label','Search the website');
var bTop=document.createElement('button');bTop.className='ha-fab';bTop.textContent='↑';bTop.title='Back to top';bTop.setAttribute('aria-label','Back to top');
bTop.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
fabs.appendChild(bTheme);fabs.appendChild(bSearch);fabs.appendChild(bTop);document.body.appendChild(fabs);
/* ---------- live clock (PKT) ---------- */
function addClock(){
  var host=document.querySelector('header .wrap')||document.querySelector('header');
  if(!host||document.querySelector('.ha-clock'))return;
  var chip=document.createElement('div');chip.className='ha-clock';host.appendChild(chip);
  var fmtT=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Karachi',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
  var fmtD=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Karachi',weekday:'short',day:'numeric',month:'short',year:'numeric'});
  function tick(){var now=new Date();chip.textContent='🕒 '+fmtT.format(now).toUpperCase()+' PKT • '+fmtD.format(now);}
  tick();setInterval(tick,1000);
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addClock);}else{addClock();}
/* ---------- site search ---------- */
var INDEX=[
['Home','/','home main hazrat amin official'],
['Lectures — Class 6 Computer Science','class-6-computer-science.html','lectures class 6 computer science kp syllabus'],
['Lecture 1 — Introduction to Computer','class-6-lecture-1-introduction-to-computer.html','lecture 1 computer hardware software'],
['Lecture 2 — Microprocessor','class-6-lecture-2-microprocessor.html','lecture 2 cpu brain microprocessor'],
['Lecture 3 — Input and Output Devices','class-6-lecture-3-input-output-devices.html','lecture 3 input output devices keyboard mouse'],
['Technology News','news.html','news tech ai technology khabar'],
['Breaking: KP Emergency & Arrests','news.html','breaking news emergency khyber pakhtunkhwa sohail afridi junaid akbar arrested governor rule'],
['Jobs — Latest ETEA & NTS Jobs','jobs.html','jobs nokri etea nts vacancy'],
['Job — Rescue 1122 KP','job-rescue-1122-kp-839.html','rescue 1122 jobs'],
['Job — KGMC Peshawar','job-kgmc-868.html','kgmc khyber girls medical college jobs'],
['Sports — Cricket Schedule','sports.html','sports cricket match schedule pakistan sri lanka t20i odi test'],
['YouTube — Hazrat Amin Official','youtube.html','youtube videos shorts channel'],
['Fiverr Services','fiverr.html','fiverr gigs services video editing'],
['Apps & AI Tools','apps.html','apps ai tools chatgpt websites'],
['Shop — Recommended Products','shop.html','shop amazon products mic ring light'],
['Events','events.html','events special days'],
['My Valley — Jijal & Dhup Valley','valley.html','valley jijal dhup kohistan home town'],
['About Hazrat Amin','about.html','about teacher jijal data science'],
['Contact','contact.html','contact email whatsapp']];
var overlay=document.createElement('div');overlay.id='haSearchOverlay';
overlay.innerHTML='<div class="ha-search-box"><input id="haSearchInput" type="text" placeholder="Search lectures, jobs, news, sports…" autocomplete="off"><div class="ha-results" id="haResults"></div></div>';
document.body.appendChild(overlay);
var input=overlay.querySelector('#haSearchInput'),results=overlay.querySelector('#haResults');
function render(q){
  q=(q||'').trim().toLowerCase();results.innerHTML='';
  var hits=INDEX.filter(function(it){return !q||(it[0]+' '+it[2]).toLowerCase().indexOf(q)>=0;}).slice(0,8);
  if(!hits.length){results.innerHTML='<p style="padding:10px 12px;color:var(--muted)">No match found — try “jobs”, “cricket” or “lecture”.</p>';return;}
  hits.forEach(function(it){var a=document.createElement('a');a.href=it[1];a.innerHTML='<b></b><span></span>';a.querySelector('b').textContent=it[0];a.querySelector('span').textContent=it[1];results.appendChild(a);});
}
bSearch.onclick=function(){overlay.classList.add('open');render('');setTimeout(function(){input.focus();},50);};
overlay.addEventListener('click',function(e){if(e.target===overlay){overlay.classList.remove('open');}});
input.addEventListener('input',function(){render(input.value);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){overlay.classList.remove('open');}});
/* ---------- reveal on scroll ---------- */
var cards=document.querySelectorAll('.card');
if('IntersectionObserver' in window&&cards.length){
  cards.forEach(function(c){c.classList.add('ha-reveal');});
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('ha-in');io.unobserve(en.target);}});},{threshold:.08});
  cards.forEach(function(c){io.observe(c);});
}
/* ---------- sports match centre ---------- */
var mc=document.getElementById('matchCentre');
if(mc){
  var FIXTURES=[
   ['2026-10-11T18:30:00+05:00','Pakistan vs Sri Lanka — 2nd T20I','Rawalpindi Cricket Stadium'],
   ['2026-10-13T18:30:00+05:00','Pakistan vs Sri Lanka — 3rd T20I','Rawalpindi Cricket Stadium'],
   ['2026-10-18T14:30:00+05:00','Pakistan vs Sri Lanka — ODI Tri-Series','Rawalpindi Cricket Stadium'],
   ['2026-10-20T14:30:00+05:00','Pakistan vs England — ODI Tri-Series','Rawalpindi Cricket Stadium'],
   ['2026-10-22T14:30:00+05:00','Sri Lanka vs England — ODI Tri-Series','Rawalpindi Cricket Stadium'],
   ['2026-10-25T14:30:00+05:00','Pakistan vs England — ODI Tri-Series','Gaddafi Stadium, Lahore'],
   ['2026-10-27T14:30:00+05:00','Pakistan vs Sri Lanka — ODI Tri-Series','Gaddafi Stadium, Lahore'],
   ['2026-10-29T14:30:00+05:00','Sri Lanka vs England — ODI Tri-Series','Gaddafi Stadium, Lahore'],
   ['2026-10-31T14:30:00+05:00','ODI Tri-Series FINAL','Gaddafi Stadium, Lahore'],
   ['2026-11-09T10:30:00+05:00','Pakistan vs Sri Lanka — 1st Test','Rawalpindi Cricket Stadium'],
   ['2026-11-17T10:30:00+05:00','Pakistan vs Sri Lanka — 2nd Test','Gaddafi Stadium, Lahore']];
  mc.innerHTML='<h3>🏏 Match Centre</h3><div class="mc-next"></div><div class="mc-count"></div><div class="mc-tabs"><button class="mc-tab active" data-f="all">All matches</button><button class="mc-tab" data-f="T20I">T20I</button><button class="mc-tab" data-f="ODI">ODI Tri-Series</button><button class="mc-tab" data-f="Test">Tests</button></div>';
  var nextEl=mc.querySelector('.mc-next'),countEl=mc.querySelector('.mc-count');
  function pad(n){return (n<10?'0':'')+n;}
  function mcTick(){
    var now=new Date(),next=null,live=null;
    for(var i=0;i<FIXTURES.length;i++){var t=new Date(FIXTURES[i][0]);var end=t.getTime()+(FIXTURES[i][1].indexOf('Test')>=0?5*24*3600e3:4*3600e3);
      if(now>=t&&now<end){live=FIXTURES[i];break;}
      if(t>now){next=FIXTURES[i];break;}}
    if(live){nextEl.textContent='🔴 MATCH DAY — '+live[1]+' • '+live[2];countEl.innerHTML='Match in progress <small>— good luck, Pakistan! 🇵🇰</small>';return;}
    if(!next){nextEl.textContent='No upcoming fixture in the current schedule.';countEl.textContent='';return;}
    var diff=new Date(next[0])-now;
    var d=Math.floor(diff/864e5),h=Math.floor(diff/36e5)%24,m=Math.floor(diff/6e4)%60,s=Math.floor(diff/1e3)%60;
    nextEl.textContent='Next match: '+next[1]+' • '+next[2];
    countEl.innerHTML=(d>0?d+'<small> days </small> ':'')+pad(h)+'<small> hrs </small>'+pad(m)+'<small> min </small>'+pad(s)+'<small> sec</small>';
  }
  mcTick();setInterval(mcTick,1000);
  var tabs=mc.querySelectorAll('.mc-tab');
  tabs.forEach(function(tab){tab.addEventListener('click',function(){
    tabs.forEach(function(t){t.classList.remove('active');});tab.classList.add('active');
    var f=tab.getAttribute('data-f');
    document.querySelectorAll('article.card').forEach(function(card){
      var tag=card.querySelector('.tag');var txt=tag?tag.textContent:'';
      var show=f==='all'||txt.indexOf(f)>=0||(f==='ODI'&&txt.indexOf('Tri-Series')>=0);
      card.style.display=show?'':'none';});
  });});
}
})();
