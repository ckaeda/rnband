var transposeValue = 0;
var currSong = new ChordSheetJS.Song();
var currKey = ChordSheetJS.Chord.parse('C');
var defaults = {};
var flow = [];
var bpm = 0;
var hideChordsSetting = false;
var numeralsSetting = false;

document.addEventListener("DOMContentLoaded", function () {
    updateSongList('');

    var searchBar = document.getElementById('searchBar');
    searchBar.addEventListener("input", function () {
        updateSongList(searchBar.value);
    });

    var activeArray =
        [
            {
                title: 'Nobody Like You - Planetshakers',
                singer: "Julia"
            },
            {
                title: 'No One - Elevation Worship',
                singer: "Cara"
            },
            {
                title: 'Worthy - Elevation Worship',
                singer: "Cara"
            },
            {
                title: 'Worthy Of It All - CeCe Winans',
                singer: "Cara"
            },
            {
                title: 'Name Above All Names - Charity Gayle',
                singer: "Annaree"
            },
            {
                title: 'Faithfulness - Lakewood Music',
                singer: "Annaree"
            }
        ]
    var TNLArray =
        [
            {
                title: 'In The River - Jesus Culture',
                singer: "Annaree"
            },
            {
                title: 'Been So Good - Elevation Worship',
                singer: "Julia"
            }
        ]
    var eventArray =
        [

        ]
    var activelist = document.getElementById("activeList");
    var TNLlist = document.getElementById("activeListTNL");
    var eventlist = document.getElementById("activeListEvent");
    var activelisthtml = "";
    var TNLlisthtml = "";
    var eventlisthtml = "";

    for (let song of activeArray) {
        let dataLyrics = song.title.replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll('/', '$').toLowerCase();
        activelisthtml += '<li data-lyrics="' + dataLyrics + '" data-singer="' + song.singer + '">' + `${song.title} (${song.singer})` + '</li>';
    }

    for (let song of TNLArray) {
        let TNLdataLyrics = song.title.replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll('/', '$').toLowerCase();
        TNLlisthtml += '<li data-lyrics="' + TNLdataLyrics + '" data-singer="' + song.singer + '">' + `${song.title} (${song.singer})` + '</li>';
    }

    for (let song of eventArray) {
        let eventdataLyrics = song.title.replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll('/', '$').toLowerCase();
        eventlisthtml += '<li data-lyrics="' + eventdataLyrics + '" data-singer="' + song.singer + '">' + `${song.title} (${song.singer})` + '</li>';
    }

    activelist.innerHTML = activelisthtml;
    TNLlist.innerHTML = TNLlisthtml;
    eventlist.innerHTML = eventlisthtml;

    document.querySelectorAll('.active-list li').forEach(function (song) {
        song.addEventListener('click', () => { loadSong(song) });
    });

    updateDates();
});

