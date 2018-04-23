
const ref = database.ref(`coords`);

const orgLat = 37.427148;
const orgLong = -122.10964;

let initMap = () => {

    let uluru = {lat: orgLat, lng: orgLong};

    // flightPath is a SINGLE polyline
    var flightPath;

    // flightPathArray is an ARRAY of polylines
    var flightPathArray = [];

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });

    let markers = [];
    let markerPos = [];

    ref.on(`child_added`, function (snapshot) {

        let value = snapshot.val();

        let lat = value[`lat`];
        let long = value[`long`];
        let time = value[`time`];

        let currentLocation = {lat: lat, lng: long};

        // Center the map on current location
        map.panTo(currentLocation);

        addMarker(lat, long, time);

    });

    // Adds a marker to the map and push to the array.
    let addMarker = (lat, long, time) => {

        const beachFlag ='https://github.com/WatShout/watch-gps/raw/master/app/src/main/res/drawable/beachflag.png';
        const blueFlag = 'https://github.com/WatShout/watch-gps/raw/master/app/src/main/res/drawable/blueflag.png';
        const current = 'https://github.com/WatShout/watch-gps/raw/master/app/src/main/res/drawable/current.png';

        var image;

        let currentCoords = new google.maps.LatLng(lat, long);

        let marker = new google.maps.Marker({
            position: currentCoords,
            map: map,
            icon: current
        });

        markerPos.push(currentCoords);

        markers.push(marker);

        flightPath = new google.maps.Polyline({
          path: markerPos,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);

        flightPathArray.push(flightPath);

        if (markers.length > 0){

            for (let i = 0; i < markers.length - 1; i++){

                markers[i].setIcon(null);
                markers[i].setVisible(false);

            }
        }
    };

    let setMapOnAll = (map) => {

        for (let i = 0; i < markers.length; i++) {

            markers[i].setMap(map);
        }
    };

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {

        setMapOnAll(null);
        flightPath.setMap(null);

        for (let i=0; i < flightPathArray.length; i++){
              flightPathArray[i].setMap(null); //or line[i].setVisible(false);
        }

        flightPathArray = [];
        markerPos = [];
    }

    ref.on(`child_removed`, function (snapshot) {

        clearMarkers();

    });

};


let addRandomPoints = () => {

    const NorthSouth = Math.random();

    let ns;

    switch (true) {

        case NorthSouth < 0.5:
            ns = -1; // North
            break;
        case NorthSouth >= 0.5 && NorthSouth < 1:
            ns = -1; // South
            break;

    }

    const EastWest = Math.random();

    let ew;

    switch (true) {

        case EastWest < 0.5:
            ew = 1; // East
            break;
        case EastWest >= 0.5 && EastWest < 1:
            ew = -1; // West
            break;
    }

    for (let i = 0; i < 50; i++){

        let scaled = i / 1000;

        let newLat, newLong;

        if (i < 25){
            newLat = orgLat + (scaled * ew);
            newLong = orgLong + (scaled * ns);
        } else {
            newLat = (orgLat + (scaled * ew)) + (scaled * ew) - (25/1000);
            newLong = orgLong + (scaled * ns);
        }

        let time = Math.round((new Date()).getTime() / 1000);

        let newPoint = {
            lat: newLat,
            long: newLong,
            time: time
        };

        ref.push(newPoint);
    }
};

