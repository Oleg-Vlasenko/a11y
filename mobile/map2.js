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
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_admin_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_admin_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_education_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_education_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_health_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_health_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_residential_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_residential_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_other_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_build_other_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_street_network_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_street_network_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_transport_stops_ok&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_transport_stops_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`,
        `http://inetzp.cloud-ip.biz:8080/geoserver/Dnepr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dnepr:gms_park_public_bad&outputFormat=application/json&srsName=EPSG:4326&bbox=${bbox},EPSG:4326`
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

                    if (featureId == 'gms_build_admin_bad.1') {
                        imgFile = 'gms_build_admin_bad_1.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_admin_bad.2') {
                        imgFile = 'gms_build_admin_bad_2.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_admin_bad.3') {
                        imgFile = 'gms_build_admin_bad_3.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_admin_bad.4') {
                        imgFile = 'gms_build_admin_bad_4.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_admin_bad.5') {
                        imgFile = 'gms_build_admin_bad_5.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_admin_ok.1') {
                        imgFile = 'gms_build_admin_ok_1.png';
                        objType = 'Адміністративні будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_education_ok.1') {
                        imgFile = 'gms_build_education_ok_1.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_education_bad.1') {
                        imgFile = 'gms_build_education_bad_1.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_education_bad.2') {
                        imgFile = 'gms_build_education_bad_2.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();
                        // contentData = 'Необхідно впорядкувати вхідну групу, облаштувати пандус, встановити тактильну плитку та обладнати вбиральні відповідно до нормативів.';

                    } else if (featureId == 'gms_build_education_bad.3') {
                        imgFile = 'gms_build_education_bad_3.png';
                        objType = 'Заклади освіти';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_ok.1') {
                        imgFile = 'gms_build_health_ok_1.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_ok.2') {
                        imgFile = 'gms_build_health_ok_2.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_ok.3') {
                        imgFile = 'gms_build_health_ok_3.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_ok.4') {
                        imgFile = 'gms_build_health_ok_4.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_ok.5') {
                        imgFile = 'gms_build_health_ok_5.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_ok.6') {
                        imgFile = 'gms_build_health_ok_6.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.1') {
                        imgFile = 'gms_build_health_bad_1.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.2') {
                        imgFile = 'gms_build_health_bad_2.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.3') {
                        imgFile = 'gms_build_health_bad_3.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.4') {
                        imgFile = 'gms_build_health_bad_4.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.5') {
                        imgFile = 'gms_build_health_bad_5.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.6') {
                        imgFile = 'gms_build_health_bad_6.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_health_bad.7') {
                        imgFile = 'gms_build_health_bad_7.png';
                        objType = 'Установи охорони здоров`я';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_ok.1') {
                        imgFile = 'gms_build_residential_ok_1.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.1') {
                        imgFile = 'gms_build_residential_bad_1.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.2') {
                        imgFile = 'gms_build_residential_bad_2.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.3') {
                        imgFile = 'gms_build_residential_bad_3.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.4') {
                        imgFile = 'gms_build_residential_bad_4.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.5') {
                        imgFile = 'gms_build_residential_bad_5.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.6') {
                        imgFile = 'gms_build_residential_bad_6.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.7') {
                        imgFile = 'gms_build_residential_bad_7.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_residential_bad.8') {
                        imgFile = 'gms_build_residential_bad_8.png';
                        objType = 'Багатоквартирні будинки';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_ok.1') {
                        imgFile = 'gms_build_other_ok_1.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_ok.2') {
                        imgFile = 'gms_build_other_ok_2.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_ok.3') {
                        imgFile = 'gms_build_other_ok_3.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_ok.4') {
                        imgFile = 'gms_build_other_ok_4.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_ok.5') {
                        imgFile = 'gms_build_other_ok_5.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.1') {
                        imgFile = 'gms_build_other_bad_1.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.2') {
                        imgFile = 'gms_build_other_bad_2.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        // objData = 'Кав`ярня "Чіп і Дейл"';
                        contentData = (props['descr'] || '').trim();
                        // contentData = 'Рекомендовано змінити вхідну групу, влаштувати нормативні сходи з поручнями, встановити підйомник, прибрати інформаційний шум та замінити дверні прорізи.';

                    } else if (featureId == 'gms_build_other_bad.3') {
                        imgFile = 'gms_build_other_bad_3.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (['gms_build_other_bad.4',
                        'gms_build_other_bad.5',
                        'gms_build_other_bad.6'].includes(featureId)) {
                        imgFile = 'gms_build_other_bad_4.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.7') {
                        imgFile = 'gms_build_other_bad_7.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.8') {
                        imgFile = 'gms_build_other_bad_8.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.9') {
                        imgFile = 'gms_build_other_bad_9.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.10') {
                        imgFile = 'gms_build_other_bad_10.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.11') {
                        imgFile = 'gms_build_other_bad_11.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.12') {
                        imgFile = 'gms_build_other_bad_12.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_build_other_bad.13') {
                        imgFile = 'gms_build_other_bad_13.png';
                        objType = 'Інші будівлі';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_street_network_ok.1') {
                        imgFile = 'gms_street_network_ok_1.png';
                        objType = 'Вулично-дорожня мережа';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_street_network_ok.2' || featureId == 'gms_street_network_ok.3') {

                        imgFile = 'gms_street_network_ok_2.png';
                        objType = 'Вулично-дорожня мережа';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_street_network_ok.4') {
                        imgFile = 'gms_street_network_ok_4.png';
                        objType = 'Вулично-дорожня мережа';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();


                    } else if (featureId.startsWith('gms_street_network_bad.')) {
                        let num = parseInt(featureId.split('.')[1], 10);

                        if (num >= 1 && num <= 8) {
                            imgFile = 'gms_street_network_bad_1.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();

                        } else if (num >= 9 && num <= 11) {
                            imgFile = 'gms_street_network_bad_2.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();

                        } else if (num >= 12 && num <= 16) {
                            imgFile = 'gms_street_network_bad_3.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();

                        } else if (num >= 17 && num <= 28) {
                            imgFile = 'gms_street_network_bad_4.png';
                            objType = 'Вулично-дорожня мережа';
                            objData = (props['name'] || '').trim();
                            contentData = (props['descr'] || '').trim();
                        }


                    } else if (featureId == 'gms_transport_stops_ok.1') {
                        imgFile = 'gms_street_network_ok_2.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_transport_stops_bad.1') {
                        imgFile = 'gms_transport_stops_bad_1.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_transport_stops_bad.2') {
                        imgFile = 'gms_transport_stops_bad_2.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_transport_stops_ok.2') {
                        imgFile = 'gms_transport_stops_ok_2.png';
                        objType = 'Зупинки громадського транспорту';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_park_public_bad.1') {
                        imgFile = 'gms_park_public_bad_1.png';
                        objType = 'Парки та сквери';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();

                    } else if (featureId == 'gms_park_public_bad.2') {
                        imgFile = 'gms_park_public_bad_2.png';
                        objType = 'Парки та сквери';
                        objData = (props['name'] || '').trim();
                        contentData = (props['descr'] || '').trim();


                    } else {
                        imgFile = 'base_dnipro.png';
                        objType = 'Об`єкт';
                        objData = 'Дані у стані заповнення...';
                        contentData = 'Дані у стані заповнення...';
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

