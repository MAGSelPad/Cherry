"use strict";
const now = Math.floor(Date.now() / 1000);
const weekAgo = now - (7 * 24 * 60 * 60);

const LASTFM_API_KEY = "40921e88638bfb3d13f513975edeb991";

const wikiNames = {
    // girl groups
    "BLACKPINK": "Blackpink",
    "TWICE": "Twice",
    "aespa": "Aespa",
    "IVE": "Ive (group)",
    "LE SSERAFIM": "Le Sserafim",
    "(G)I-DLE": "I-dle",
    "ITZY": "Itzy",
    "Red Velvet": "Red Velvet (group)",
    "NMIXX": "Nmixx",
    "BABYMONSTER": "Babymonster",
    "i-dle": "I-dle",

    // boy groups
    "BTS": "BTS",
    "SEVENTEEN": "Seventeen (South Korean band)",
    "Stray Kids": "Stray Kids",
    "TXT": "Tomorrow X Together",
    "ENHYPEN": "Enhypen",
    "EXO": "Exo",
    "ATEEZ": "Ateez",
    "NCT 127": "NCT 127",
    "SHINee": "Shinee",
    "TREASURE": "Treasure (band)",

    // female solo
    "IU": "IU (entertainer)",
    "Jennie": "Jennie (singer)",
    "Taeyeon": "Taeyeon",
    "BIBI": "Bibi (singer)",
    "Chungha": "Chungha",
    "Sunmi": "Sunmi",
    "BoA": "BoA",
    "Yena": "Choi Ye-na",
    "LeeHi": "Lee Hi",
    "HyunA": "Hyuna",

    // male solo
    "Jungkook": "Jungkook",
    "Jimin": "Jimin",
    "RM": "RM (musician)",
    "Agust D": "Suga",
    "G-Dragon": "G-Dragon",
    "Taemin": "Taemin",
    "Kai": "Kai (entertainer, born 1994)",
    "Baekhyun": "Baekhyun",
    "Zico": "Zico (rapper)",
    "Key": "Key (entertainer)"
};

const categories = {
    "girl-groups": [
        "BLACKPINK",
        "TWICE",
        "aespa",
        "IVE",
        "LE SSERAFIM",
        "(G)I-DLE",
        "ITZY",
        "Red Velvet",
        "NMIXX",
        "BABYMONSTER",
        "i-dle"
    ],

    "boy-bands": [
        "BTS",
        "SEVENTEEN",
        "Stray Kids",
        "TXT",
        "ENHYPEN",
        "EXO",
        "ATEEZ",
        "NCT 127",
        "SHINee",
        "TREASURE"
    ],

    "female-solo": [
        "IU",
        "Jennie",
        "Taeyeon",
        "BIBI",
        "Chungha",
        "Sunmi",
        "BoA",
        "Yena",
        "LeeHi",
        "HyunA"
    ],

    "male-solo": [
        "Jungkook",
        "Jimin",
        "RM",
        "Agust D",
        "G-Dragon",
        "Taemin",
        "Kai",
        "Baekhyun",
        "Zico",
        "Key"
    ]
};

let allArtists = [];

async function getArtistInfo(name, category) {

    try {

        const url =
            `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(name)}&api_key=${LASTFM_API_KEY}&format=json`;

        const response = await fetch(url);

        const data = await response.json();

        const artist = data.artist;

        if (!artist) return null;

        const image =
            artist.image?.find(img => img.size === "extralarge")?.["#text"] ||
            artist.image?.at(-1)?.["#text"] ||
            "";
        const wikiSearchName =
            wikiNames[name] || name;

        const wikiImage =
            await getWikipediaImage(
                wikiSearchName
            );
        return {
            name: artist.name,
            category,

            listeners: Number(
                artist.stats?.listeners || 0
            ),

            playcount: Number(
                artist.stats?.playcount || 0
            ),

            image: wikiImage || image,

            url: artist.url,

            bio:
                artist.bio?.summary
                    ?.replace(/<[^>]+>/g, "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 140) + "..."
        };

    } catch (error) {

        console.error(name, error);

        return null;
    }
}

async function loadArtists() {

    const promises = [];

    for (const category in categories) {

        for (const artist of categories[category]) {

            promises.push(
                getArtistInfo(artist, category)
            );
        }
    }

    const result = await Promise.all(promises);

    allArtists = result.filter(Boolean);

    buildCategoryRankings();

    renderTopOverall();
}


function buildCategoryRankings() {

    for (const category in categories) {

        categories[category] = allArtists
            .filter(a => a.category === category)
            .sort((a, b) => {
                const scoreA =
                    a.listeners * 0.7 +
                    a.playcount * 0.3;

                const scoreB =
                    b.listeners * 0.7 +
                    b.playcount * 0.3;

                return scoreB - scoreA;
            })
            .slice(0, 6);
    }
}

function renderTopOverall() {

    const topArtists = [...allArtists]
        .sort((a, b) => {
            const scoreA =
                a.listeners * 0.7 +
                a.playcount * 0.3;

            const scoreB =
                b.listeners * 0.7 +
                b.playcount * 0.3;

            return scoreB - scoreA;
        })
        .slice(0, 6);

    renderArtists(topArtists);
}

function renderCategory(category) {

    renderArtists(categories[category]);
}

function renderArtists(artists) {

    const grid =
        document.getElementById("artists-grid");

    grid.innerHTML = "";

    artists.forEach((artist, index) => {

        grid.innerHTML += createArtistCard(
            artist,
            index + 1
        );
    });
}

function createArtistCard(artist, rank) {

    return `
  
  <div class="portfolio col-12 sm:col-6 lg:col-4">

    <article class="group">

      <div
        class="relative overflow-hidden w-full aspect-[4/3] rounded-xl"
      >

        <img
          src="${artist.image}"
          alt="${artist.name}"
          class="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        >

        <div
          class="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-color text-xs font-semibold"
        >
          #${rank}
        </div>

        <div
          class="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs"
        >
          ${(artist.listeners / 1000000).toFixed(1)}M
        </div>

        <div
          class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition"
        >

          <a
            href="${artist.url}"
            target="_blank"
            class="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg inline-flex items-center justify-center"
          >
            <i class="lni lni-link"></i>
          </a>

        </div>

      </div>

      <div class="pt-4">

        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs mb-3"
        >
          ${formatCategory(artist.category)}
        </div>

        <h4 class="mb-2">

          <a
            href="${artist.url}"
            target="_blank"
            class="text-[1.5rem] leading-tight text-inherit"
          >
            ${artist.name}
          </a>

        </h4>

        <p>
          ${artist.bio}
        </p>

      </div>

    </article>

  </div>
  `;
}

function formatCategory(category) {

    const map = {

        "girl-groups": "Girl Group",
        "boy-bands": "Boy Band",
        "female-solo": "Female Solo",
        "male-solo": "Male Solo"
    };

    return map[category];
}

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".portfolio-menu button"
        );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            if (filter === "todos") {

                renderTopOverall();

                return;
            }

            renderCategory(filter);
        });
    });
}



document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadArtists();

        setupFilters();
    }
);

async function getWikipediaImage(artistName) {
    try {

        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
                artistName
            )}&prop=pageimages&format=json&pithumbsize=600&origin=*`
        );

        const data = await response.json();

        const pages = data.query.pages;

        const page = Object.values(pages)[0];

        return page?.thumbnail?.source || null;

    } catch (error) {

        console.error(
            "Wikipedia image error:",
            artistName,
            error
        );

        return null;
    }
}