
window._tst11__pin_click = false;

function disablePinMode() {
    if (!window._tst11__pin_click) {
        return;
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

    // Закрываем все попапы
    map.closePopup();
}
const map = L.map('map', {
    zoomControl: false // Hide native zoom
}).setView([48.4503, 34.9803], 18);

// Подложка
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '© OpenStreetMap'
}).addTo(map);

// WMS слой
const wmsLayer = L.tileLayer.wms('http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/wms', {
    layers: 'Dnepr:Будівлі',
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
            wfsClickHandler = function (e) {
                const bboxSize = 0.00005;
                const bbox = [
                    e.latlng.lng - bboxSize,
                    e.latlng.lat - bboxSize,
                    e.latlng.lng + bboxSize,
                    e.latlng.lat + bboxSize
                ].join(',');

                const wfsUrl = `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:Будівлі&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`;

                fetch(wfsUrl)
                    .then(res => res.json())
                    .then(data => {
                        if (highlightLayer) {
                            map.removeLayer(highlightLayer);
                        }
                        if (data.features && data.features.length > 0) {
                            highlightLayer = L.geoJSON(data, {
                                style: {
                                    color: '#FF0000',
                                    weight: 2,
                                    fillColor: '#FF6666',
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
                            L.popup()
                                .setLatLng(e.latlng)
                                .setContent('Нет объектов в месте клика.')
                                .openOn(map);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        L.popup()
                            .setLatLng(e.latlng)
                            .setContent('Ошибка загрузки данных.')
                            .openOn(map);
                    });
            };

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
    "WMS Будівлі": wmsLayer
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
