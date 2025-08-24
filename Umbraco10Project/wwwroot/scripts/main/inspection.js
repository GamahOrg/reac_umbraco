const inspectionData = window.inspectionModel;
const BASE_URL = window.BASE_URL;

const maxRetries = 10;
let retries = 0;

function loadScript() {
    const script = document.createElement('script');
    script.src = `/inspection-form/${inspectionData.JsFile}`;
    script.type = 'module';

    script.onerror = function() {
        if (retries < maxRetries) {
            retries++;
            loadScript();
        }
    };

    document.body.appendChild(script);
}

loadScript();