function updateSongList(input) {
    var rotationList = document.getElementById("rotationList");
    var songlist = document.getElementById("songList");

    var rotationArray = [
        "The Joy - The Belonging Co",
        "Faithfulness - Lakewood Music",
        "This Is The Day - Lakewood Music",
        "You Are Good - Israel & New Breed",
        "In Jesus Name - Israel And New Breed",
        "Jehovah - Elevation Worship",
        "Tribes Live - Victory Worship",
        "Im Gonna Praise - Planetshakers",
        "Goodbye Yesterday - Elevation Rhythm",
        "New Thing Coming - Elevation Worship",
        "Praise You Anywhere - Brandon Lake",
        "I Know That I Know - The Belonging Co",
        "Another Like You - Bethel Music",
        "Gratitude - Brandon Lake",
        "Trust In God - Elevation Worship",
        "All Hail King Jesus - Bethel Music",
        "Who Else - Gateway Worship",
        "I Speak Jesus - Charity Gayle",
        "Name Above All Names - Charity Gayle",
        "Make Room - Community Music",
        "Holy Forever - Chris Tomlin",
        "Forever Yhwh - Elevation Worship",
        "Stand In Awe - Bethel Music",
        "Miracle Worker - Planetshakers",
        "The One You Love - Elevation Worship",
        "Fall Like Rain - Passion",
        "Yeshua - Jesus Image",
        "Yahweh Will Manifest - Oasis Ministry",
        "Firm Foundation - Maverick City Music",
        "All Of A Sudden - Elevation Worship",
        "Center - Bethel Music",
        "What A God - SEU Worship",
        "God Is Not Against Me - Elevation Worship",
        "Show Me Your Face - Bethel Music",
        "Give Me Jesus - Upperroom",
        "Worthy - Elevation Worship",
        "Worthy Of It All - Cece Winans",
        "Araw Araw - Mj Flores",
        "Papuri Kay Yahweh - Hope Filipino Worship",
        "Pangako - New Life Music",
        "Lilim - Victory Worship",
        "Gabay - Andrea Balinas",
        "Banal Na Apoy - Mj Flores",
        "Wala Nang Hahanapin Pa - Malayang Pilipino Music",
        "Salamat Salamat - Malayang Pilipino Music",
        "Wala Kang Katulad - Musikatha",
        "Ikaw Ang Tunay Na Diyos - Grace Filipino Worship",
        "Aking Panginoon - Mj Flores",
        "Sa Piling Nyo - Rommel Guevara"
    ].sort()
    var songArray = [
        "Abba Father - Planetshakers",
        "Adlaw Adlaw - Mj Flores",
        "Agnus Dei - Michael W Smith",
        "Aking Panginoon - Mj Flores",
        "Alive Again - Planetshakers",
        "Alive - Hillsong Young And Free",
        "All Hail King Jesus - Bethel Music",
        "All I Need Is You - Hillsong United",
        "All Of A Sudden - Elevation Worship",
        "Angels - Phil Wickham",
        "Another In The Fire - Hillsong United",
        "Another Like You - Bethel Music",
        "Araw Araw - Mj Flores",
        "At The Cross - Hillsong Worship",
        "Available - Elevation Worship",
        "Banal Na Apoy - Mj Flores",
        "Battle Belongs - Phil Wickham",
        "Beautiful Savior - Planetshakers",
        "Been So Good - Elevation Worship",
        "Build My Life - Housefires",
        "Center - Bethel Music",
        "Champion - Bethel Music",
        "Christ Is Enough - Chris Tomlin",
        "Do It Again - Elevation Worship",
        "Echo - Tauren Wells",
        "Endless Praise - Planetshakers",
        "Even Greater - Planetshakers",
        "Extravagant - Bethel Music",
        "Eyes On You - The Belonging Co",
        "Faithful Then / Faithful Now - Elevation Worship",
        "Faithfulness - Lakewood Music",
        "Fall Like Rain - Passion",
        "Firm Foundation (ver 2) - Maverick City Music",
        "Firm Foundation - Maverick City Music",
        "Forever Yhwh - Elevation Worship",
        "Forever - Hillsong Worship",
        "Gabay - Andrea Balinas",
        "Give Me Jesus - Upperroom",
        "Glorious Day - Passion",
        "God Is Not Against Me - Elevation Worship",
        "God Of Miracles - Chris Mcclarney",
        "Gods Not Dead - Newsboys",
        "Good News - Maverick City Music",
        "Goodbye Yesterday - Elevation Rhythm",
        "Goodness Of God - Bethel Music",
        "Go - Hillsong United",
        "Gratitude - Brandon Lake",
        "Graves Into Gardens - Elevation Worship",
        "Happy Day - Jesus Culture",
        "Heart Of Worship - Matt Redman",
        "Heaven On Earth - Planetshakers",
        "Here Again - Elevation Worship",
        "Here As In Heaven - Elevation Worship",
        "Here I Am To Worship - Hillsong Worship",
        "Hindsight - Hillsong Young And Free",
        "Holding Nothing Back - Jesus Culture",
        "Holy Forever - Chris Tomlin",
        "Holy Spirit - Jesus Culture",
        "Hosanna - Hillsong United",
        "House Of Miracles - Brandon Lake",
        "House Of The Lord - Phil Wickham",
        "How Great Is Our God - Chris Tomlin",
        "How Great Thou Art",
        "I Came For You - Planetshakers",
        "I Give You My Heart - Hillsong Worship",
        "I Know That I Know - The Belonging Co",
        "I Know You Can - Planetshakers",
        "I Lift My Hands - Chris Tomlin",
        "I Need You More - Kim Walker-Smith",
        "I Speak Jesus - Charity Gayle",
        "I Surrender - Hillsong Worship",
        "I Thank God / Glorious Day - Maverick City Music / Passion",
        "I Thank God - Maverick City Music",
        "Ikaw Ang Tunay Na Diyos - Grace Filipino Worship",
        "Im Gonna Praise - Planetshakers",
        "In Jesus Name - Darlene Zschech",
        "In Jesus Name - Israel And New Breed",
        "In The River - Jesus Culture",
        "Jehovah - Elevation Worship",
        "Jesus At The Center - Israel & New Breed",
        "Joy To The World Joyful Joyful - Phil Wickham",
        "Lead Me To The Cross - Hillsong United",
        "Let Go - Hillsong Young And Free",
        "Lilim - Victory Worship",
        "Limitless - Planetshakers",
        "Living Hope - Phil Wickham",
        "Made For Worship - Planetshakers",
        "Mahal Na Mahal Kita Panginoon - Rommel Guevarra",
        "Make Room - Community Music",
        "Miracle Worker - Planetshakers",
        "Missionary Anthem",
        "Momentum - Planetshakers",
        "More Than Able - Elevation Worship",
        "My Heart Is Alive - Planetshakers",
        "My Jesus - Anne Wilson",
        "My Testimony - Elevation Worship",
        "Name Above All Names - Charity Gayle",
        "Name Of Jesus - Citipointe Live",
        "Never Lost - Elevation Worship",
        "New Thing Coming - Elevation Worship",
        "No One - Elevation Worship",
        "Nobody Like You - Planetshakers",
        "Nothing Is Impossible - Planetshakers",
        "O Come To The Altar - Elevation Worship",
        "O Praise The Name - Hillsong Worship",
        "Oceans - Hillsong United",
        "Once And For All - Citipointe Worship",
        "One Way - Hillsong United",
        "Open Heaven River Wild - Hillsong Worship",
        "Our God - Chris Tomlin",
        "P E A C E - Hillsong Young And Free",
        "Pangako - New Life Music",
        "Papuri Kay Yahweh - Hope Filipino Worship",
        "Perfect Love - Planetshakers",
        "Praise You Anywhere - Brandon Lake",
        "Praise - Elevation Worship",
        "Pursue All I Need Is You - Hillsong Worship Hillsong Young And Free",
        "Real Love - Hillsong Young And Free",
        "Reckless Love - Cory Asbury",
        "Rest On Us - Maverick City Music",
        "River - Planetshakers",
        "Sa Piling Nyo - Rommel Guevara",
        "Sabik Sa Presensya Mo - Faithmusic Manila",
        "Salamat Salamat - Malayang Pilipino Music",
        "Salvation Is Here - Hillsong United",
        "See A Victory - Elevation Worship",
        "See The Light - Hillsong Worship",
        "Shekinah Glory - Cory Asbury",
        "Shout - Parachute Band",
        "Show Me Your Face - Bethel Music",
        "Sing It Again - Planetshakers",
        "Sinking Deep - Hillsong Young And Free",
        "Spirit Of The Living God - Vertical Worship",
        "Stand In Awe - Bethel Music",
        "Still - Hillsong Worship",
        "Take It All - Hillsong United",
        "Thank You Jesus For The Blood - Charity Gayle",
        "The Blessing - Elevation Worship",
        "The Joy - The Belonging Co",
        "The One You Love / Till I See You - Elevation Worship / Hillsong United",
        "The One You Love - Elevation Worship",
        "Theres Nothing That Our God Cant Do - Passion",
        "This Is Amazing Grace - Phil Wickham",
        "This Is Living - Hillsong Young And Free",
        "This Is The Day - Lakewood Music",
        "This Love - Planetshakers",
        "To The Ends Of The Earth - Hillsong United",
        "Touch Of Heaven - Hillsong Worship",
        "Tribes Live - Victory Worship",
        "Tribes - Victory Worship",
        "Trust In God - Elevation Worship",
        "Turn It Up - Planetshakers",
        "Unstoppable God - Elevation Worship",
        "Wala Kang Katulad / Tunay Na Diyos - Musikatha / Rommel Guevara",
        "Wala Kang Katulad - Musikatha",
        "Wala Nang Hahanapin Pa - Malayang Pilipino Music",
        "Waymaker - Leeland",
        "We Raise - Planetshakers",
        "We Will Run - Jesus Culture",
        "What A Beautiful Name - Hillsong Worship",
        "What A God - Seu Worship",
        "What I See - Elevation Worship",
        "Who Else - Gateway Worship",
        "Wont Stop Now - Elevation Worship",
        "World Outside Your Window - Hillsong Young And Free",
        "Worthy Of It All - Cece Winans",
        "Worthy - Elevation Worship",
        "Yahweh Will Manifest - Oasis Ministry",
        "Yeshua - Jesus Image",
        "You Are Good - Israel & New Breed",
        "You Are Life - Hillsong Worship",
        "Your Presence Is Heaven - Israel & New Breed",
        "Your Presence - Planetshakers"
    ];

    var rotationlisthtml = "";
    var songlisthtml = "";

    for (let song in rotationArray) {
        if (rotationArray[song].toLowerCase().includes(input.toLowerCase())) {
            let dataLyrics = rotationArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll('/', '$').toLowerCase();
            rotationlisthtml += '<li data-lyrics="' + dataLyrics + '">' + rotationArray[song] + '</li>';
        }
    }

    for (let song in songArray) {
        if (songArray[song].toLowerCase().includes(input.toLowerCase()) && !rotationArray.includes(songArray[song])) {
            let dataLyrics = songArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll('/', '$').toLowerCase();
            songlisthtml += '<li data-lyrics="' + dataLyrics + '">' + songArray[song] + '</li>';
        }
    }

    rotationList.innerHTML = rotationlisthtml;
    songlist.innerHTML = songlisthtml;

    document.querySelectorAll('.song-list li').forEach(function (song) {
        song.addEventListener('click', () => { loadSong(song) });
    });

    if (input != '') {
        const activeLists = document.querySelectorAll('.active-list');

        activeLists.forEach(element => {
            element.setAttribute('hidden', '');
        });
    } else {
        const activeLists = document.querySelectorAll('.active-list');

        activeLists.forEach(element => {
            element.removeAttribute('hidden', '');
        });
    }
}

