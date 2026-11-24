(function(){
// MÚSICAS: cada linha é um cartão. Para ativar uma música, coloque o .mp3 na pasta music/ e preencha o s: com o caminho, ex.: s:'music/take-two.mp3'
// Pode trocar os títulos (t) e as frases (a) como quiser.
var SONGS=[
{t:'Body to Body',a:'BTS',s:'music/body-to-body.mp3'},
{t:'Hooligan',a:'BTS',s:'music/hooligan.mp3'},
{t:'Aliens',a:'BTS',s:'music/aliens.mp3'},
{t:'FYA',a:'BTS',s:'music/fya.mp3'},
{t:'2.0',a:'BTS',s:'music/2-0.mp3'},
{t:'No. 29',a:'BTS',s:'music/no-29.mp3'},
{t:'SWIM',a:'BTS',s:'music/swim.mp3'},
{t:'Merry Go Round',a:'BTS',s:'music/merry-go-round.mp3'},
{t:'NORMAL',a:'BTS',s:'music/normal.mp3'},
{t:'Like Animals',a:'BTS',s:'music/like-animals.mp3'},
{t:'they don’t know ’bout us',a:'BTS',s:'music/they-dont-know-bout-us.mp3'},
{t:'One More Night',a:'BTS',s:'music/one-more-night.mp3'},
{t:'Please',a:'BTS',s:'music/please.mp3'},
{t:'Into the Sun',a:'BTS',s:'music/into-the-sun.mp3'},
{t:'Intro: Skool Luv Affair',a:'BTS · Skool Luv Affair',s:'music/intro-skool-luv-affair.mp3'}];
// MÚSICA DEDICADA (seção final), uma só e sua: t = título, a = frase curta, m = sua mensagem (por que escolheu), s = caminho do .mp3 em music/
var DED={t:'Eu dedico minha música favorita',a:'Meddle About · Chase Atlantic 💜',m:'',s:'music/meddle-about.mp3'};
var $=function(s){return document.querySelector(s)},RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function btn(t,f){var b=document.createElement('button');b.textContent=t;b.onclick=f;return b}
document.querySelectorAll('[data-ly]').forEach(function(sec){sec.dataset.ly.split(',').forEach(function(k,j){var s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','ly '+k);s.setAttribute('viewBox','0 0 100 100');s.style.setProperty('--r',(j%2?18:-14)+'deg');s.style.animationDelay=(-j*1.7)+'s';s.innerHTML='<use href="#lily"/>';sec.appendChild(s)})});
var cv=$('#fx'),cx=cv.getContext('2d'),W,H,ps=[],sp=[],C=['#ffd1ea','#ff8fd0','#c9a7ff','#ffffff'];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
function mk(y){return{x:Math.random()*W,y:y,s:5+Math.random()*7,vy:.4+Math.random()*.9,vx:-.3+Math.random()*.6,r:Math.random()*6,vr:(Math.random()-.5)*.04,c:C[Math.random()*4|0],ph:Math.random()*6}}
for(var i=0;i<(RM?0:34);i++)ps.push(mk(Math.random()*H));
function pet(x,y,s,r,c,a){cx.save();cx.translate(x,y);cx.rotate(r);cx.globalAlpha=a;cx.fillStyle=c;cx.beginPath();cx.ellipse(0,0,s,s*.55,0,0,6.28);cx.fill();cx.restore()}
function burst(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*6.28,v=2+Math.random()*6;sp.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,l:1,s:4+Math.random()*7,c:C[Math.random()*4|0],r:Math.random()*6,p:1})}}
function tick(t){cx.clearRect(0,0,W,H);
 ps.forEach(function(p){p.y+=p.vy;p.x+=p.vx+Math.sin(t/900+p.ph)*.5;p.r+=p.vr;if(p.y>H+20)Object.assign(p,mk(-20));pet(p.x,p.y,p.s,p.r,p.c,.6)});
 sp=sp.filter(function(q){q.x+=q.vx;q.y+=q.vy;q.vy+=q.p?.14:.02;q.l-=q.p?.012:.025;if(q.l>0){if(q.p)pet(q.x,q.y,q.s,q.r+=.1,q.c,q.l);else{cx.globalAlpha=q.l;cx.fillStyle='#fff';cx.shadowColor='#ff8fd0';cx.shadowBlur=10;cx.beginPath();cx.arc(q.x,q.y,q.s,0,6.28);cx.fill();cx.shadowBlur=0}}return q.l>0});
 requestAnimationFrame(tick)}
if(!RM){requestAnimationFrame(tick);addEventListener('pointermove',function(e){if(sp.length<250)sp.push({x:e.clientX+Math.random()*10-5,y:e.clientY+Math.random()*10-5,vx:Math.random()-.5,vy:Math.random()*.8,l:1,s:1+Math.random()*2.5})})}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)x.target.classList.add('on')})},{threshold:.15});document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var tx='Feito com carinho para uma ARMY muito especial',ti=0,tw=$('#tw');(function t(){tw.textContent=tx.slice(0,++ti);if(ti<tx.length)setTimeout(t,RM?0:55)})();
var au=new Audio(),cur=-1,ded=0,mb=$('#mus'),tl=$('#tl'),els=[],db=$('#ded'),dc=$('.disc');
var N=SONGS.filter(function(s){return s.s}).length;
function mark(){els.forEach(function(b,i){b.classList.toggle('pl',i===cur&&!ded&&!au.paused)})}
function load(i){ded=0;cur=i;au.src=SONGS[i].s;au.loop=N===1;mark()}
function first(){for(var i=0;i<SONGS.length;i++)if(SONGS[i].s)return i;return -1}
au.onplay=au.onpause=function(){var on=!au.paused;if(on)document.querySelectorAll('.vf video').forEach(function(v){v.pause()});mb.textContent=on?'⏸ pausar':'🎵 tocar';mark();if(DED.s){db.textContent=ded&&on?'⏸ Pausar':'▶ Ouvir';dc.classList.toggle('spin',ded&&on)}};
au.onended=function(){var i=cur;do{i=(i+1)%SONGS.length}while(!SONGS[i].s);load(i);au.play()};
mb.onclick=function(){if(!au.src){var i=first();if(i<0)return;load(i)}if(au.paused)au.play().catch(function(){});else au.pause()};
SONGS.forEach(function(s,i){var d=document.createElement(s.s?'button':'div');d.className='trk'+(s.s?'':' soon');d.innerHTML='<b>'+(i+1)+'</b><span>'+s.t+'<small>'+s.a+'</small></span><em class="eq"><u></u><u></u><u></u></em>';if(s.s)d.onclick=function(){if(cur===i&&!ded&&!au.paused)au.pause();else{load(i);au.play().catch(function(){})}};tl.appendChild(d);els[i]=d});
$('#dt').textContent=DED.t;$('#da').textContent=DED.s?DED.a:'Aqui entra a música que eu escolhi pra você 💜';$('#dm').textContent=DED.m||'';if(!DED.m)$('#dm').style.display='none';
if(!DED.s){db.disabled=true;db.textContent='▶ em breve'}
db.onclick=function(){if(!DED.s)return;if(ded&&!au.paused){au.pause();return}ded=1;cur=-1;au.src=DED.s;au.loop=true;au.play().catch(function(){});mark()};
// QUIZ: [pergunta, resposta certa, errada, errada, errada]. Se o 2º item for null, qualquer resposta vale.
var Q=[
['Qual é o nome do lightstick oficial do BTS?','ARMY Bomb','Lovely Wand','Dream Stick','Purple Bomb'],
['Em que ano o BTS estreou?','2013','2011','2012','2015'],
['O que significa a sigla ARMY?','Adorable Representative M.C. for Youth','Artists and Music Yearly','Always Ready for Music and You','A Real Music Youth'],
['Qual é o nome verdadeiro do RM?','Kim Namjoon','Kim Seokjin','Kim Taehyung','Jeon Jungkook'],
['Qual foi a primeira música do BTS a chegar ao 1º lugar da Billboard Hot 100?','Dynamite','Boy With Luv','Fake Love','Spring Day'],
['Qual integrante foi o primeiro a entrar no serviço militar?','Jin','Suga','J-Hope','RM'],
['Qual foi o primeiro álbum de um artista coreano a liderar a Billboard 200?','Love Yourself: Tear','Wings','Map of the Soul: 7','Dark & Wild'],
['Quem criou a expressão “Borahae”?','V','RM','Jimin','Jin'],
['“Indigo” é o álbum solo de qual integrante?','RM','Jungkook','Jimin','V'],
['Qual música deu ao BTS a primeira indicação ao Grammy?','Dynamite','Butter','Life Goes On','Spring Day'],
['Qual é o nome artístico solo do Suga?','Agust D','Mono','Hope World','Min PD'],
['“Spring Day” faz parte de qual álbum?','You Never Walk Alone','Love Yourself: Her','Map of the Soul: Persona','Skool Luv Affair'],
['“Layover” é o álbum solo de quem?','V','Jin','J-Hope','Jimin'],
['Quem é o integrante mais velho do grupo?','Jin','RM','Suga','J-Hope'],
['Última pergunta: quem é o seu bias?',null,'RM','Jin','Suga','J-Hope','Jimin','V','Jungkook']];
var qi=0,sc=0,qb=$('#quiz');
function ask(){
 if(qi>=Q.length){var n=Q.length-1,t=sc===n?'Perfeito! ARMY de carteirinha 💜':sc>=n*.7?'ARMY de verdade!':sc>=n*.4?'ARMY em treinamento':'Hora de rever os álbuns 😄';
  qb.innerHTML='<h3>'+t+'</h3><p>Você acertou '+sc+' de '+n+'.</p>';qb.appendChild(btn('Jogar de novo',function(){qi=0;sc=0;ask()}));if(sc>=n*.7)burst(innerWidth/2,innerHeight/2,80);return}
 var q=Q[qi],free=q[1]===null,o=free?q.slice(2):q.slice(1).sort(function(){return Math.random()-.5});
 qb.innerHTML='<div class="bar"><i style="width:'+(qi/Q.length*100)+'%"></i></div><small>Pergunta '+(qi+1)+' de '+Q.length+'</small><p class="q">'+q[0]+'</p>';
 var w=document.createElement('div'),fb=document.createElement('p');w.className='opts';qb.appendChild(w);qb.appendChild(fb);
 o.forEach(function(x){var b=btn(x,function(){var r=free||x===q[1],c=b.getBoundingClientRect();if(r&&!free)sc++;
  [].forEach.call(w.children,function(e){e.disabled=true;if(!free&&e.textContent===q[1])e.classList.add('ok')});
  b.classList.add(r?'ok':'no');fb.textContent=free?'Ótima escolha, o gosto é impecável! 💜':r?'Mandou bem! 💜':'Ops! Era: '+q[1];if(r)burst(c.left+c.width/2,c.top,26);
  qb.appendChild(btn(qi===Q.length-1?'Ver resultado':'Próxima',function(){qi++;ask()}))});b.className='opt';w.appendChild(b)})}
