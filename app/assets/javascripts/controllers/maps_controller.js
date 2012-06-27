var ge;

var counter = 0;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);
  addSampleButton('Create a Placemark!', buttonClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
  
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function zoom_placemark(lat, lon) {
  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  la.setLatitude(lat)
  la.setLongitude(lon);
  la.setRange(100000);
  ge.getView().setAbstractView(la);
}

function failureCallback(errorCode) {
}

function createPlacemark(attributes) {
  var placemark = ge.createPlacemark('');
  placemark.setName(attributes.text);
  ge.getFeatures().appendChild(placemark);

  // Create style map for placemark
  var icon = ge.createIcon('');
  var hostname= window.location.hostname;
  var port = window.location.port;

  if (port != undefined) {
    hostname += ":" + port
  }
  icon.setHref("http://" + hostname + '/assets/twitter.png');

  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  placemark.setStyleSelector(style);
  placemark.setDescription(attributes.text);

  // Create point
  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var point = ge.createPoint('');
  point.setLatitude(attributes.latitude);
  point.setLongitude(attributes.longitude);
  placemark.setGeometry(point);

  counter++;
}

function buttonClick() {
  createPlacemark();
}
