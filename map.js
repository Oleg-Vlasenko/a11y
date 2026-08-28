
function _cl(txt) {
    console.log(txt);
}

window._tst11__pin_click = false;
window._tst11__marker = false;
window._tst11__send_info = false;

function disablePinMode() {

    if (!window._tst11__pin_click) {
        return;
    }

    if (routeMode) {
        return;
    }

    if (window._tst11__marker) {
        map.removeLayer(window._tst11__marker);
        window._tst11__marker = false;
    }

    map.getContainer().style.cursor = "";

    if (wfsClickHandler) {
        map.off('click', wfsClickHandler);
        wfsClickHandler = null;
    }

    // Убираем подсветку, если есть
    if (highlightLayer) {
        map.removeLayer(highlightLayer);
        highlightLayer = null;
    }

    document.querySelector('.leaflet-overlay-pane').innerHTML = '';

    // Закрываем все попапы
    map.closePopup();
}

let initialLat, initialLng, initialZoom;

// Проверяем ширину экрана
if (window.innerWidth <= 768) {
    // Мобильный экран
    // initialLat = 48.4605;
    initialLat = 48.4595; // координаты для моб версии
    // initialLng = 35.0585;
    initialLng = 35.065;
    initialZoom = 16;
} else {
    // Десктоп
    initialLat = 48.459898;
    initialLng = 35.057008;
    initialZoom = 16;
}
const map = L.map('map', {
    zoomControl: false
}).setView([initialLat, initialLng], initialZoom);


// Подложка
// const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 22,
//     attribution: '© OpenStreetMap'
// }).addTo(map);
const osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_2fl6_1_5048332282136000b6987d53', {
    maxZoom: 22,
    attribution: 'cartocdn.com'
}).addTo(map);

const geoServerUrl = 'http://46.98.11.253:8080/geoserver/Dnepr/wms';

// WMS слои
const wmsLayer_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:Будівлі',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}); //.addTo(map);

const wmsLayer_2_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_admin_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_2_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_admin_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_3_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_education_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_3_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_education_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_4_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_health_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_4_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_health_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_5_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_residential_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_5_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_residential_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_6_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_other_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_6_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_build_other_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_7_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_street_network_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_7_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_street_network_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_8_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_transport_stops_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_8_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_transport_stops_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_9_1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:line_traley',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_9_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:line_tramvay',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer_10_2 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mbf_park_public_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);



let highlightLayer;

// Custom zoom control
document.getElementById('zoom-in').onclick = function () {
    map.zoomIn();
};
document.getElementById('zoom-out').onclick = function () {
    map.zoomOut();
};

// Sidebar: кликабельность и выделение активной кнопки + Folder Popup Logic
const sidebarBtns = document.querySelectorAll('.sidebar-btn');
const folderBtn = document.getElementById('folderBtn');
const btnPin = document.getElementById('btnPin');
const folderPopup = document.getElementById('folderPopup');
const customControls = document.getElementById('customControls'); // Получаем блок кнопок
const btnSettings = document.getElementById('btnSettings');
const settingsPopup = document.getElementById('settingsPopup');

let wfsClickHandler;

// --- FULLSCREEN browser API ---
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// --- Custom Layer Control Logic ---
const baseLayers = {
    "OpenStreetMap": osmLayer
};

// Создаем группы слоев
const layersGroup_2 = L.layerGroup([wmsLayer_2_1, wmsLayer_2_2]);
const layersGroup_3 = L.layerGroup([wmsLayer_3_1, wmsLayer_3_2]);
const layersGroup_4 = L.layerGroup([wmsLayer_4_1, wmsLayer_4_2]);
const layersGroup_5 = L.layerGroup([wmsLayer_5_1, wmsLayer_5_2]);
const layersGroup_6 = L.layerGroup([wmsLayer_6_1, wmsLayer_6_2]);
const layersGroup_7 = L.layerGroup([wmsLayer_7_1, wmsLayer_7_2]);
const layersGroup_8 = L.layerGroup([wmsLayer_8_1, wmsLayer_8_2]);
const layersGroup_9 = L.layerGroup([wmsLayer_9_1, wmsLayer_9_2]);
const layersGroup_10 = L.layerGroup([wmsLayer_10_2]);