ask();
// PHOTOCARD: nome que aparece na frente e mensagem no verso
var HER={name:'Camila de Moraes Silva',msg:'Dez anos de ARMY e você continua brilhando. Borahae, Camila.'};
// QUAL MEMBRO: [pergunta, [resposta, 'membros que ganham ponto'], ...]
var M={RM:'O líder pensativo: você ama ideias, arte e conversas profundas. Calma por fora, cheia de mundo por dentro.',Jin:'O coração engraçado: você leva alegria aonde chega e adora cuidar de quem gosta. Piada ruim é o seu charme.',Suga:'O calmo de fala sincera: você diz o que pensa, ama o seu sossego e esconde um coração enorme.','J-Hope':'O raio de sol: você contagia todo mundo com energia e faz qualquer lugar virar festa.',Jimin:'O doce intenso: carinhosa e dedicada, você emociona quem está por perto sem nem tentar.',V:'O criativo único: você enxerga o mundo do seu jeito e ama arte, música e momentos especiais.',Jungkook:'O talento competitivo: você é boa em tudo que tenta e nunca desiste, nem na brincadeira.'};
var MQ=[
['Seu sábado perfeito é…',['Museu, livro e um café','RM,V'],['Cozinhar e rir com os amigos','Jin,J-Hope'],['Dormir até tarde, sem pressa','Suga,Jimin'],['Dançar ou treinar até cansar','Jimin,Jungkook,J-Hope']],
['No grupo de amigos, você é…',['Quem pensa nos planos','RM,Suga'],['Quem faz todo mundo rir','Jin,J-Hope'],['Quem cuida de todos','Jimin,Jin'],['Quem tem as ideias mais malucas','V,Jungkook']],
['Qual é o seu superpoder?',['Ser sincera sempre','Suga,RM'],['Alegrar qualquer ambiente','J-Hope,Jin'],['Ser boa em tudo que tenta','Jungkook,Jimin'],['Ver beleza onde ninguém vê','V,RM']],
['Num jogo ou competição…',['Quero ganhar de qualquer jeito','Jungkook,Suga'],['Só quero me divertir','J-Hope,Jin'],['Estudo a estratégia antes','RM,Suga'],['Torço pelos outros e dou tudo de mim','Jimin,V']],
['Um presente que você ama ganhar:',['Um livro ou algo de arte','RM,V'],['Um jantar feito com carinho','Jin,Jimin'],['Um dia inteiro sem compromisso','Suga,Jungkook'],['Ingresso para um show','J-Hope,Jimin,Jungkook']],
['Seu jeito de brilhar é…',['Na calma, no meu tempo','Suga,RM'],['No palco, sem vergonha','Jimin,Jungkook'],['No meu jeito único de ser','V,J-Hope'],['Fazendo os outros felizes','Jin,J-Hope']]];
var mi=0,ms={},mqb=$('#mq');
function mask(){
 if(mi>=MQ.length){var top=Math.max.apply(null,Object.keys(M).map(function(k){return ms[k]||0})),w=Object.keys(M).filter(function(k){return(ms[k]||0)===top}),best=w[Math.random()*w.length|0];
  mqb.innerHTML='<small>Seu match é…</small><h3 style="font-size:2.2rem;color:var(--ac)">'+best+' 💜</h3><p class="tx">'+M[best]+'</p>';mqb.appendChild(btn('Refazer',function(){mi=0;ms={};mask()}));burst(innerWidth/2,innerHeight/2,70);return}
 var q=MQ[mi];mqb.innerHTML='<div class="bar"><i style="width:'+(mi/MQ.length*100)+'%"></i></div><small>'+(mi+1)+' de '+MQ.length+'</small><p class="q">'+q[0]+'</p>';
 var w2=document.createElement('div');w2.className='opts';mqb.appendChild(w2);
 q.slice(1).forEach(function(o){var b=btn(o[0],function(){o[1].split(',').forEach(function(k){ms[k]=(ms[k]||0)+1});mi++;mask()});b.className='opt';w2.appendChild(b)})}
