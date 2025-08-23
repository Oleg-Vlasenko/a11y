
window._tst11__pin_click = false;
window._tst11__marker = false;
window._tst11__send_info = false;

function disablePinMode() {

    if (!window._tst11__pin_click) {
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

const map = L.map('map', {
    zoomControl: false // Hide native zoom
}).setView([48.459898, 35.057008], 16);

// Подложка
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '© OpenStreetMap'
}).addTo(map);

const geoServerUrl = 'http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/wms';

// WMS слои
const wmsLayer1 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:Будівлі',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}); //.addTo(map);

const wmsLayer21 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mindev_build_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer22 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mindev_build_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer3 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:Заклади громадського харчування',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
});

const wmsLayer4 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:Заклади охорони здоровя',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer5 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:Фармацевтичні заклади',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer61 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mindev_streets_bad',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer62 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mindev_streets_ok',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);


const wmsLayer7 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:mindev_stops_bads',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer81 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:line_traley',
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer Dnepr'
}).addTo(map);

const wmsLayer82 = L.tileLayer.wms(geoServerUrl, {
    layers: 'Dnepr:line_tramvay',
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
            wfsClickHandler = function (e) {
                const bboxSize = 0.0002;
                const bbox = [
                    e.latlng.lng - bboxSize,
                    e.latlng.lat - bboxSize,
                    e.latlng.lng + bboxSize,
                    e.latlng.lat + bboxSize
                ].join(',');


                const urls = [
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mindev_build_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mindev_build_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mindev_streets_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mindev_streets_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mindev_stops_bads&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:Заклади охорони здоровя&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
                    `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:Фармацевтичні заклади&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`
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
                                console.log('featureId:');
                                console.log(featureId);
                                
                                let imgFile;
                                let objType;
                                let objData;

                                if (featureId == 'mindev_build_ok.1') {
                                    imgFile = 'obj1.png';
                                    objType = 'Школа';
                                    objData = 'Средняя школа № 23, Соборна площа, 14';
                                    
                                } else if (featureId == 'mindev_build_bad.1') {
                                    imgFile = 'obj9.png';
                                    objType = 'Будівля';
                                    objData = 'Житловий будинок, вул. Яворницького, 14';

                                } else if (featureId == 'mindev_build_bad.2') {
                                    imgFile = 'obj2.png';
                                    objType = 'Будівля';
                                    objData = 'Житловий будинок, Соборна площа, 7-А';
                                    
                                } else if (featureId == 'mindev_build_bad.3') {
                                    imgFile = 'obj3.png';
                                    objType = 'Будівля';
                                    objData = 'Житловий будинок, Соборна площа, 6';
                                    
                                } else if (featureId == 'mindev_build_bad.4') {
                                    imgFile = 'obj7.png';
                                    objType = 'Будівля';
                                    objData = 'Житловий будинок, Соборна площа, 20';
                                    
                                } else if (featureId == 'mindev_streets_ok.8') {
                                    imgFile = 'obj4.png';
                                    objType = 'Вуличний об`єкт';
                                    objData = 'Дані у стані заповнення...';

                                } else if (featureId == 'mindev_streets_bad.4') {
                                    imgFile = 'obj5.png';
                                    objType = 'Вуличний об`єкт';
                                    objData = 'Дані у стані заповнення...';

                                } else if (featureId == 'mindev_streets_bad.5') {
                                    imgFile = 'obj6.png';
                                    objType = 'Вуличний об`єкт';
                                    objData = 'Дані у стані заповнення...';

                                } else if (featureId == 'mindev_streets_ok.10') {
                                    imgFile = 'obj8.png';
                                    objType = 'Вуличний об`єкт';
                                    objData = 'Бульвар Яворницького. Безбар`єрний простір для прогулянок і відпочинку';

                                } else if (featureId == 'mindev_stops_bads.4') {
                                    imgFile = 'obj10.png';
                                    objType = 'Зупинка транспорту';
                                    objData = 'Зупинка трамваю';

                                } else if (featureId == 'mindev_stops_bads.3') {
                                    imgFile = 'obj11.png';
                                    objType = 'Зупинка транспорту';
                                    objData = 'Зупинка тролейбуса';

                                } else if (featureId == 'mindev_stops_bads.2') {
                                    imgFile = 'obj12.png';
                                    objType = 'Зупинка транспорту';
                                    objData = 'Зупинка трамваю';

                                } else if (featureId == 'mindev_streets_bad.3') {
                                    imgFile = 'obj14.png';
                                    objType = 'Вуличний об`єкт';
                                    objData = 'Територія скверу';

                                } else if (featureId.startsWith('mindev_build')) {
                                    imgFile = 'base_build.png';
                                    objType = 'Будівля';

                                } else if (featureId.startsWith('mindev_streets')) {
                                    imgFile = 'base_street.png';
                                    objType = 'Вуличний об`єкт';
                                    objData = 'Дані у стані заповнення...';

                                } else if (featureId.startsWith('mindev_stops')) {
                                    imgFile = 'base_stop.png';
                                    objType = 'Зупинка транспорту';
                                    objData = 'Дані у стані заповнення...';

                                } else {
                                    imgFile = 'base_dnipro.png';
                                    objType = 'Об`єкт';
                                    objData = 'Дані у стані заповнення...';
                                }

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
                                }, 10);

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

// Создаем группу слоев для домов
const housesGroup1 = L.layerGroup([wmsLayer21, wmsLayer22]);
const housesGroup2 = L.layerGroup([wmsLayer61, wmsLayer62]);
const housesGroup3 = L.layerGroup([wmsLayer81, wmsLayer82]);

const overlays = {
    "Безбар'єрність: Будівлі": housesGroup1,
    "Безбар'єрність: Вулиці": housesGroup2,
    "Безбар'єрність: Зупинки": wmsLayer7,
    "Будівлі": wmsLayer1,
    "Електротранспорт": housesGroup3,
    "Заклади охорони здоровя": wmsLayer4,
    "Фармацевтичні заклади": wmsLayer5,
    "Заклади громадського харчування": wmsLayer3
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
            label.appendChild(document.createTextNode(layerName));
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
        // attributionControl.remove(); // Удаляем элемент
        // Если вы хотите только скрыть, используйте:
        attributionControl.style.display = 'none';
    }
});

// После инициализации карты
const mapContainer = map.getContainer();
const titleDiv = document.createElement('div');
titleDiv.className = 'leaflet-map-title';
titleDiv.innerHTML = 'Мапа безбар\'єрності';
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
    color: #0aa10aff;
    text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
    pointer-events: none;
`;
mapContainer.appendChild(titleDiv);

map.on('popupopen', function (e) {
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

            fetch("php/bid.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "message=" + encodeURIComponent(text)
            })
                .then(response => response.text())   // читаем ответ как текст
                .then(data => console.log("Ответ PHP:", data))  // выводим в консоль
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