const overlays = {
    "Безбар`єрність: Адміністративні будівлі": layersGroup_2,
    "Безбар`єрність: Заклади освіти": layersGroup_3,
    "Безбар`єрність: Установи охорони здоров`я": layersGroup_4,
    "Безбар`єрність: Багатоквартирні будинки": layersGroup_5,
    "Безбар`єрність: Інші будівлі": layersGroup_6,
    "Безбар`єрність: Вулично-дорожня мережа": layersGroup_7,
    "Безбар`єрність: Зупинки громадського транспорту": layersGroup_8,
    "Безбар`єрність: Парки та сквери": layersGroup_10,
    "Будівлі": wmsLayer_1,
    "Електротранспорт": layersGroup_9
};

const overlayIcons = {
    "Безбар`єрність: Адміністративні будівлі": "lr2",
    "Безбар`єрність: Заклади освіти": "lr3",
    "Безбар`єрність: Установи охорони здоров`я": "lr4",
    "Безбар`єрність: Багатоквартирні будинки": "lr5",
    "Безбар`єрність: Інші будівлі": "lr6",
    "Безбар`єрність: Вулично-дорожня мережа": "lr7",
    "Безбар`єрність: Зупинки громадського транспорту": "lr8",
    "Безбар`єрність: Парки та сквери": "lr10",
    "Будівлі": "none",
    "Електротранспорт": "none"
};

window._tst11__pin_click = true;

folderPopup.classList.remove('active');
settingsPopup.style.display = 'none';

// Устанавливаем курсор
map.getContainer().style.cursor = "auto";

