var transposeValue = 0;
var currSong = new ChordSheetJS.Song();
var currKey = ChordSheetJS.Chord.parse('C');
var defaults = {};
var flow = [];
var bpm = null;
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
            'Faithful Then / Faithful Now - Elevation Worship',
            'Alive - Hillsong Young and Free',
            'Been So Good - Elevation Worship',
            'Goodness of God - Bethel Music'
        ]
    var TNLArray =
        [
            'Glorious Day - Passion',
            'Goodness of God - Bethel Music'
        ]
    var FCArray =
        [
            
        ]
    var activelist = document.getElementById("activeList");
    var TNLlist = document.getElementById("activeListTNL");
    var FClist = document.getElementById("activeListFC");
    var activelisthtml = "";
    var TNLlisthtml = "";
    var FClisthtml = "";

    for (let song in activeArray) {
        let dataLyrics = activeArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' /', '').toLowerCase();
        activelisthtml += '<li data-lyrics="' + dataLyrics + '">' + activeArray[song] + '</li>';
    }

    for (let song in TNLArray) {
        let TNLdataLyrics = TNLArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' /', '').toLowerCase();
        TNLlisthtml += '<li data-lyrics="' + TNLdataLyrics + '">' + TNLArray[song] + '</li>';
    }

    for (let song in FCArray) {
        let FCdataLyrics = FCArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' /', '').toLowerCase();
        FClisthtml += '<li data-lyrics="' + FCdataLyrics + '">' + FCArray[song] + '</li>';
    }

    activelist.innerHTML = activelisthtml;
    TNLlist.innerHTML = TNLlisthtml;
    FClist.innerHTML = FClisthtml;

    document.querySelectorAll('.active-list li').forEach(function (song) {
        song.addEventListener('click', () => { loadSong(song) });
    });

    updateDates();
});

function updateSongList(input) {
    var songlist = document.getElementById("songList");
    var songArray =
        [
            'No One - Elevation Worship',
            'Banal Na Apoy - MJ Flores',
            'Heaven On Earth - Planetshakers',
            'Rest On Us - Maverick City Music',
            'Perfect Love - Planetshakers',
            'Reckless Love - Cory Asbury',
            'There\'s Nothing That Our God Can\'t Do - Passion',
            'Mahal Na Mahal Kita Panginoon - Rommel Guevarra',
            'Pangako - New Life Music',
            'Graves Into Gardens - Elevation Worship',
            'My Jesus - Anne Wilson',
            'I Give You My Heart - Hillsong Worship',
            "Touch Of Heaven - Hillsong Worship",
            'Praise - Elevation Worship',
            'The One You Love - Elevation Worship',
            'Nothing Is Impossible - Planetshakers',
            'Sabik Sa Presensya Mo - Faithmusic Manila',
            'I Came For You - Planetshakers',
            'What I See - Elevation Worship',
            'God\'s Not Dead - Newsboys',
            'O Praise The Name - Hillsong Worship',
            'Agnus Dei - Michael W. Smith',
            'I Thank God - Maverick City Music',
            'Turn It Up - Planetshakers',
            'Momentum - Planetshakers',
            'Sing It Again - Planetshakers',
            'Gratitude - Brandon Lake',
            'Eyes On You - The Belonging Co',
            'See The Light - Hillsong Worship',
            'In Jesus\' Name - Darlene Zschech',
            'House of Miracles - Brandon Lake',
            'Alive - Hillsong Young and Free',
            'River - Planetshakers',
            'Do It Again - Elevation Worship',
            'Holy Forever - Chris Tomlin',
            'Good News - Maverick City Music',
            'Extravagant - Bethel Music',
            'Been So Good - Elevation Worship',
            'We Raise - Planetshakers',
            'Battle Belongs - Phil Wickham',
            'Echo - Tauren Wells',
            'House Of The Lord - Phil Wickham',
            'Worthy - Elevation Worship',
            'Jehovah - Elevation Worship',
            'Shout - Parachute Band',
            'Name of Jesus - Citipointe Live',
            'I Speak Jesus - Charity Gayle',
            'Holding Nothing Back - Jesus Culture',
            'One Way - Hillsong United',
            'Endless Praise - Planetshakers',
            'Tribes - Victory Worship',
            'Salamat Salamat - Malayang Pilipino Music',
            'Ikaw Ang Tunay Na Diyos - Grace Filipino Worship',
            'Won\'t Stop Now - Elevation Worship',
            'Oceans - Hillsong United',
            'Holy Spirit - Jesus Culture',
            'The Blessing - Elevation Worship',
            'Lilim - Victory Worship',
            'I Know You Can - Planetshakers',
            'Abba Father - Planetshakers',
            'Goodbye Yesterday - Elevation Rhythm',
            'P E A C E - Hillsong Young and Free',
            'Firm Foundation - Maverick City Music',
            'Firm Foundation (ver 2) - Maverick City Music',
            'To The Ends of The Earth - Hillsong United',
            'World Outside Your Window - Hillsong Young and Free',
            'Faithful Then / Faithful Now - Elevation Worship',
            'Alive Again - Planetshakers',
            'See A Victory - Elevation Worship',
            'Sinking Deep - Hillsong Young and Free',
            'Build My Life - Housefires',
            'Still - Hillsong Worship',
        ].sort();
    var songlisthtml = "";

    for (let song in songArray) {
        if (songArray[song].toLowerCase().includes(input.toLowerCase())) {
            let dataLyrics = songArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' /', '').toLowerCase();
            songlisthtml += '<li data-lyrics="' + dataLyrics + '">' + songArray[song] + '</li>';
        }
    }

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
            displaySong(currSong.transpose(transposeValue));

            if (hideChordsSetting) {
                hideChords();
            } else {
                showChords();
                if (numeralsSetting) {
                    convertToRomanNumeral();
                }
            }

            window.scrollTo(0, 0);
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
            elem.textContent = numeralString;
        });
}


function toggleNav() {
    const button = document.getElementById("openbtn");

    if (button.style.marginLeft == "0px") {
        document.getElementById("sidebar").style.left = "0px";
        document.getElementById("openbtn").style.marginLeft = "290px";
    } else {
        document.getElementById("sidebar").style.left = "-290px";
        document.getElementById("openbtn").style.marginLeft = "0px";
        document.getElementById("main").style.marginLeft = "0px";
    }
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
        'Pre-Chorus 2',
        'Chorus 1',
        'Chorus 2',
        'Chorus 3',
        'Bridge',
        'Bridge 1',
        'Bridge 2',
        'Bridge 3',
        'Outro',
        'Instrumental',
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
        'Tag 2',
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

document.getElementById('hideChordsButton').addEventListener('click', function () {
    if (hideChordsSetting) {
        showChords();
    } else {
        hideChords();
    }
});

document.getElementById('toggleSettingsButton').addEventListener('click', function () {
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
});
