/* =========================================
   AYesha PREMIUM SURPRISE
========================================= */


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;


function startMusic() {

    if (!music) return;

    music.volume = 0.18;

    music.play()
        .then(function () {

            musicPlaying = true;

            musicButton.textContent = "♫";

        })
        .catch(function () {

            console.log(
                "Music requires user interaction."
            );

        });
}


function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        music.play();

        music.volume = 0.18;

        musicPlaying = true;

        musicButton.textContent = "♫";

    } else {

        music.pause();

        musicPlaying = false;

        musicButton.textContent = "🔇";
    }
}


/* =========================================
   SCREEN NAVIGATION
========================================= */

function goTo(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    const target =
        document.getElementById(screenId);


    if (target) {

        setTimeout(function () {

            target.classList.add("active");

        }, 80);

        createParticles(15);
    }
}


/* =========================================
   START
========================================= */

function startExperience() {

    startMusic();

    createParticles(35);

    goTo("nameScreen");
}


/* =========================================
   PARTICLES
========================================= */

function createParticles(amount) {

    const symbols = [
        "✦",
        "✧",
        "⋆",
        "♡",
        "✦"
    ];


    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");


        particle.className =
            "particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "vw";


        particle.style.fontSize =
            (10 + Math.random() * 18) + "px";


        particle.style.animationDuration =
            (3 + Math.random() * 4) + "s";


        particle.style.animationDelay =
            Math.random() * 1.2 + "s";


        document
            .getElementById("particles")
            .appendChild(particle);


        setTimeout(function () {

            particle.remove();

        }, 8000);
    }
}


/* =========================================
   MYSTERY BOX
========================================= */

function openMysteryBox() {

    const box =
        document.querySelector(".mystery-box");

    const hint =
        document.getElementById("boxHint");


    if (box.classList.contains("opened")) {
        return;
    }


    box.classList.add("opened");

    hint.style.opacity = "0";


    createParticles(55);


    setTimeout(function () {

        goTo("balloonScreen");

        createBalloons();

    }, 1400);
}


/* =========================================
   BALLOONS
========================================= */

let poppedBalloons = 0;


function createBalloons() {

    const area =
        document.getElementById("balloonArea");


    area.innerHTML = "";

    poppedBalloons = 0;


    document
        .getElementById("balloonCount")
        .textContent = "0";


    const positions = [

        [12, 10],
        [40, 3],
        [68, 14],
        [24, 48],
        [55, 44],
        [76, 52]

    ];


    const balloonColors = [

        "linear-gradient(135deg,#b96795,#642c62)",
        "linear-gradient(135deg,#d4a95f,#7e5727)",
        "linear-gradient(135deg,#8064a8,#3f285e)",
        "linear-gradient(135deg,#a74d70,#51213f)",
        "linear-gradient(135deg,#d6ae62,#805a2c)",
        "linear-gradient(135deg,#76518e,#382442)"

    ];


    for (let i = 0; i < 6; i++) {

        const balloon =
            document.createElement("div");


        balloon.className =
            "balloon";


        balloon.style.left =
            positions[i][0] + "%";


        balloon.style.top =
            positions[i][1] + "%";


        balloon.style.background =
            balloonColors[i];


        balloon.style.animationDelay =
            (i * .18) + "s";


        balloon.addEventListener(
            "click",
            function () {

                popBalloon(balloon);

            }
        );


        area.appendChild(balloon);
    }
}


function popBalloon(balloon) {

    if (
        balloon.classList.contains("popped")
    ) {
        return;
    }


    balloon.classList.add("popped");


    poppedBalloons++;


    document
        .getElementById("balloonCount")
        .textContent =
        poppedBalloons;


    createParticles(12);


    if (poppedBalloons === 6) {

        setTimeout(function () {

            document
                .getElementById("balloonContinue")
                .classList.remove("hidden");

            createParticles(30);

        }, 600);
    }
}


/* =========================================
   STAR COLLECTION
========================================= */

let collectedStars = 0;


function createStars() {

    const field =
        document.getElementById("starField");


    field.innerHTML = "";

    collectedStars = 0;


    document
        .getElementById("starCount")
        .textContent = "0";


    document
        .getElementById("starContinue")
        .classList.add("hidden");


    const positions = [

        [12, 20],
        [72, 10],
        [45, 43],
        [20, 68],
        [78, 65]

    ];


    positions.forEach(
        function (position, index) {

            const star =
                document.createElement("div");


            star.className =
                "collect-star";


            star.textContent =
                "✦";


            star.style.left =
                position[0] + "%";


            star.style.top =
                position[1] + "%";


            star.style.animationDelay =
                index * .2 + "s";


            star.addEventListener(
                "click",
                function () {

                    collectStar(star);

                }
            );


            field.appendChild(star);
        }
    );
}


function collectStar(star) {

    if (
        star.classList.contains("collected")
    ) {
        return;
    }


    star.classList.add("collected");


    collectedStars++;


    document
        .getElementById("starCount")
        .textContent =
        collectedStars;


    createParticles(8);


    if (collectedStars === 5) {

        setTimeout(function () {

            document
                .getElementById("starContinue")
                .classList.remove("hidden");

            createParticles(35);

        }, 500);
    }
}


/* =========================================
   SECRET
========================================= */

function openSecret() {

    createParticles(50);

    goTo("secretScreen");
}


/* =========================================
   MEMORIES
========================================= */

const memories = [

    {
        image:
            "IMG-20260814-WA0005.jpg",

        caption:
            "A moment worth remembering ✦"
    },

    {
        image:
            "IMG-20260814-WA0003.jpg",

        caption:
            "Some memories quietly stay with us ♡"
    },

    {
        image:
            "IMG-20260814-WA0004.jpg",

        caption:
            "One more beautiful moment ✨"
    }

];


let currentMemory = 1;


function nextMemory() {

    const image =
        document.getElementById("memoryImage");


    const caption =
        document.getElementById("memoryCaption");


    const number =
        document.getElementById("memoryNumber");


    const button =
        document.getElementById("memoryButton");


    if (currentMemory >= 3) {

        goTo("wishScreen");

        return;
    }


    image.classList.add("changing");


    setTimeout(function () {

        currentMemory++;


        image.src =
            memories[
                currentMemory - 1
            ].image;


        caption.textContent =
            memories[
                currentMemory - 1
            ].caption;


        number.textContent =
            "0" +
            currentMemory +
            " / 03";


        image.classList.remove(
            "changing"
        );


        createParticles(12);

    }, 450);


    if (currentMemory === 2) {

        button.innerHTML =
            'Next memory <span>→</span>';
    }


    if (currentMemory === 2) {

        setTimeout(function () {

            button.innerHTML =
                'Final memory <span>✦</span>';

        }, 500);
    }
}


/* =========================================
   FINAL
========================================= */

function showFinal() {

    createParticles(90);

    goTo("finalScreen");
}


/* =========================================
   LOAD
========================================= */

window.addEventListener(
    "load",
    function () {

        createParticles(25);

        /*
           Prepare stars when collection screen
           is opened.
        */

        const observer =
            new MutationObserver(
                function () {

                    const screen =
                        document.getElementById(
                            "collectScreen"
                        );


                    if (
                        screen.classList.contains(
                            "active"
                        ) &&
                        !screen.dataset.loaded
                    ) {

                        screen.dataset.loaded =
                            "true";

                        createStars();
                    }
                }
            );


        observer.observe(
            document.body,
            {
                attributes: true,
                subtree: true,
                attributeFilter: [
                    "class"
                ]
            }
        );

    }
);