// Устанавливаем обработчик клика по карте
wfsClickHandler = function (e) {
    const bboxSize = 0.0002;
    const bbox = [
        e.latlng.lng - bboxSize,
        e.latlng.lat - bboxSize,
        e.latlng.lng + bboxSize,
        e.latlng.lat + bboxSize
    ].join(',');


    const urls = [
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_admin_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_admin_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_education_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_education_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_health_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_health_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_residential_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_residential_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_other_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_build_other_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_street_network_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_street_network_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_transport_stops_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_transport_stops_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_park_public_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`
    ];

    function tryFetch(index) {
        if (index >= urls.length) {
            L.popup()
                .setLatLng(e.latlng)
                .setContent('Немає об`єктів у місці кліка.')
                .openOn(map);
            return;
        }

        fetch(urls[index])
            .then(res => res.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    if (window._tst11__marker) {
                        map.removeLayer(window._tst11__marker);
                        window._tst11__marker = false;
                    }

                    window._tst11__marker = L.marker(e.latlng).addTo(map);

                    const props = data.features[0].properties;
                    let contentData;

                    if (urls[index].includes('mindev')) {
                        // только один атрибут
                        contentData = props['Desr'] ?? '(без назви)';
                    } else {
                        // стандартный вывод
                        contentData = Object.entries(props)
                            .slice(0, 3) // берём первые три пары ключ-значение
                            .map(([k, v]) => `<b>${k}</b>: ${v ?? ''}`)
                            .join('<br>');
                    }


                    const featureId = data.features[0].id;

                    let imgFile;
                    let objType;
                    let objData;

                    _cl(featureId);
                    _cl(props);

                    if (featureId == 'mbf_build_admin_bad.1') {
                        imgFile = 'mbf_build_admin_bad_1.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_admin_bad.2') {
                        imgFile = 'mbf_build_admin_bad_2.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_admin_bad.3') {
                        imgFile = 'mbf_build_admin_bad_3.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_admin_bad.4') {
                        imgFile = 'mbf_build_admin_bad_4.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_admin_bad.5') {
                        imgFile = 'mbf_build_admin_bad_5.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_admin_ok.1') {
                        imgFile = 'mbf_build_admin_ok_1.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_education_ok.1') {
                        imgFile = 'mbf_build_education_ok_1.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_education_bad.1') {
                        imgFile = 'mbf_build_education_bad_1.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_education_bad.2') {
                        imgFile = 'mbf_build_education_bad_2.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();
                        // contentData = 'Необхідно впорядкувати вхідну групу, облаштувати пандус, встановити тактильну плитку та обладнати вбиральні відповідно до нормативів.';

                    } else if (featureId == 'mbf_build_education_bad.3') {
                        imgFile = 'mbf_build_education_bad_3.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_ok.1') {
                        imgFile = 'mbf_build_health_ok_1.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_ok.2') {
                        imgFile = 'mbf_build_health_ok_2.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_ok.3') {
                        imgFile = 'mbf_build_health_ok_3.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_ok.4') {
                        imgFile = 'mbf_build_health_ok_4.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_ok.5') {
                        imgFile = 'mbf_build_health_ok_5.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_ok.6') {
                        imgFile = 'mbf_build_health_ok_6.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.1') {
                        imgFile = 'mbf_build_health_bad_1.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.2') {
                        imgFile = 'mbf_build_health_bad_2.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.3') {
                        imgFile = 'mbf_build_health_bad_3.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.4') {
                        imgFile = 'mbf_build_health_bad_4.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.5') {
                        imgFile = 'mbf_build_health_bad_5.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.6') {
                        imgFile = 'mbf_build_health_bad_6.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_health_bad.7') {
                        imgFile = 'mbf_build_health_bad_7.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_ok.1') {
                        imgFile = 'mbf_build_residential_ok_1.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.1') {
                        imgFile = 'mbf_build_residential_bad_1.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.2') {
                        imgFile = 'mbf_build_residential_bad_2.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.3') {
                        imgFile = 'mbf_build_residential_bad_3.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.4') {
                        imgFile = 'mbf_build_residential_bad_4.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.5') {
                        imgFile = 'mbf_build_residential_bad_5.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.6') {
                        imgFile = 'mbf_build_residential_bad_6.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.7') {
                        imgFile = 'mbf_build_residential_bad_7.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_residential_bad.8') {
                        imgFile = 'mbf_build_residential_bad_8.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_ok.1') {
                        imgFile = 'mbf_build_other_ok_1.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_ok.2') {
                        imgFile = 'mbf_build_other_ok_2.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_ok.3') {
                        imgFile = 'mbf_build_other_ok_3.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_ok.4') {
                        imgFile = 'mbf_build_other_ok_4.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_ok.5') {
                        imgFile = 'mbf_build_other_ok_5.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.1') {
                        imgFile = 'mbf_build_other_bad_1.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.2') {
                        imgFile = 'mbf_build_other_bad_2.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        // objData = 'Кав`ярня "Чіп і Дейл"';
                        contentData = (props['descr'] || '').trim();
                        // contentData = 'Рекомендовано змінити вхідну групу, влаштувати нормативні сходи з поручнями, встановити підйомник, прибрати інформаційний шум та замінити дверні прорізи.';

                    } else if (featureId == 'mbf_build_other_bad.3') {
                        imgFile = 'mbf_build_other_bad_3.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (['mbf_build_other_bad.4',
                        'mbf_build_other_bad.5',
                        'mbf_build_other_bad.6'].includes(featureId)) {
                        imgFile = 'mbf_build_other_bad_4.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.7') {
                        imgFile = 'mbf_build_other_bad_7.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.8') {
                        imgFile = 'mbf_build_other_bad_8.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.9') {
                        imgFile = 'mbf_build_other_bad_9.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.10') {
                        imgFile = 'mbf_build_other_bad_10.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.11') {
                        imgFile = 'mbf_build_other_bad_11.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.12') {
                        imgFile = 'mbf_build_other_bad_12.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_build_other_bad.13') {
                        imgFile = 'mbf_build_other_bad_13.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_street_network_ok.1') {
                        imgFile = 'mbf_street_network_ok_1.png';
                        objType = 'Вулично-дорожня мережа';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_street_network_ok.2' || featureId == 'mbf_street_network_ok.3') {

                        imgFile = 'mbf_street_network_ok_2.png';
                        objType = 'Вулично-дорожня мережа';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_street_network_ok.4') {
                        imgFile = 'mbf_street_network_ok_4.png';
                        objType = 'Вулично-дорожня мережа';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();


                    } else if (featureId.startsWith('mbf_street_network_bad.')) {
                        let num = parseInt(featureId.split('.')[1], 10);

                        if (num >= 1 && num <= 8) {
                            imgFile = 'mbf_street_network_bad_1.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();

                        } else if (num >= 9 && num <= 11) {
                            imgFile = 'mbf_street_network_bad_2.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();

                        } else if (num >= 12 && num <= 16) {
                            imgFile = 'mbf_street_network_bad_3.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();

                        } else if (num >= 17 && num <= 28) {
                            imgFile = 'mbf_street_network_bad_4.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();
                        }


                    } else if (featureId == 'mbf_transport_stops_ok.1') {
                        imgFile = 'mbf_street_network_ok_2.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_transport_stops_bad.1') {
                        imgFile = 'mbf_transport_stops_bad_1.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_transport_stops_bad.2') {
                        imgFile = 'mbf_transport_stops_bad_2.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_transport_stops_ok.2') {
                        imgFile = 'mbf_transport_stops_ok_2.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_park_public_bad.1') {
                        imgFile = 'mbf_park_public_bad_1.png';
                        objType = 'Парки та сквери';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'mbf_park_public_bad.2') {
                        imgFile = 'mbf_park_public_bad_2.png';
                        objType = 'Парки та сквери';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();


                    } else {
                        imgFile = 'base_dnipro.png';
                        objType = 'Об`єкт';
                        objData = 'Дані у стані заповнення...';
                        contentData = 'Дані у стані заповнення...';
                    }

                    const isMobile = window.innerWidth <= 768; // определяем мобильное устройство

                    if (!isMobile) {
                        // --- Десктопный popup ---
                        const content = `
                            <div style="width:300px;">
                                <h4>Тип об'єкту:</h4>
                                <p>${objType}</p>
                                <h4>Дані:</h4>
                                <p>${objData}</p>
                                <h4>Опис об'єкту:</h4>
                                <p>${contentData}</p>
                                <img src="images/${imgFile}" alt="Будинок" style="width:100%; height:auto;"/>
                                <button id="popupBtn">Додати інформацію</button>
                                <div id="popupArea" class="openTxtArea"></div>
                            </div>
                        `;

                        window._tst11__send_info = false;

                        const popup = L.popup()
                            .setLatLng(e.latlng)
                            .setContent(content)
                            .openOn(map);

                        setTimeout(() => {
                            popup._adjustPan();

                            setTimeout(() => {
                                popup._adjustPan();
                            }, 10);
                        }, 10);

                        // Обработчики кнопок в десктоп версии повешены на map.on('popupopen', function (e) {} )

                    } else {

                        // --- Мобильный fullscreen popup ---
                        let popupDiv = document.getElementById('mobilePopup');

                        // Моб хром в fullscreen закрывает клавиатурой окно ввода, гугл это не полечил,
                        // по этому перед всплывашкой отключаем fullscreen, а при ее закрытии - включаем
                        let isMobFullscreen = document.fullscreenElement;
                        if (isMobFullscreen) {
                            document.exitFullscreen();
                        };

                        // Если ещё нет div, создаём
                        if (!popupDiv) {
                            popupDiv = document.createElement('div');
                            popupDiv.id = 'mobilePopup';
                            popupDiv.innerHTML = `
                                <div class="mobile-popup-content">
                                    <h4>Тип об'єкту:</h4>
                                    <p id="objType"></p>
                                    <h4>Дані:</h4>
                                    <p id="objData"></p>
                                    <h4>Опис об'єкту:</h4>
                                    <p id="contentData"></p>
                                    <img id="objImg" src="" alt="Будинок" style="width:100%; height:auto;">
                                    <button id="mobPopupBtn">Додати інформацію</button>
                                    <button id="mobCloseBtn" style="margin-left:10px;">Закрити</button>
                                    <div id="popupArea" class="openTxtArea"></div>
                                </div>
                            `;


                            document.body.appendChild(popupDiv);
                        }

                        // В моб версии все обработчики прямо здесь

                        // Закрытие
                        popupDiv.querySelector('#mobCloseBtn').onclick = (e) => {
                            const root = e.target.closest('#mobilePopup');
                            const areaContainer = root.querySelector('#popupArea');
                            const btn = root.querySelector('#mobPopupBtn');

                            btn.textContent = "Додати інформацію";
                            areaContainer.innerHTML = '';
                            window._tst11__send_info = false;

                            // Если перед открытием всплывашки был fullscreen - возвращаем его
                            if (isMobFullscreen) {
                                document.documentElement.requestFullscreen();
                            }

                            popupDiv.style.display = 'none';
                        };

                        // Отправить сообщение в админку сайта
                        popupDiv.querySelector('#mobPopupBtn').onclick = (e) => {
                            const root = e.target.closest('#mobilePopup');
                            const rootInsideBox = root.querySelector('.mobile-popup-content');
                            const btn = root.querySelector('#mobPopupBtn');
                            const areaContainer = root.querySelector('#popupArea');
                            let ta = root.querySelector('#popupTextarea');

                            if (!window._tst11__send_info) {

                                if (!areaContainer) return;

                                // не создаём второй textarea, если уже есть
                                if (!ta) {
                                    areaContainer.innerHTML = `
                                        <textarea id="popupTextarea" rows="10" style="width:100%; margin-top:8px;"></textarea>
                                    `;
                                    ta = root.querySelector('#popupTextarea');
                                }
                                if (ta) ta.focus();

                                btn.textContent = "Надіслати";
                                window._tst11__send_info = true;

                                setTimeout(() => {
                                    rootInsideBox.scrollTop = rootInsideBox.scrollHeight;
                                }, 50);

                            } else {

                                // Берём текст пользователя
                                const text = ta ? ta.value.trim() : "";

                                if (text == "") {
                                    alert('Не введено інформацію!');
                                    return;
                                }

                                fetch("php/bid.php", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body: "message=" + encodeURIComponent(text)
                                })
                                    .then(response => response.text())   // читаем ответ как текст
                                    .then(data => _cl("Ответ PHP:", data))  // выводим в консоль
                                    .catch(err => console.error("Ошибка отправки:", err));

                                btn.textContent = "Додати інформацію";
                                areaContainer.innerHTML = '';
                                window._tst11__send_info = false;

                                // Закрываем текущий popup
                                popupDiv.style.display = 'none';

                                setTimeout(() => {
                                    alert("Ваша інформація надіслана адміністратору системи.\nПісля її перевірки вона буде розміщена на карті.");


                                    // Если перед открытием всплывашки был fullscreen - возвращаем его
                                    if (isMobFullscreen) {
                                        document.documentElement.requestFullscreen();
                                    }
                                }, 200);

                            }

                        }

                        // Заполняем контент
                        popupDiv.style.display = 'block';
                        popupDiv.querySelector('#objType').textContent = objType;
                        popupDiv.querySelector('#objData').textContent = objData;
                        popupDiv.querySelector('#contentData').textContent = contentData;
                        popupDiv.querySelector('#objImg').src = 'images/' + imgFile;

                        window._tst11__send_info = false; // сбрасываем флаг для textarea
                    }

                } else {
                    tryFetch(index + 1); // пробуем следующий слой
                }
            })
            .catch(err => {
                console.error(err);
                tryFetch(index + 1); // в случае ошибки тоже пробуем следующий
            });
    }

    tryFetch(0); // запускаем с первой ссылки
}

