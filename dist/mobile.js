window.onload=function(){function e(){var e=document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop,t=document.body.clientHeight||document.documentElement.clientHeight;e>=f?(m.style.position="fixed",m.style.marginTop=0):(m.style.position="relative",m.style.marginTop="0.2rem");for(var n=0;n<g.length;n++)if(g[n].offsetTop<e+t)for(var r=0;r<g[n].getElementsByTagName("img").length;r++)g[n].getElementsByTagName("img")[r].getAttribute("data-src")&&(g[n].getElementsByTagName("img")[r].src=g[n].getElementsByTagName("img")[r].getAttribute("data-src"),g[n].getElementsByTagName("img")[r].removeAttribute("data-src"))}function t(){u||(3==c?c=1:c+=1,n(),r(-6))}function n(){for(var e=0;e<s.length;e++)"on"==s[e].className&&(s[e].className="");s[c-1].className="on"}function r(e){function t(){e<0&&+i.style.left.replace("rem","")>n||e>0&&+i.style.left.replace("rem","")<n?(i.style.left=+i.style.left.replace("rem","")+o+"rem",setTimeout(t,a)):(u=!1,i.style.left=n+"rem",n>-6&&(i.style.left="-18rem"),n<-18&&(i.style.left="-6rem"))}if(0!==e){u=!0;var n=+i.style.left.replace("rem","")+e,r=200,a=10,o=e/(r/a);t()}}function a(){l=setInterval(function(){t()},5e3)}function o(){clearInterval(l)}var l,i=(document.querySelector("#slider"),document.querySelector("#box")),s=document.getElementById("buttons").querySelectorAll("[data-index]"),c=1,u=!1,m=document.querySelector("#nav"),d=m.querySelector("#more"),f=m.offsetTop;d.addEventListener("click",function(){var e=d.getAttribute("data-status");"up"===e&&(m.style.height="1.5rem",d.setAttribute("data-status","down"),d.innerText="-"),"down"===e&&(m.style.height="0.5rem",d.setAttribute("data-status","up"),d.innerText="+")});var g=document.querySelectorAll("li");window.onscroll=function(){e(),"down"===d.getAttribute("data-status")&&(m.style.height="0.5rem",d.setAttribute("data-status","up"),d.innerText="+")};var y;i.addEventListener("touchstart",function(e){y=e.targetTouches[0].pageX,o()}),i.addEventListener("touchmove",function(e){var a=e.targetTouches[0].pageX-y;if(e.preventDefault(),a>0){if(u)return;1==c?c=3:c-=1,n(),r(6)}else a<0&&t()}),i.addEventListener("touchend",function(){a()});for(var v=0;v<s.length;v++)s[v].onclick=function(){if("on"!=this.className){var e=parseInt(this.getAttribute("data-index")),t=-6*(e-c);c=e,n(),u||r(t)}};a()};