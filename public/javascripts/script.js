gsap.from(".hero-subtitle",{

    y:40,

    opacity:0,

    duration:1

});

gsap.from(".hero-content h1",{

    y:70,

    opacity:0,

    duration:1.2,

    delay:.3

});

gsap.from(".hero-content h3",{

    y:60,

    opacity:0,

    duration:1,

    delay:.6

});

gsap.from(".hero-text",{

    y:40,

    opacity:0,

    duration:1,

    delay:.9

});

gsap.from(".hero-buttons",{

    y:40,

    opacity:0,

    duration:1,

    delay:1.2

});
gsap.utils.toArray(".portal-card").forEach(card=>{

    gsap.from(card,{

        scrollTrigger:card,

        y:80,

        opacity:0,

        duration:0.8

    });

});

gsap.from(".about-image",{

    scrollTrigger:"#about",

    x:-120,

    opacity:0,

    duration:1

});

gsap.from(".about-content",{

    scrollTrigger:"#about",

    x:120,

    opacity:0,

    duration:1

});
const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const current=+counter.innerText;

const increment=target/120;

if(current<target){

counter.innerText=Math.ceil(current+increment);

setTimeout(update,15);

}

else{

counter.innerText=target+"+";

}

}

ScrollTrigger.create({

trigger:"#stats",

start:"top 80%",

once:true,

onEnter:update

});

});
gsap.utils.toArray(".facility-card").forEach(card => {

    gsap.from(card, {

        y: 80,

        opacity: 0,

        duration: 0.8,

        scrollTrigger: {

            trigger: card,

            start: "top 85%"

        }

    });

});

// gsap.from(".gallery-grid img", {
//     scale: 0.8,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.15,
//     scrollTrigger: {
//         trigger: "#gallery-preview",
//         start: "top 80%",
//         toggleActions: "play none none none",
//         markers: true
//     }
// });
gsap.from(".video-grid video", {

    y: 100,

    opacity: 0,

    duration: 1,

    stagger: 0.2,

    scrollTrigger: {

        trigger: "#campus-video",

        start: "top 80%"

    }

});

// gsap.from("#admission-banner", {

//     y: 100,

//     opacity: 0,

//     duration: 1,

//     scrollTrigger: {

//         trigger: "#admission-banner",

//         start: "top 85%"

//     }

// });

// function loader(){
//     var tl=gsap.timeline()
//     var grow=0
//     setInterval(function(){
//         if(grow<100){
//             h5timer.innerHTML=grow++
//         }
//         else{
//             h5timer.innerHTML=grow
//         }
//     })
//     tl.from(".title-elem",{
//         y:"100%",
//         scale:0.1,
//         duration:0.4,
//         stagger:0.2
//     })
//     tl.from("#title-2 h4",{
//         opacity:0,
//         y:"100%",
//         duration:0.4,
//     })
//     tl.from(".nl img",{
//         y:"300%",
//         opacity:0,
//         duration:1
//     })
//     tl.from(".line h1",{
//         y:"300%",
//         duration:1,
//         stagger:"0.5",
//     })
//     tl.from(".nr-r",{
//         y:"300%",
//         duration:1,
//         opacity:0,
//     })
//     tl.from(".nr-l a",{
//         x:"300%",
//         duration:1,
//         opacity:0,
//         stagger:"-0.5"
//     })
//     tl.from("nav",{
//         backgroundColor:"transparent",
//         duration:0.5
//     })
//     tl.from(".pg1-text h2",{
//         y:"300%",
//         duration:0.5,
//         opacity:0,
//         stagger:"0.5"
//     })
// }   
// function page1(){
//     gsap.to(".title-elem", {
//     z: -100,
//     rotate: 60,
//     opacity: 0,
//     duration: 2,
//     stagger: 0.5,
//     scale:"1.5",
//     scrollTrigger: {
//         trigger: "#title",
//         scroller: "body", // only needed if using a custom scroller (e.g., with Locomotive Scroll)
//         scrub: 2,
//         pin: true,
//     }
//     });
// }
// page1()
// function page2(){
//     gsap.from("#labs", {
//         x: -100,
//         y: 100,
//         opacity: 0,
//         duration: 2,
//         delay:0.5,
//         scrollTrigger: {
//             trigger: "#labs",
//             start: "top 80%",  // example: start when #labs top hits 80% of viewport height
//             toggleActions: "play none none none" // plays once on entering viewport
//         }
//     });
//     gsap.from("#rabs", {
//         x: 100,
//         y: 100,
//         opacity: 0,
//         duration: 2,
//         delay:1,
//         scrollTrigger: {
//             trigger: "#rabs",
//             start: "top 80%",  // example: start when #labs top hits 80% of viewport height
//             toggleActions: "play none none none" // plays once on entering viewport
//         }
//     });

// }
// page2()
function nav(){
    var nav=document.querySelector(".nr-r i")
    var log=document.querySelector("#log_button")
    var nav2=0
    var login=0
    
    // Restore navigation state
    nav2 = localStorage.getItem('navOpen') === 'true' ? 1 : 0;
    login = localStorage.getItem('loginOpen') === 'true' ? 1 : 0;
    
    if (nav2) {
        gsap.set(".nr-l", { transform: "translateX(0)" });
    }
    if (login) {
        gsap.set("#login_items", { display: "flex" });
    }
    
    nav.addEventListener("click",function(){
        if(nav2==0){
            gsap.to(".nr-l",{
                transform:"translateX(0)",
                duration:0.5,
                stagger:-0.5
            })
            nav2=1
        }
        else{
            gsap.to(".nr-l",{
                transform:"translateX(200%)",
                duration:0.5,
                stagger:0.5
            })
            nav2=0
        }
        // Save navigation state
        localStorage.setItem('navOpen', nav2.toString());
    })
    if(log)
    {
        log.addEventListener("click",function(){
        if(login==0){
            gsap.to("#login_items",{
                display:"flex",
                duration:0.5,
                stagger:-0.5
            })
            login=1
        }
        else{
            gsap.to("#login_items",{
                display:"none",
                duration:0.5,
                stagger:0.5
            })
            login=0
        }
        // Save login state
        localStorage.setItem('loginOpen', login.toString());
        
        gsap.to("#login_items",{
            display:"none",
            duration:0.5,
            delay:2,
            stagger:0.5})
    })
    }
}
nav()
function panel2(){
    var nav=document.querySelector("#panel-logo i")
    var nav2=0
    
    // Restore panel state
    nav2 = localStorage.getItem('panelOpen') === 'true' ? 1 : 0;
    
    if (nav2) {
        gsap.set("#panel", { 
            transform: "translateX(0)",
            display: "flex"
        });
        gsap.set('#panel-container', { backgroundColor: "#d2b48c96" });
    }
    
    nav.addEventListener("click",function(){
        if(nav2==0){
            gsap.to("#panel",{
                transform:"translateX(0)",
                display:"flex",
                duration:0.5,
                stagger:-0.5
            })
            gsap.to('#panel-container',{
                backgroundColor:"#d2b48c96"
            })
            nav2=1
        }
        else{
            gsap.to("#panel",{
                transform:"translateX(200%)",
                display:"none",
                duration:0.5,
                stagger:0.5
            })
            gsap.to('#panel-container',{
                backgroundColor:"transparent"
            })
            nav2=0
        }
        // Save panel state
        localStorage.setItem('panelOpen', nav2.toString());
    })
}
panel2()

