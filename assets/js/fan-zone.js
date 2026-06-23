"use strict";

const fandoms = [
    "Blink",
    "Once",
    "Neverland",
    "MY",
    "Fearnot",
    "Dive",
    "Stay",
    "Bunny",
    "MOA",
    "Carat"
];

const avatars = [
    "./assets/img/avatar/avatar-4.jpg",
    "./assets/img/avatar/avatar-5.jpg",
    "./assets/img/avatar/avatar-6.jpg",
    "./assets/img/avatar/avatar-7.jpg"
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateUsername() {

    const prefixes = [
        "Cherry",
        "Kpop",
        "Bias",
        "Stan",
        "Neon",
        "Pink",
        "Moon",
        "Star"
    ];

    return (
        randomItem(prefixes) +
        Math.floor(Math.random() * 9999)
    );
}

function createFanCard(message) {

    const avatar = randomItem(avatars);

    const fandom = randomItem(fandoms);

    const username = generateUsername();

    return `
        <div class="swiper-slide">

            <div
                class="rounded-xl bg-body-light-1 dark:bg-body-dark-12/10 px-5 py-8 shadow-card-2 sm:px-8"
            >

                <p
                    class="mb-6 text-base text-body-light-11 dark:text-body-dark-11 line-clamp-6 break-words"
                >
                    ${message}
                </p>

                <figure class="flex items-center gap-4">

                    <div class="h-[50px] w-[50px] overflow-hidden">

                        <img
                            src="${avatar}"
                            alt="${username}"
                            class="h-full w-full rounded-full object-cover"
                        />

                    </div>

                    <figcaption class="flex-grow">

                        <h3
                            class="text-sm font-semibold text-body-light-11 dark:text-body-dark-11"
                        >
                            ${username}
                        </h3>

                        <p
                            class="text-xs text-body-light-10 dark:text-body-dark-10"
                        >
                            ${fandom}
                        </p>

                    </figcaption>

                </figure>

            </div>

        </div>
    `;
}

function initializeFanZone() {

    const input =
        document.getElementById("fanInput");

    const button =
        document.getElementById("addFanMessage");

    const container =
        document.getElementById("fanMessages");

    if (!input || !button || !container)
        return;

    button.addEventListener("click", addComment);

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            addComment();
        }

    });

    function addComment() {

        const message =
            input.value.trim();

        if (!message)
            return;

        container.insertAdjacentHTML(
            "afterbegin",
            createFanCard(message)
        );

        input.value = "";

        /*
         * Actualizar Swiper
         */

        const swiper =
            document.querySelector(
                ".testimonial-carousel"
            )?.swiper;

        if (swiper) {

            swiper.update();

            swiper.slideTo(0);

        }
    }
}

document.addEventListener(
    "DOMContentLoaded",
    initializeFanZone
);