function loadSong(li) {
    var lyricsFile = li.getAttribute('data-lyrics');
    var singer = li.getAttribute('data-singer');

    // Fetch both the JSON and TXT files concurrently
    Promise.all([
        fetch('songs/' + lyricsFile + '.json').then(response => response.json()),
        fetch('txt/' + lyricsFile + '.txt').then(response => response.text())
    ])
        .then(([song, txtData]) => {
            var title = song.title;
            var artist = song.artist;
            var origKey = song.defaults.Orig;

            const chordSheet = `${txtData}`;

            const parser = new ChordSheetJS.UltimateGuitarParser();
            const unserializedSong = parser.parse(chordSheet).setKey(origKey).changeKey('C');

            currSong = unserializedSong;


            if (song.defaults != null) {
                defaults = song.defaults;
                updateDefaults();
            }

            var bpmCont = document.getElementById("bpm");
            bpmCont.textContent = "BPM: " + song.bpm;

            flow = song.flow;
            updateFlow();

            var lyricsTitle = document.getElementById('title');
            var lyricsArtist = document.getElementById('artist');

            lyricsTitle.textContent = title;
            lyricsArtist.textContent = artist;

            if (singer && song.defaults[singer]) {
                transposeValue = 0;
                document.getElementById("transposeValue").textContent = transposeValue;

                currKey = ChordSheetJS.Chord.parse(song.defaults[singer]);
                displaySong(currSong.transpose(transposeValue));
                document.getElementById('transposeKey').textContent = 'Key: ' + currKey.transpose(transposeValue).toString();
            } else {
                displaySong(currSong.transpose(transposeValue));
            }

            if (hideChordsSetting) {
                hideChords();
            } else {
                showChords();
                if (numeralsSetting) {
                    convertToRomanNumeral();
                }
            }

            // Handle the audio element
            const existingAudio = document.getElementById('audioPlayer');

            // Remove any existing audio element
            if (existingAudio) {
                existingAudio.remove();
            }

            // Add audio element if song.audio exists
            if (song.audio) {
                const audio = document.createElement('audio');
                audio.id = 'audioPlayer';
                audio.controls = true;
                audio.src = `audios/${song.audio}`;

                const artistElement = document.getElementById('artist');
                artistElement.insertAdjacentElement('afterend', audio);
            }

            window.scrollTo(0, 0);
            toggleNav();
        })
        .catch(error => console.error('Error fetching song or txt file:', error));
}

