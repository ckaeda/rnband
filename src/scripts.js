var transposeValue = 0;
var currSong = new ChordSheetJS.Song();
var currKey = ChordSheetJS.Chord.parse('C');
var defaults = {};
var flow = [];
var bpm = null;

document.addEventListener("DOMContentLoaded", function () {
    updateSongList('');

    var searchBar = document.getElementById('searchBar');
    searchBar.addEventListener("input", function () {
        updateSongList(searchBar.value);
    });

    var activeArray =
        [
            'Won\'t Stop Now - Elevation Worship',
            'No One - Elevation Worship',
            'Ikaw Ang Tunay Na Diyos - Grace Filipino Worship',
        ]
    var TNLArray =
        [

        ]
    var FCArray =
        [
            'Jehovah - Elevation Worship',
            'Endless Praise - Planetshakers',
            'Tribes - Victory Worship',
            'Holy Forever - Chris Tomlin',
            'How Great Is Our God - Chris Tomlin',
            'Salamat Salamat - Malayang Pilipino Music',
            'Sabik Sa Presensya Mo - Faithmusic Manila',
            'Banal Na Apoy - MJ Flores',
            'Ikaw Ang Tunay Na Diyos - Grace Filipino Worship',
            'No One - Elevation Worship',
            'I Thank God - Maverick City Music',
            'Won\'t Stop Now - Elevation Worship',
            'Praise - Elevation Worship',
            'Holy Spirit - Jesus Culture'
        ]
    var activelist = document.getElementById("activeList");
    var TNLlist = document.getElementById("activeListTNL");
    var FClist = document.getElementById("activeListFC");
    var activelisthtml = "";
    var TNLlisthtml = "";
    var FClisthtml = "";

    for (let song in activeArray) {
        let dataLyrics = activeArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').toLowerCase();
        activelisthtml += '<li data-lyrics="' + dataLyrics + '">' + activeArray[song] + '</li>';
    }

    for (let song in TNLArray) {
        let TNLdataLyrics = TNLArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').toLowerCase();
        TNLlisthtml += '<li data-lyrics="' + TNLdataLyrics + '">' + TNLArray[song] + '</li>';
    }

    for (let song in FCArray) {
        let FCdataLyrics = FCArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').toLowerCase();
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
            'Holy Spirit - Jesus Culture'
        ].sort();
    var songlisthtml = "";

    for (let song in songArray) {
        if (songArray[song].toLowerCase().includes(input.toLowerCase())) {
            let dataLyrics = songArray[song].replaceAll(' - ', '_').replaceAll('\'', '').replaceAll('.', '').toLowerCase();
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
    fetch('songs/' + lyricsFile + '.json')
        .then(response => response.json())
        .then(song => {
            var title = song.title;
            var artist = song.artist;
            var songbody = song.songbody;

            const deserializedSong = new ChordSheetJS.ChordSheetSerializer().deserialize(songbody);
            currSong = deserializedSong;

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

            window.scrollTo(0, 0);
        })
        .catch(error => console.error('Error fetching song:', error));
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

// Function to get URL parameter by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
        'Tag',
        'Turnaround',
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
    displaySong(currSong.transpose(transposeValue));
});

document.getElementById("plusSign").addEventListener("click", function () {
    transposeValue += 1;
    if (transposeValue == 12) transposeValue = 0;

    document.getElementById("transposeValue").textContent = transposeValue;
    document.getElementById('transposeKey').textContent = 'Key: ' + currKey.transpose(transposeValue).toString();
    displaySong(currSong.transpose(transposeValue));
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