mask();
// ESTÁDIO ROXO
(function(){var c=$('#sea'),g=c.getContext('2d'),L=[],cn=$('#cnt'),n=0,d=0,H=[270,285,300,320];
 function rz(){c.width=c.clientWidth;c.height=c.clientHeight}rz();addEventListener('resize',rz);
 for(var i=0;i<70;i++)L.push({x:Math.random()*c.width,y:c.height*(.5+Math.random()*.5),ph:Math.random()*6,h:H[i%4],s:9,a:.35});
 function add(e){var r=c.getBoundingClientRect();L.push({x:e.clientX-r.left,y:e.clientY-r.top,ph:Math.random()*6,h:H[Math.random()*4|0],s:15,a:1});if(L.length>420)L.splice(70,1);n++;cn.textContent=n+(n===1?' luz acesa':' luzes acesas')+(n>=60?' · um mar roxo! 💜':n>=25?' · já parece um show 💜':'');if(n===60)burst(innerWidth/2,innerHeight/2,90)}
 c.onpointerdown=function(e){d=1;add(e)};c.onpointermove=function(e){if(d&&Math.random()<.5)add(e)};c.onpointerup=c.onpointerleave=c.onpointercancel=function(){d=0};
 (function f(t){g.clearRect(0,0,c.width,c.height);g.globalCompositeOperation='lighter';L.forEach(function(l){var p=l.a*(.6+.4*Math.sin(t/450+l.ph)),r=l.s*2.2,gr=g.createRadialGradient(l.x,l.y,0,l.x,l.y,r);gr.addColorStop(0,'hsla('+l.h+',90%,75%,'+p+')');gr.addColorStop(1,'hsla('+l.h+',90%,55%,0)');g.fillStyle=gr;g.beginPath();g.arc(l.x,l.y,r,0,6.28);g.fill()});requestAnimationFrame(f)})(0)})();
