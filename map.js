
window._tst11__pin_click = false;

function disablePinMode() {
    console.log('1');
    if (!window._tst11__pin_click) {
        return;
    }
    console.log('2');

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

const map = L.map('map', {
    zoomControl: false // Hide native zoom
}).setView([48.459898, 35.057008], 16);

// Подложка
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '© OpenStreetMap'
}).addTo(map);

// WMS слои
const wmsLayer1 = L.tileLayer.wms('http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/wms', {
    layers: 'Dnepr:Будівлі',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}); //.addTo(map);

const wmsLayer2 = L.tileLayer.wms('http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/wms', {
    layers: 'Dnepr:Заклади громадського харчування',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer3 = L.tileLayer.wms('http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/wms', {
    layers: 'Dnepr:Заклади охорони здоровя',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer4 = L.tileLayer.wms('http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/wms', {
    layers: 'Dnepr:Фармацевтичні заклади',
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

sidebarBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Сначала снимаем активность со всех кнопок
        sidebarBtns.forEach(b => b.classList.remove('active'));
        // Затем активируем текущую кнопку
        btn.classList.add('active');

        if (btn === folderBtn) {
            folderPopup.classList.add('active');

            settingsPopup.style.display = 'none';

            // Выключаем PIN режим
            disablePinMode();

            // Получаем текущие стили customControls для определения отступа справа и сверху
            const currentRight = parseInt(window.getComputedStyle(customControls).right);
            const currentTop = parseInt(window.getComputedStyle(customControls).top);
            const customControlsWidth = customControls.offsetWidth; // Ширина блока кнопок

            // Устанавливаем позицию folderPopup так, чтобы он был слева от customControls
            // Отступ от правого края: (текущий right customControls) + (ширина customControls) + (желаемый отступ, например, 32px)
            const desiredGap = 32;
            folderPopup.style.right = `${currentRight + customControlsWidth + desiredGap}px`;
            folderPopup.style.top = `${currentTop}px`;

        }

        else if (btn === btnPin) {
            window._tst11__pin_click = true;

            folderPopup.classList.remove('active');
            settingsPopup.style.display = 'none';

            // Устанавливаем курсор
            map.getContainer().style.cursor = "crosshair";

            // Устанавливаем обработчик клика по карте
            wfsClickHandler = function(e) {
                const bboxSize = 0.0005;
                const bbox = [
                    e.latlng.lng - bboxSize,
                    e.latlng.lat - bboxSize,
                    e.latlng.lng + bboxSize,
                    e.latlng.lat + bboxSize
                ].join(',');


                const urls = [
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:Заклади охорони здоровя&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:Фармацевтичні заклади&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`
                ];

                let highlightLayer;

                function tryFetch(index) {
                    if (index >= urls.length) {
                        L.popup()
                            .setLatLng(e.latlng)
                            .setContent('Нет объектов в месте клика.')
                            .openOn(map);
                        return;
                    }

                    fetch(urls[index])
                        .then(res => res.json())
                        .then(data => {
                            if (data.features && data.features.length > 0) {
                                if (highlightLayer) {
                                    map.removeLayer(highlightLayer);
                                }

                                highlightLayer = L.geoJSON(data, {
                                    pointToLayer: function (feature, latlng) {
                                        return L.circleMarker(latlng, {
                                            radius: 6,
                                            fillColor: "#66ff7aff",
                                            color: "#43ee3dff",
                                            weight: 2,
                                            opacity: 1,
                                            fillOpacity: 0.5
                                        });
                                    },
                                    style: {
                                        color: '#43ee3dff',
                                        weight: 2,
                                        fillColor: '#66ff7aff',
                                        fillOpacity: 0.4
                                    }
                                }).addTo(map);
                                const props = data.features[0].properties;
                                const content = Object.entries(props)
                                    .map(([k, v]) => `<b>${k}</b>: ${v ?? ''}`)
                                    .join('<br>');

                                L.popup()
                                    .setLatLng(e.latlng)
                                    .setContent(content)
                                    .openOn(map);
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

        }

        else if (btn === btnSettings) {
            folderPopup.classList.remove('active');
            disablePinMode();

            settingsPopup.style.display = 'block';
        }

        else {
            // Если нажата другая кнопка, скрываем folderPopup
            folderPopup.classList.remove('active');
            settingsPopup.style.display = 'none';

            // Выключаем PIN режим
            disablePinMode();

        }
    });
    btn.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            btn.click();
            e.preventDefault();
        }
    });
});

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

const overlays = {
    "Будівлі": wmsLayer1,
    "Заклади охорони здоровя": wmsLayer3,
    "Фармацевтичні заклади": wmsLayer4,
    "Заклади громадського харчування": wmsLayer2
};

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
                // После изменения слоя, пересоздаем контрол, чтобы обновить состояние чекбоксов/радио
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
        for (let layerName in overlays) {
            count++;
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'leaflet-overlay';
            input.id = 'overlay-' + count;
            input.checked = map.hasLayer(overlays[layerName]);
            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.appendChild(document.createTextNode(layerName));
            overlayDiv.appendChild(input);
            overlayDiv.appendChild(label);

            input.onchange = function () {
                if (input.checked) {
                    overlays[layerName].addTo(map);
                } else {
                    map.removeLayer(overlays[layerName]);
                }
                // После изменения слоя, пересоздаем контрол, чтобы обновить состояние чекбоксов
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
        // attributionControl.remove(); // Удаляем элемент
        // Если вы хотите только скрыть, используйте:
        attributionControl.style.display = 'none';
    }
});