map.on('click', wfsClickHandler);

function createCustomLayerControl(base, overlays, map, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    // Base layers (radio)
    if (Object.keys(base).length > 0) {
        const baseDiv = document.createElement('div');
        baseDiv.className = 'leaflet-control-layers-base';
        let count = 0;
        for (let layerName in base) {
            count++;
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'leaflet-base';
            input.id = 'base-' + count;
            input.checked = map.hasLayer(base[layerName]);
            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.appendChild(document.createTextNode(layerName));

            baseDiv.appendChild(input);
            baseDiv.appendChild(label);

            input.onchange = function () {
                for (let l in base) {
                    map.removeLayer(base[l]);
                }
                base[layerName].addTo(map);
                createCustomLayerControl(base, overlays, map, containerId);
            };
        }
        container.appendChild(baseDiv);
    }

    // Separator
    if (Object.keys(base).length && Object.keys(overlays).length) {
        const sep = document.createElement('div');
        sep.className = 'leaflet-control-layers-separator';
        container.appendChild(sep);
    }

    // Overlays (checkbox)
    if (Object.keys(overlays).length > 0) {
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'leaflet-control-layers-overlays';
        let count = 0;
        let firstNoIcon = false;
        for (let layerName in overlays) {
            count++;
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'leaflet-overlay';
            input.id = 'overlay-' + count;

            // Проверяем состояние группы слоев или обычного слоя
            const layer = overlays[layerName];
            let isChecked = false;
            if (layer instanceof L.LayerGroup) {
                // Для группы проверяем, добавлены ли все дочерние слои
                isChecked = layer.getLayers().every(childLayer => map.hasLayer(childLayer));
            } else {
                isChecked = map.hasLayer(layer);
            }
            input.checked = isChecked;

            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            // label.appendChild(document.createTextNode(layerName));
            const spanText = document.createElement('span');
            spanText.className = 'label-text';
            spanText.textContent = layerName;  // текст слоя
            label.appendChild(spanText);

            if (overlayIcons[layerName] != 'none') {
                const iconBlue = document.createElement('img');
                iconBlue.className = 'overlay-icon';
                iconBlue.src = `icons/${overlayIcons[layerName]}_blue.svg`;
                iconBlue.alt = 'Безбар`єрність';
                label.appendChild(iconBlue);

                const iconRed = document.createElement('img');
                iconRed.className = 'overlay-icon';
                iconRed.src = `icons/${overlayIcons[layerName]}_red.svg`;
                iconRed.alt = 'Безбар`єрність';
                label.appendChild(iconRed);

            } else if (!firstNoIcon) {
                const sep = document.createElement('div');
                sep.className = 'leaflet-control-layers-separator';
                overlayDiv.appendChild(sep);

                firstNoIcon = true;
            }

            overlayDiv.appendChild(input);
            overlayDiv.appendChild(label);

            input.onchange = function () {
                const layer = overlays[layerName];
                if (input.checked) {
                    if (layer instanceof L.LayerGroup) {
                        // Добавляем все слои из группы
                        layer.getLayers().forEach(childLayer => {
                            childLayer.addTo(map);
                        });
                    } else {
                        layer.addTo(map);
                    }
                } else {
                    if (layer instanceof L.LayerGroup) {
                        // Удаляем все слои из группы
                        layer.getLayers().forEach(childLayer => {
                            map.removeLayer(childLayer);
                        });
                    } else {
                        map.removeLayer(layer);
                    }
                }
                createCustomLayerControl(base, overlays, map, containerId);
            };
        }
        container.appendChild(overlayDiv);
    }
}