// PHOTOCARD
var pw=$('.pcw'),pcd=$('#pcard');$('#pn').textContent=HER.name;$('#pm').textContent=HER.msg;
pcd.onclick=function(){pcd.classList.toggle('flip')};
pw.onpointermove=function(e){var r=pw.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;pw.style.setProperty('--ry',((x-.5)*18)+'deg');pw.style.setProperty('--rx',((.5-y)*18)+'deg');pw.style.setProperty('--mx',x*100);pw.style.setProperty('--my',y*100)};
pw.onpointerleave=function(){pw.style.setProperty('--rx','0deg');pw.style.setProperty('--ry','0deg')};
// CARTEIRINHA: usa HER.name e HER.msg; vira ao passar o mouse (toque no celular)
(function(){var iw=$('#idw'),id=$('#id'),hv=matchMedia('(hover:hover)').matches;$('#cn').textContent=HER.name;$('#cm').textContent=HER.msg;
var s='',n=21,x,y,lx,ly,k,d;for(y=0;y<n;y++)for(x=0;x<n;x++){k=(x<7&&y<7)?[x,y]:(x>13&&y<7)?[x-14,y]:(x<7&&y>13)?[x,y-14]:null;
 if(k)d=k[0]%6===0||k[1]%6===0||(k[0]>1&&k[0]<5&&k[1]>1&&k[1]<5);else if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12))d=0;else d=((x*7+y*13+x*y*3)%5)<2;
 if(d)s+='M'+x+' '+y+'h1v1h-1z'}
