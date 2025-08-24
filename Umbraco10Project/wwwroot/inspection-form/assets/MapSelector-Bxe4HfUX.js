import { r as reactExports, j as jsxRuntimeExports } from "./index-nbqgCPN1.js";
import { M as Map, a as Marker } from "./exports-mapbox-CaNunxlW.js";
import { C as Controller } from "./index.esm-B-jqFwBf.js";
const MapSelector = ({
  formField,
  control
}) => {
  const [viewport, setViewport] = reactExports.useState({
    // riyadh sa
    latitude: 24.7136,
    longitude: 46.6753,
    // max zoom level for saudi arabia
    zoom: 8
  });
  const memoizedFormField = reactExports.useMemo(() => formField, [formField]);
  const renderFilePond = ({
    field
  }) => {
    const handleMapClick = (event) => {
      const { lngLat } = event;
      const lngLatString = `${lngLat.lng},${lngLat.lat}`;
      field.onChange(lngLatString);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-primary rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Map,
        {
          ...viewport,
          ref: field.ref,
          mapStyle: "https://rei-api.rega.gov.sa/get-map-style",
          mapboxAccessToken: "pk.eyJ1IjoiYWhhc2hpbTMwIiwiYSI6ImNtMnVhcTFrZTAwOGoya3F0MGFqbmd0dWIifQ.FUSY5EMmczUKNvEu98MeGQ",
          onMove: (evt) => setViewport(evt.viewState),
          onClick: handleMapClick,
          maxBounds: [
            [32.496044, 14.347891],
            // Buffered Southwest coordinates
            [57.666659, 34.161932]
            // Buffered Northeast coordinates
          ],
          style: {
            width: "100%",
            height: "500px",
            borderRadius: 5
          },
          children: field.value && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Marker,
            {
              longitude: field.value.split(",")[0],
              latitude: field.value.split(",")[1],
              anchor: "bottom",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "red", fontSize: "24px" }, children: "📍" })
            }
          )
        }
      ) }),
      field.value && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => field.onChange(""),
          className: "btn btn-danger mt-2",
          children: "مسح الخانة"
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Controller,
    {
      name: memoizedFormField.id,
      control,
      rules: {
        required: {
          value: memoizedFormField.required,
          message: memoizedFormField.arLabel + " خانة مطلوبة"
        },
        shouldUnregister: true
      },
      render: renderFilePond
    }
  );
};
export {
  MapSelector as default
};