createCustomLayerControl(baseLayers, overlays, map, 'customLayerControl');

// --- Layer control dropdown logic ---
const customLayerBtn = document.getElementById('customLayerBtn');
const customLayerControl = document.getElementById('customLayerControl');
let isLayerControlOpen = false;

function openLayerControl() {
    customLayerControl.style.display = 'block';
    isLayerControlOpen = true;
}
function closeLayerControl() {
    customLayerControl.style.display = 'none';
    isLayerControlOpen = false;
}

customLayerBtn.onclick = function (e) {
    e.stopPropagation();
    if (isLayerControlOpen) {
        closeLayerControl();
    } else {
        openLayerControl();
    }
};

// Закрытие попапа слоев по клику вне его или по Escape
document.addEventListener('mousedown', function (e) {
    if (
        isLayerControlOpen &&
        !customLayerControl.contains(e.target) &&
        !customLayerBtn.contains(e.target)
    ) {
        closeLayerControl();
    }
    // Логика закрытия folderPopup по клику вне или по Escape удалена,
    // так как он теперь закрывается только при нажатии другой кнопки сайдбара.
});

document.addEventListener('keydown', function (e) {
    if (isLayerControlOpen && e.key === "Escape") {
        closeLayerControl();
    }
    // Логика закрытия folderPopup по Escape удалена.
});

