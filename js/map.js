function initMap() {
    let mapOptions = {
        center: { lat: 51.5074, lng: -0.1278 }, // Координати центру карти
        zoom: 15 // Рівень масштабування
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
}