function toggleNumerals() {
    const button = document.getElementById('romanNumeralsButton');
    if (numeralsSetting) {
        displaySong(currSong.transpose(transposeValue));
        button.textContent = 'Numeral';
        numeralsSetting = false;
    } else {
        convertToRomanNumeral();
        button.textContent = 'Chords';
        numeralsSetting = true;
    }
}

function convertToRomanNumeral() {
    [...document.getElementsByClassName('chord')]
        .filter(elem => elem.textContent.trim() !== '')
        .forEach(elem => {
            const numeralString = ChordSheetJS.Chord.parse(elem.textContent)
                .toNumeralString(currKey.transpose(transposeValue).toString())
                .replace(/([ivx]+)m/g, '$1') // Remove 'm' after lowercase Roman numerals except when followed by digits
                .replace('#vi', 'vi') // Replace '#vi' with 'vi'
                .replace('#iii', 'iii') // Replace '#vi' with 'vi'
                .replace('#VI', 'bVII') // Replace '#VI' with 'bVII'
            elem.textContent = numeralString;
        });
}


function toggleNav() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

function displaySong(song) {
    // Get the lyrics container
    var lyricsContainer = document.getElementById('lyricsContainer');

    const formatter = new ChordSheetJS.HtmlTableFormatter();
    var dist = ChordSheetJS.Key.distance('C', currKey.toString());
    if (dist == 10) { dist -= 12; }
    var disp = formatter.format(song.transpose(dist)).replaceAll('ma7', 'maj7');

    const toHeader = [
        'Intro',
        'Pre-Chorus',
        'Pre-Chorus 1',
        'Pre-Chorus 2',
        'Chorus 1',
        'Chorus 2',
        'Chorus 3',
        'Bridge',
        'Bridge 1',
        'Bridge 2',
        'Bridge 3',
        'Bridge 4',
        'Outro',
        'Instrumental',
        'Instrumental 1',
        'Instrumental 2',
        'Post-Chorus',
        'Post-Chorus 2',
        "Refrain",
        'Interlude',
        'Interlude 2',
        'Vamp',
        'Vamp 2',
        'Vamp 3',
        'Tag',
        'Tag 1',
        'Tag 2',
        'Breakdown',
        'Turnaround',
        'Hook',
        'Coda',
        'Ending'
    ];

    for (let str in toHeader) {
        disp = disp.replaceAll('<td class="comment">' + toHeader[str] + '</td>', '<h3 class="label">' + toHeader[str] + '</h3>');
    }

    lyricsContainer.innerHTML = disp;
}