document.addEventListener('DOMContentLoaded', function () {
    const attributionControl = document.querySelector('.leaflet-control-attribution');
    if (attributionControl) {
        attributionControl.style.display = 'none';

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            const btn = document.getElementById('fullscreenBtn');
            if (btn) btn.style.display = 'none';
        }
    }

    const params = new URLSearchParams(window.location.search);
    const adminBtn = document.getElementById("adminBtnInMapControls");

    // показываем только если ?adm=1
    if (params.get("adm") === "1") {
        adminBtn.style.display = "block";
    }

    adminBtn.addEventListener("click", () => {
        const loc = window.location;
        const base = loc.origin + loc.pathname.replace(/\/[^\/]*$/, "");
        // удаляем имя текущего файла

        window.location.href = base + "/admin/index.php";
    });

});

// После инициализации карты
const mapContainer = map.getContainer();
const titleDiv = document.createElement('div');
titleDiv.className = 'leaflet-map-title';
titleDiv.innerHTML = 'Мапа безбар`єрності';
titleDiv.style.cssText = `
    position: absolute;
    top: 20px;
    left: 40px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.4);
    padding: 2px 12px;
    border-radius: 8px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 22px;
    font-weight: bold;
    color: #2389ddff;
    text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
    pointer-events: none;
`;

// Подстройка для мобильных экранов
if (window.innerWidth <= 768) { // например, до 768px — мобильный экран
    titleDiv.style.top = '0';
    titleDiv.style.left = '0';
}

mapContainer.appendChild(titleDiv);

