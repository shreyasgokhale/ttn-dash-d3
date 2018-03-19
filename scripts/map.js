function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(52.395214,4.874712),
        zoom: 7,
    };

    var icon = {
        url: "images/sensor.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var infowindow = new google.maps.InfoWindow({
        content: "Temperature and Humidity Sensor"
    });

    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var myCenter = new google.maps.LatLng(52.395214,4.874712);
    var marker = new google.maps.Marker({
        position: myCenter,
        icon: icon
    });
    marker.setMap(map);
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
        map.setZoom(12);
        map.setCenter(marker.getPosition());
    });
}