document.getElementById("minusSign").addEventListener("click", function () {
    transposeValue -= 1;
    if (transposeValue == -12) transposeValue = 0;

    document.getElementById("transposeValue").textContent = transposeValue;
    document.getElementById('transposeKey').textContent = 'Key: ' + currKey.transpose(transposeValue).toString();
    if (!numeralsSetting) displaySong(currSong.transpose(transposeValue));
});

document.getElementById("plusSign").addEventListener("click", function () {
    transposeValue += 1;
    if (transposeValue == 12) transposeValue = 0;

    document.getElementById("transposeValue").textContent = transposeValue;
    document.getElementById('transposeKey').textContent = 'Key: ' + currKey.transpose(transposeValue).toString();
    if (!numeralsSetting) displaySong(currSong.transpose(transposeValue));
});

function updateDefaults() {
    var presetContainer = document.getElementById("presetsContainer");

    while (presetContainer.childElementCount > 1) presetContainer.removeChild(presetContainer.lastChild);

    if (Object.keys(defaults).length !== 0) {
        for (obj in Object.keys(defaults)) {
            var div = document.createElement("div");
            div.className = "presets";
            div.textContent = Object.keys(defaults)[obj] + ": " + defaults[Object.keys(defaults)[obj]];

            const key = defaults[Object.keys(defaults)[obj]];

            div.addEventListener('click', function () {
                transposeValue = 0;
                document.getElementById("transposeValue").textContent = transposeValue;

                currKey = ChordSheetJS.Chord.parse(key);
                displaySong(currSong.transpose(transposeValue));
                document.getElementById('transposeKey').textContent = 'Key: ' + currKey.transpose(transposeValue).toString();

                toggleSettings();
            });

            presetContainer.appendChild(div);
        }
    } else {
        var div = document.createElement("div");
        div.className = "presets";
        div.textContent = "N/A";
        presetContainer.appendChild(div);
    }
}