map.on('popupopen', function (e) {
    // Ввод заявки для десктоп версии

    const root = e.popup.getElement();               // корневой DOM текущего попапа
    if (!root) return;

    const btn = root.querySelector('#popupBtn');     // ищем кнопку ТОЛЬКО в этом попапе
    if (!btn) return;

    // навешиваем обработчик для этой конкретной кнопки
    btn.addEventListener('click', function () {
        // кнопка открывает ввод текста
        if (!window._tst11__send_info) {

            const areaContainer = root.querySelector('#popupArea');
            if (!areaContainer) return;

            // не создаём второй textarea, если уже есть
            let ta = root.querySelector('#popupTextarea');
            if (!ta) {
                areaContainer.innerHTML = `
                    <textarea id="popupTextarea" rows="10" style="width:100%; margin-top:8px;"></textarea>
                `;
                ta = root.querySelector('#popupTextarea');
            }
            if (ta) ta.focus();

            btn.textContent = "Надіслати";
            window._tst11__send_info = true;

        } else {

            const areaContainer = root.querySelector('#popupArea');
            const ta = root.querySelector('#popupTextarea');

            // Берём текст пользователя
            const text = ta ? ta.value.trim() : "";

            if (text == "") {
                alert('Не введено інформацію!');
                return;
            }

            fetch("php/bid.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "message=" + encodeURIComponent(text)
            })
                .then(response => response.text())   // читаем ответ как текст
                .then(data => _cl("Ответ PHP:", data))  // выводим в консоль
                .catch(err => console.error("Ошибка отправки:", err));

            if (areaContainer) {
                areaContainer.innerHTML = '';
            }

            btn.textContent = "Додати інформацію";
            window._tst11__send_info = false;

            // Закрываем текущий popup
            map.closePopup(e.popup);

            setTimeout(() => {
                alert("Ваша інформація надіслана адміністратору системи.\nПісля її перевірки вона буде розміщена на карті.");
            }, 200);

        }
    });
});

// ============================================
// НОВЫЙ БЛОК: ПОСТРОЕНИЕ МАРШРУТА
// ============================================

let routeLayer = L.layerGroup().addTo(map);
let routePoints = [];
let routeMode = false;
let graphData = null;

// Загрузка графа из WFS
async function loadRouteGraph() {
    if (graphData) return graphData;

    const url = 'http://46.98.11.253:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:mbf_a11y_route2&outputFormat=application/json';

    try {
        const response = await fetch(url);
        const data = await response.json();

        const graph = {};





        // В функции loadRouteGraph(), внутри data.features.forEach:
        data.features.forEach(feature => {
            const coords = feature.geometry.coordinates;
            const accessible = feature.properties.accessible === true || feature.properties.accessible === 'true';

            for (let i = 0; i < coords.length - 1; i++) {
                const fromKey = coords[i][0] + ',' + coords[i][1];
                const toKey = coords[i + 1][0] + ',' + coords[i + 1][1];
                const segmentKey = fromKey + '->' + toKey; // ключ для сегмента

                if (!graph[fromKey]) {
                    graph[fromKey] = {
                        lat: coords[i][1],
                        lng: coords[i][0],
                        neighbors: [],
                        segments: {} // храним статусы сегментов
                    };
                }
                if (!graph[toKey]) {
                    graph[toKey] = {
                        lat: coords[i + 1][1],
                        lng: coords[i + 1][0],
                        neighbors: [],
                        segments: {}
                    };
                }

                // Сохраняем статус для сегмента в обоих направлениях
                graph[fromKey].segments[toKey] = accessible;
                graph[toKey].segments[fromKey] = accessible;

                if (!graph[fromKey].neighbors.includes(toKey)) {
                    graph[fromKey].neighbors.push(toKey);
                }
                if (!graph[toKey].neighbors.includes(fromKey)) {
                    graph[toKey].neighbors.push(fromKey);
                }
            }
        });






        graphData = graph;
        console.log('Graph loaded:', Object.keys(graph).length, 'nodes');
        return graph;
    } catch (error) {
        console.error('Error loading graph:', error);
        alert('Не вдалося завантажити дані маршруту');
        return null;
    }
}

// Поиск ближайшего узла
function findNearestNode(lat, lng) {
    if (!graphData) return null;

    let minDist = Infinity;
    let nearest = null;

    for (const [id, node] of Object.entries(graphData)) {
        const d = (node.lat - lat) ** 2 + (node.lng - lng) ** 2;
        if (d < minDist) {
            minDist = d;
            nearest = id;
        }
    }

    return nearest;
}

