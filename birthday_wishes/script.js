/* =====================================================
   PAGE NAVIGATION
===================================================== */

const pages = [
    "loginPage",
    "photosPage",
    "wishesPage"
];


function showPage(pageId) {

    pages.forEach(function(id) {

        document
            .getElementById(id)
            .classList
            .add("hidden");

    });


    document
        .getElementById(pageId)
        .classList
        .remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



/* =====================================================
   LOGIN
===================================================== */

const correctUsername = "Poojitha";

const correctPassword = "10/10/2007";


document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const error =
            document
                .getElementById("loginError");


        if (
            username.toLowerCase()
            === correctUsername.toLowerCase()
            &&
            password === correctPassword
        ) {

            error.textContent = "";


            /* Start music */

            music
                .play()
                .then(function() {

                    musicPlaying = true;

                    musicBtn.textContent =
                        "🔊 Music";

                })
                .catch(function() {

                    musicBtn.textContent =
                        "🎵 Play Music";

                });


            /* Open photo page */

            showPage("photosPage");


            /* Small celebration */

            createConfetti(80);

        }

        else {

            error.textContent =
                "Oops! Wrong details 💗 Try again.";

        }

    });



/* =====================================================
   BACKGROUND MUSIC
===================================================== */

const music =
    document.getElementById(
        "birthdayMusic"
    );


const musicBtn =
    document.getElementById(
        "musicBtn"
    );


let musicPlaying = false;


musicBtn.addEventListener(
    "click",
    function() {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicBtn.textContent =
                "🎵 Music";

        }

        else {

            music
                .play()
                .then(function() {

                    musicPlaying = true;

                    musicBtn.textContent =
                        "🔊 Music";

                });

        }

    }
);



/* =====================================================
   CONFETTI
===================================================== */

const confettiCanvas =
    document.getElementById(
        "confetti"
    );


const confettiCtx =
    confettiCanvas.getContext("2d");


let confettiPieces = [];


function resizeConfetti() {

    confettiCanvas.width =
        window.innerWidth;

    confettiCanvas.height =
        window.innerHeight;

}


resizeConfetti();


window.addEventListener(
    "resize",
    resizeConfetti
);



function createConfetti(count = 120) {

    for (
        let i = 0;
        i < count;
        i++
    ) {

        confettiPieces.push({

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight * .35,

            vx:
                (Math.random() - .5) * 15,

            vy:
                (Math.random() - .9) * 15,

            size:
                4 + Math.random() * 7,

            life:
                70 + Math.random() * 90,

            color:
                `hsl(
                    ${320 + Math.random() * 50},
                    85%,
                    ${55 + Math.random() * 20}%
                )`

        });

    }

}


function animateConfetti() {

    confettiCtx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );


    confettiPieces =
        confettiPieces.filter(
            function(piece) {

                return piece.life > 0;

            }
        );


    confettiPieces.forEach(
        function(piece) {

            piece.x += piece.vx;

            piece.y += piece.vy;

            piece.vy += .13;

            piece.life--;


            confettiCtx.fillStyle =
                piece.color;


            confettiCtx.fillRect(
                piece.x,
                piece.y,
                piece.size,
                piece.size
            );

        }
    );


    requestAnimationFrame(
        animateConfetti
    );

}


animateConfetti();



/* =====================================================
   FIREWORKS
===================================================== */

const fireworksCanvas =
    document.getElementById(
        "fireworksCanvas"
    );


const fireworksCtx =
    fireworksCanvas.getContext("2d");


let fireworks = [];

let fireworkParticles = [];


function resizeFireworks() {

    fireworksCanvas.width =
        window.innerWidth;

    fireworksCanvas.height =
        window.innerHeight;

}


resizeFireworks();


window.addEventListener(
    "resize",
    resizeFireworks
);



/* Firework rocket */

class Firework {

    constructor() {

        this.x =
            Math.random()
            * fireworksCanvas.width;


        this.y =
            fireworksCanvas.height;


        this.targetY =
            Math.random()
            * fireworksCanvas.height
            * 0.45
            + 80;


        this.speed =
            5 + Math.random() * 3;


        this.color =
            `hsl(
                ${Math.random() * 360},
                100%,
                60%
            )`;

    }


    update() {

        this.y -= this.speed;


        if (
            this.y <= this.targetY
        ) {

            this.explode();

            return false;

        }


        return true;

    }


    draw() {

        fireworksCtx.beginPath();

        fireworksCtx.arc(
            this.x,
            this.y,
            3,
            0,
            Math.PI * 2
        );


        fireworksCtx.fillStyle =
            this.color;


        fireworksCtx.fill();

    }


    explode() {

        for (
            let i = 0;
            i < 70;
            i++
        ) {

            fireworkParticles.push(
                new FireworkParticle(
                    this.x,
                    this.y,
                    this.color
                )
            );

        }

    }

}



/* Firework particles */

class FireworkParticle {

    constructor(
        x,
        y,
        color
    ) {

        this.x = x;

        this.y = y;

        this.color = color;


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const speed =
            Math.random() * 5 + 2;


        this.vx =
            Math.cos(angle)
            * speed;


        this.vy =
            Math.sin(angle)
            * speed;


        this.alpha = 1;

        this.gravity = .05;

    }


    update() {

        this.x += this.vx;

        this.y += this.vy;


        this.vy +=
            this.gravity;


        this.alpha -= .015;


        return this.alpha > 0;

    }


    draw() {

        fireworksCtx.globalAlpha =
            this.alpha;


        fireworksCtx.beginPath();


        fireworksCtx.arc(
            this.x,
            this.y,
            2,
            0,
            Math.PI * 2
        );


        fireworksCtx.fillStyle =
            this.color;


        fireworksCtx.fill();


        fireworksCtx.globalAlpha = 1;

    }

}



/* Fireworks animation */

function animateFireworks() {

    fireworksCtx.clearRect(
        0,
        0,
        fireworksCanvas.width,
        fireworksCanvas.height
    );


    fireworks =
        fireworks.filter(
            function(firework) {

                firework.draw();

                return firework.update();

            }
        );


    fireworkParticles =
        fireworkParticles.filter(
            function(particle) {

                particle.draw();

                return particle.update();

            }
        );


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();



/* Start multiple fireworks */

function startFireworks() {

    let count = 0;


    const interval =
        setInterval(
            function() {

                fireworks.push(
                    new Firework()
                );


                count++;


                if (count >= 15) {

                    clearInterval(
                        interval
                    );

                }

            },
            300
        );

}



/* =====================================================
   FINAL CELEBRATION
===================================================== */

function celebrateEverything() {

    /* Confetti */

    createConfetti(250);


    /* Fireworks */

    startFireworks();


    /* Make sure music is playing */

    if (!musicPlaying) {

        music
            .play()
            .then(function() {

                musicPlaying = true;

                musicBtn.textContent =
                    "🔊 Music";

            })
            .catch(function() {});

    }

}