let readJSON = () => {

    const data = '{"coords": [{"lat": -122.109456, "long": 37.426925},{"lat": -122.109267, "long": 37.427029},{"lat": -122.109115, "long": 37.427176},{"lat": -122.108921, "long": 37.427313},{"lat": -122.108729, "long": 37.427425},{"lat": -122.108534, "long": 37.427542},{"lat": -122.108338, "long": 37.427646},{"lat": -122.108182, "long": 37.427787},{"lat": -122.108027, "long": 37.427938},{"lat": -122.107869, "long": 37.428105},{"lat": -122.107729, "long": 37.42827},{"lat": -122.107613, "long": 37.428433},{"lat": -122.107426, "long": 37.428568},{"lat": -122.107275, "long": 37.428721},{"lat": -122.107123, "long": 37.428882},{"lat": -122.107012, "long": 37.429048},{"lat": -122.106947, "long": 37.429235},{"lat": -122.106992, "long": 37.429305},{"lat": -122.107248, "long": 37.429348},{"lat": -122.107499, "long": 37.429368},{"lat": -122.107727, "long": 37.429393},{"lat": -122.107975, "long": 37.429405},{"lat": -122.108217, "long": 37.429438},{"lat": -122.108452, "long": 37.429515},{"lat": -122.108656, "long": 37.42963},{"lat": -122.108845, "long": 37.429745},{"lat": -122.109037, "long": 37.429871},{"lat": -122.109244, "long": 37.430003},{"lat": -122.109432, "long": 37.43011},{"lat": -122.109624, "long": 37.430237},{"lat": -122.109773, "long": 37.430377},{"lat": -122.109827, "long": 37.430564},{"lat": -122.109806, "long": 37.430759},{"lat": -122.109721, "long": 37.43093},{"lat": -122.109593, "long": 37.431096},{"lat": -122.109481, "long": 37.43127},{"lat": -122.109328, "long": 37.431436},{"lat": -122.109195, "long": 37.431593},{"lat": -122.109061, "long": 37.431744},{"lat": -122.108886, "long": 37.431885},{"lat": -122.108675, "long": 37.431953},{"lat": -122.10845, "long": 37.431972},{"lat": -122.108231, "long": 37.431908},{"lat": -122.108054, "long": 37.431788},{"lat": -122.107897, "long": 37.43164},{"lat": -122.107724, "long": 37.431509},{"lat": -122.107555, "long": 37.431371},{"lat": -122.107397, "long": 37.431238},{"lat": -122.107236, "long": 37.431101},{"lat": -122.107085, "long": 37.430956},{"lat": -122.106916, "long": 37.430814},{"lat": -122.10677, "long": 37.430661},{"lat": -122.106694, "long": 37.430472},{"lat": -122.106685, "long": 37.430287},{"lat": -122.10668, "long": 37.4301},{"lat": -122.106697, "long": 37.429919},{"lat": -122.106716, "long": 37.429737},{"lat": -122.106659, "long": 37.429568},{"lat": -122.106431, "long": 37.429536},{"lat": -122.1062, "long": 37.42953},{"lat": -122.105956, "long": 37.429518},{"lat": -122.105705, "long": 37.429512},{"lat": -122.10546, "long": 37.429503},{"lat": -122.105223, "long": 37.429491},{"lat": -122.104966, "long": 37.429479},{"lat": -122.104738, "long": 37.429466},{"lat": -122.104518, "long": 37.429438},{"lat": -122.104483, "long": 37.429259},{"lat": -122.1045, "long": 37.429065},{"lat": -122.1045, "long": 37.428879},{"lat": -122.104419, "long": 37.428675},{"lat": -122.104358, "long": 37.428492},{"lat": -122.104352, "long": 37.428296},{"lat": -122.104357, "long": 37.428093},{"lat": -122.104359, "long": 37.427905},{"lat": -122.104368, "long": 37.427713},{"lat": -122.104369, "long": 37.427526},{"lat": -122.104354, "long": 37.427339},{"lat": -122.104355, "long": 37.427155},{"lat": -122.104348, "long": 37.42696},{"lat": -122.104348, "long": 37.426756},{"lat": -122.104341, "long": 37.426565},{"lat": -122.104346, "long": 37.426367},{"lat": -122.104354, "long": 37.426184},{"lat": -122.104353, "long": 37.425991},{"lat": -122.104359, "long": 37.425788},{"lat": -122.104346, "long": 37.425607},{"lat": -122.104355, "long": 37.425417},{"lat": -122.104354, "long": 37.425218},{"lat": -122.104351, "long": 37.425019},{"lat": -122.104331, "long": 37.424815},{"lat": -122.104319, "long": 37.42461},{"lat": -122.104314, "long": 37.424426},{"lat": -122.104243, "long": 37.424216},{"lat": -122.104238, "long": 37.424029},{"lat": -122.104275, "long": 37.423827},{"lat": -122.104266, "long": 37.423639},{"lat": -122.104289, "long": 37.423434},{"lat": -122.104303, "long": 37.423231},{"lat": -122.104305, "long": 37.423026},{"lat": -122.104292, "long": 37.422833},{"lat": -122.104305, "long": 37.422644},{"lat": -122.104312, "long": 37.422456},{"lat": -122.104343, "long": 37.422259},{"lat": -122.104424, "long": 37.422144},{"lat": -122.104678, "long": 37.422155},{"lat": -122.104927, "long": 37.422179},{"lat": -122.10517, "long": 37.422114},{"lat": -122.105392, "long": 37.42202},{"lat": -122.105622, "long": 37.421929},{"lat": -122.105844, "long": 37.421858},{"lat": -122.105966, "long": 37.422009},{"lat": -122.106096, "long": 37.422174},{"lat": -122.10621, "long": 37.422333},{"lat": -122.106308, "long": 37.422498},{"lat": -122.106414, "long": 37.422666},{"lat": -122.106468, "long": 37.422848},{"lat": -122.106492, "long": 37.423049},{"lat": -122.106484, "long": 37.423255},{"lat": -122.10647, "long": 37.423457},{"lat": -122.106469, "long": 37.423644},{"lat": -122.106479, "long": 37.423827},{"lat": -122.106481, "long": 37.424015},{"lat": -122.106499, "long": 37.424201},{"lat": -122.106522, "long": 37.42439},{"lat": -122.106542, "long": 37.424584},{"lat": -122.106535, "long": 37.424786},{"lat": -122.106529, "long": 37.424986},{"lat": -122.106526, "long": 37.425178},{"lat": -122.106518, "long": 37.425376},{"lat": -122.106519, "long": 37.425567},{"lat": -122.106524, "long": 37.425758},{"lat": -122.106536, "long": 37.425958},{"lat": -122.106535, "long": 37.426147},{"lat": -122.106546, "long": 37.426344},{"lat": -122.106569, "long": 37.426537},{"lat": -122.106623, "long": 37.426715},{"lat": -122.106746, "long": 37.426898},{"lat": -122.106884, "long": 37.427056},{"lat": -122.10706, "long": 37.427195},{"lat": -122.107229, "long": 37.427327},{"lat": -122.107405, "long": 37.427455},{"lat": -122.10757, "long": 37.427582},{"lat": -122.107753, "long": 37.427711},{"lat": -122.107952, "long": 37.42783},{"lat": -122.108171, "long": 37.427807},{"lat": -122.10836, "long": 37.427681},{"lat": -122.10855, "long": 37.427569},{"lat": -122.108756, "long": 37.427459},{"lat": -122.108945, "long": 37.42735},{"lat": -122.109124, "long": 37.427236},{"lat": -122.109337, "long": 37.427105},{"lat": -122.109542, "long": 37.426986},{"lat": -122.109607, "long": 37.42697]}';

    obj = JSON.parse(data);

    console.log(obj);

};


initMap();

//readJSON();
