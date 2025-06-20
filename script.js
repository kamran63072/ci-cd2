gsap.registerPlugin();
// Step 1: Select all nav links
const allLinks = document.querySelectorAll("nav ul li a");

// Step 2: Wrap each letter in <span class="char"> only once
allLinks.forEach(el => {
    if (!el.querySelector(".char")) {
        const letters = el.textContent.trim().split("");
        el.innerHTML = letters.map(letter => `<span class="char">${letter}</span>`).join("");
    }
});

// Step 3: Create animations on hover
allLinks.forEach(el => {
    el.addEventListener("mouseenter", () => {
        const otherLinks = Array.from(allLinks).filter((link) => { return link !== el});

        otherLinks.forEach(link => {
            const chars = link.querySelectorAll(".char");

            // Kill previous animations to avoid overlap
            gsap.killTweensOf(chars);

            // Animate other links' letters
            gsap.to(chars, {
                opacity: 0.4,
                y: -5,
                color: "#999",
                duration: 0.4,
                ease: "power2.out",
                stagger: {
                    each: 0.05,
                    from: "end",
                }
            });
        });
    });

    el.addEventListener("mouseleave", () => {
        const otherLinks = Array.from(allLinks).filter(link => link !== el);

        otherLinks.forEach(link => {
            const chars = link.querySelectorAll(".char");

            gsap.killTweensOf(chars);

            gsap.to(chars, {
                opacity: 1,
                y: 0,
                color: "#000",
                duration: 0.4,
                ease: "power2.out",
                stagger: {
                    each: 0.05,
                    from: "start"
                }
            });
        });
    });
});

// nav toggle
let menu = document.querySelector(".ri-menu-line");
let menuClose = document.querySelector(".ri-close-large-line");

menu.addEventListener("click", () => {
    gsap.to(".nav-list", {
        x: 0,
        onComplete: () => {
            gsap.to(menuClose, {
                y: "0%",
            });




            gsap.to(allLinks, {
                y: 40,
                opacity: 1,
                duration: 0.5,
                stagger: 0.2,
                ease:"power2.out",
                scrollTrigger:{
                    trigger:"nav ul",
                
                    from:"start",
                }
            });

            gsap.to(".card", {
                y: 0,
                opacity: 1,
                delay: 0.5,
                duration: 0.5,
            })

            gsap.to("nav ul .text", {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay:0.5,
            })
        }
    });
});

window.addEventListener("load",()=>{
    document.querySelector(".nav-list").classList.remove("invisible");
})
menuClose.addEventListener("click", () => {
    gsap.to(menuClose, {
        y: "-100%",
        opacity: 0.6,
        onComplete: () => {
            gsap.to(".nav-list", {
                x: "-100%",
            });
            gsap.to(".card", {
                y: "20%",
                opacity: 0,
            })

            gsap.to("nav ul .text", {
                y: "20%",
                opacity: 0,
            })
        }
    });
});

// ANIMATE TRIGGER
let animateTrigger = document.querySelectorAll(".animate-trigger");

animateTrigger.forEach((el, index)=>{

    gsap.from(el,{
        y:100,
        opacity:0,
        stagger:0.4,
        delay: index * 0.4,
    
    })
})