// BFS поиск пути
function findPath(startId, endId) {
    if (!graphData[startId] || !graphData[endId]) return null;

    const queue = [startId];
    const visited = new Set([startId]);
    const parent = { [startId]: null };

    while (queue.length > 0) {
        const current = queue.shift();

        if (current === endId) {
            const path = [];
            let node = endId;
            while (node) {
                path.unshift(node);
                node = parent[node];
            }
            return path;
        }

        for (const neighbor of graphData[current].neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent[neighbor] = current;
                queue.push(neighbor);
            }
        }
    }

    return null;
}







function drawRoute(path) {
    routeLayer.clearLayers();

    if (!path || path.length < 2) {
        alert('Маршрут не знайдено');
        return;
    }

    const segments = [];
    for (let i = 0; i < path.length - 1; i++) {
        const fromId = path[i];
        const toId = path[i + 1];
        const from = graphData[fromId];
        const to = graphData[toId];

        // Берем статус из сохраненных сегментов
        const isAccessible = from.segments && from.segments[toId] === true;
        const color = isAccessible ? '#00cc44' : '#ff4444';

        segments.push({
            from: [from.lat, from.lng],
            to: [to.lat, to.lng],
            color: color
        });
    }

    segments.forEach(seg => {
        L.polyline([seg.from, seg.to], {
            color: seg.color,
            weight: 5,
            opacity: 0.8
        }).addTo(routeLayer);
    });

    // Маркеры A и B
    const startId = path[0];
    const endId = path[path.length - 1];
    const start = graphData[startId];
    const end = graphData[endId];

    if (start && end) {
        L.marker([start.lat, start.lng], {
            icon: L.divIcon({
                className: 'route-marker',
                html: 'A',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        }).addTo(routeLayer);

        L.marker([end.lat, end.lng], {
            icon: L.divIcon({
                className: 'route-marker',
                html: 'B',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        }).addTo(routeLayer);
    }
}






function routeClickHandler(e) {
    if (!routeMode) return;

    // Отключаем обработчик кликов для объектов безбарьерности
    if (wfsClickHandler) {
        map.off('click', wfsClickHandler);
    }

    loadRouteGraph().then(graph => {
        if (!graph) {
            routeMode = false;
            document.getElementById('routeBtn')?.classList.remove('active');
            map.getContainer().style.cursor = '';
            // Включаем обработчик обратно при ошибке
            if (wfsClickHandler) {
                map.on('click', wfsClickHandler);
            }
            return;
        }

        const nodeId = findNearestNode(e.latlng.lat, e.latlng.lng);
        if (!nodeId) {
            alert('Не вдалося знайти найближчий вузол');
            // Включаем обработчик обратно при ошибке
            if (wfsClickHandler) {
                map.on('click', wfsClickHandler);
            }
            return;
        }

        routePoints.push(nodeId);

        // Визуальная отметка
        const marker = L.circleMarker([graphData[nodeId].lat, graphData[nodeId].lng], {
            radius: 8,
            color: routePoints.length === 1 ? '#00ff00' : '#ff0000',
            fillColor: routePoints.length === 1 ? '#00ff00' : '#ff0000',
            fillOpacity: 0.7
        }).addTo(routeLayer);

        if (routePoints.length === 2) {
            const path = findPath(routePoints[0], routePoints[1]);
            drawRoute(path);

            routePoints = [];
            routeMode = false;
            document.getElementById('routeBtn')?.classList.remove('active');
            map.getContainer().style.cursor = '';
            map.off('click', routeClickHandler);

            // Включаем обработчик объектов после завершения маршрута
            if (wfsClickHandler) {
                map.on('click', wfsClickHandler);
            }
        } else {
            // Ждем вторую точку
            map.getContainer().style.cursor = 'crosshair';
        }
    });
}








// Обработчик кнопки маршрута
document.getElementById('routeBtn')?.addEventListener('click', function() {
    if (!routeMode) {
        // Включаем режим
        routeMode = true;
        routePoints = [];
        routeLayer.clearLayers();
        this.classList.add('active');
        map.getContainer().style.cursor = 'crosshair';
        map.on('click', routeClickHandler);
        
        // Отключаем обработчик объектов безбарьерности
        if (wfsClickHandler) {
            map.off('click', wfsClickHandler);
        }
    } else {
        // Выключаем режим
        routeMode = false;
        routePoints = [];
        routeLayer.clearLayers();
        this.classList.remove('active');
        map.getContainer().style.cursor = '';
        map.off('click', routeClickHandler);
        
        // Включаем обработчик объектов обратно
        if (wfsClickHandler) {
            map.on('click', wfsClickHandler);
        }
    }
});
