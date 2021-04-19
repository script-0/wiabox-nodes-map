const MAP_TOKEN = "pk.eyJ1IjoiNGdpLXByb2pldC1yZXNlYXUiLCJhIjoiY2tuaDZsaGxkMW95bzJ6bzd6YnFlMXp0MiJ9.FpaUXOB3qYEQBnAcR9wlag"
const MAP_USERNAME = "4gi-projet-reseau"
const MAP_STYLE = "cknh81nee0c1v18rgmnc5xur3"

const ENSPY_POSITION = {Lat:3.862375 ,Long:11.5}

var mymap = L.map('mapid').setView([ENSPY_POSITION.Lat, ENSPY_POSITION.Long],12);

L.tileLayer("https://api.mapbox.com/styles/v1/"+MAP_USERNAME+"/cknh81nee0c1v18rgmnc5xur3/tiles/{z}/{x}/{y}?access_token="+MAP_TOKEN, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: MAP_USERNAME+'/cknh81nee0c1v18rgmnc5xur3',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAP_TOKEN
}).addTo(mymap);

/*
var marker_0 = L.marker([ENSPY_POSITION.Lat, ENSPY_POSITION.Long]).addTo(mymap);
marker_0.bindPopup("<center><b>GI Laboratory</b><br>First Node</center>").openPopup();

var markers = [marker_0]

for (i=1 ; i < 5 ; i++){
    var tmp = L.marker([ENSPY_POSITION.Lat+ Math.exp(-8*i), ENSPY_POSITION.Long+ Math.exp(-2*i)]).addTo(mymap);
    tmp.bindPopup("<center><b>Node "+i+"</b><br>Description"+i+"</center>");
    markers.push(tmp);
}
*/

/*
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
*/