$('#cqr').innerHTML='<svg viewBox="0 0 21 21" shape-rendering="crispEdges"><path fill="#1b0b33" d="'+s+'"/></svg>';
if(hv){iw.onpointerenter=function(){id.classList.add('flip')};iw.addEventListener('pointerleave',function(){id.classList.remove('flip')})}else id.onclick=function(){id.classList.toggle('flip')};
iw.addEventListener('pointermove',function(e){var r=iw.getBoundingClientRect(),a=(e.clientX-r.left)/r.width,b=(e.clientY-r.top)/r.height;iw.style.setProperty('--ry',((a-.5)*10)+'deg');iw.style.setProperty('--rx',((.5-b)*10)+'deg');iw.style.setProperty('--mx',a*100);iw.style.setProperty('--my',b*100)});
iw.addEventListener('pointerleave',function(){iw.style.setProperty('--rx','0deg');iw.style.setProperty('--ry','0deg')})})();
var vs=[].slice.call(document.querySelectorAll('.vf video'));
vs.forEach(function(v){var f=v.parentNode.parentNode,pp=f.querySelector('.pp'),sn=f.querySelector('.sn'),pb=f.querySelector('.vb'),bar=pb.firstChild;
 function ui(){f.classList.toggle('on',!v.paused);sn.textContent=v.muted?'🔇':'🔊'}
 function tg(){if(v.paused)v.play().catch(function(){});else v.pause()}
 pp.onclick=tg;v.onclick=tg;
 v.onplay=function(){ui();vs.forEach(function(o){if(o!==v&&!o.paused)o.pause()});if(!au.paused)au.pause()};
 v.onpause=ui;
 v.onended=ui;v.onvolumechange=ui;
 v.ontimeupdate=function(){bar.style.width=(v.currentTime/(v.duration||1)*100)+'%'};
 pb.onclick=function(e){var r=pb.getBoundingClientRect();v.currentTime=(e.clientX-r.left)/r.width*(v.duration||0)};
 sn.onclick=function(){v.muted=!v.muted};ui()});
$('#lb').onclick=function(){this.style.display='none';var l=$('#letter');l.classList.add('open');var r=l.getBoundingClientRect();burst(innerWidth/2,Math.max(Math.min(r.top+60,innerHeight-100),120),100);if(DED.s){ded=1;cur=-1;au.src=DED.s;au.loop=true;au.play().catch(function(){});mark()}};
})();