function updateFlow() {
    var flowList = document.getElementById("flowList");
    var flowlisthtml = "";

    for (var f in flow) {
        flowlisthtml += "<li>" + flow[f] + "</li>";
    }

    flowList.innerHTML = flowlisthtml;
}

function updateDates() {
    var activeList = document.getElementById("activeList");
    var activeListTNL = document.getElementById("activeListTNL");
    var today = new Date();
    var dayOfWeek = today.getDay();

    var daysUntilNextSunday = (7 - dayOfWeek) % 7;
    var nextSunday = new Date(today.getTime() + (daysUntilNextSunday * 24 * 60 * 60 * 1000));

    var daysUntilNextThursday = (11 - dayOfWeek) % 7;
    var nextThursday = new Date(today.getTime() + (daysUntilNextThursday * 24 * 60 * 60 * 1000));

    var formattedSun = nextSunday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    var formattedTh = nextThursday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });

    activeList.title += " — " + formattedSun;
    activeListTNL.title += " — " + formattedTh;
}

// Function to hide chords
function hideChords() {
    const chords = document.querySelectorAll('.chord');
    chords.forEach(function (chord) {
        chord.style.display = 'none';
    });
    document.getElementById('hideChordsButton').textContent = 'Show Chords';
    hideChordsSetting = true;

    document.getElementById('romanNumeralsButton').style.display = 'none';
    document.getElementById('transposeContainer').style.display = 'none';
    document.getElementById('presetsContainer').style.display = 'none';
    document.getElementById('bpm').style.display = 'none';
}

// Function to show chords
function showChords() {
    const chords = document.querySelectorAll('.chord');
    chords.forEach(function (chord) {
        chord.style.display = 'table-cell';
    });
    document.getElementById('hideChordsButton').textContent = 'Hide Chords';
    hideChordsSetting = false;

    document.getElementById('romanNumeralsButton').style.display = 'flex';
    document.getElementById('transposeContainer').style.display = 'flex';
    document.getElementById('presetsContainer').style.display = 'block';
    document.getElementById('bpm').style.display = 'flex';
}

function toggleSettings() {
    var settingsContainer = document.getElementById('settingsContainer');
    var settingsIcon = document.querySelector('.settings-icon');

    if (settingsContainer.style.display === 'none' || settingsContainer.style.display === '') {
        settingsContainer.style.display = 'block';
        settingsContainer.classList.remove('fade-out-up');
        settingsContainer.classList.add('fade-in-down');
    } else {
        settingsContainer.classList.remove('fade-in-down');
        settingsContainer.classList.add('fade-out-up');

        // Delay hiding the element until the animation finishes
        setTimeout(function () {
            settingsContainer.style.display = 'none';
        }, 500); // Match this with the animation duration
    }

    // Trigger the rotation animation
    settingsIcon.classList.add('rotate');

    // Remove the class after the animation to reset it
    setTimeout(function () {
        settingsIcon.classList.remove('rotate');
    }, 500); // Match this with the animation duration
}

document.getElementById('hideChordsButton').addEventListener('click', function () {
    if (hideChordsSetting) {
        showChords();
    } else {
        hideChords();
    }
});

document.getElementById('lyricsContainer').addEventListener('contextmenu', (event) => {
    event.preventDefault();

    var content = "";
    [...document.getElementsByClassName('paragraph')]
        .filter(paragraph => paragraph.innerHTML != '')
        .filter(paragraph => paragraph.getElementsByClassName('label').length != 0)
        .filter(paragraph => ['Intro', 'Verse', 'Chorus', 'Bridge', 'Turnaround', 'Outro', 'Hook', 'Ending', 'Coda'].some(keyword => paragraph.getElementsByClassName('label')[0].textContent.includes(keyword)))
        .filter(paragraph => paragraph.getElementsByClassName('row').length >= 2)
        .forEach(function (paragraph) {
            [...paragraph.getElementsByClassName('row')]
                .forEach(function (row) {
                    const lyrics = [...row.getElementsByClassName('lyrics')];

                    const allEmpty = lyrics.every(lyric => lyric.textContent.trim() === "");

                    if (allEmpty) return;

                    lyrics.forEach(function (lyric) {
                        content += lyric.textContent;
                    });
                    content += '\n';
                });
            content += '\n';
        });
    console.log(content);


    navigator.clipboard.writeText(content)
        .catch(err => {
            alert('Failed to copy lyrics: ', err);
        });
});
