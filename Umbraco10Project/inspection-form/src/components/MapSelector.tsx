import { useMemo, useState } from "react";
import ReactMapGL, {
  MapLayerMouseEvent,
  Marker,
  ViewState,
} from "react-map-gl";
import { Field2 } from "../pages/create-request/InspectionModel.tsx";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

const MapSelector = ({
  formField,
  control,
}: {
  formField: Field2;
  control: any;
}) => {
  const [viewport, setViewport] = useState<Partial<ViewState>>({
    // riyadh sa
    latitude: 24.7136,
    longitude: 46.6753,
    // max zoom level for saudi arabia

    zoom: 8,
  });

  const memoizedFormField = useMemo(() => formField, [formField]);

  const renderFilePond = ({
    field,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
  }) => {
    const handleMapClick = (event: MapLayerMouseEvent) => {
      const { lngLat } = event;
      const lngLatString = `${lngLat.lng},${lngLat.lat}`;
      field.onChange(lngLatString);
    };
    return (
      <>
        <div className={"border border-primary rounded"}>
          <ReactMapGL
            {...viewport}
            ref={field.ref}
            mapStyle="https://rei-api.rega.gov.sa/get-map-style"
            mapboxAccessToken="pk.eyJ1IjoiYWhhc2hpbTMwIiwiYSI6ImNtMnVhcTFrZTAwOGoya3F0MGFqbmd0dWIifQ.FUSY5EMmczUKNvEu98MeGQ"
            onMove={(evt) => setViewport(evt.viewState)}
            onClick={handleMapClick}
            maxBounds={[
              [32.496044, 14.347891], // Buffered Southwest coordinates
              [57.666659, 34.161932], // Buffered Northeast coordinates
            ]}
            style={{
              width: "100%",
              height: "500px",
              borderRadius: 5,
            }}
          >
            {field.value && (
              <Marker
                longitude={field.value.split(",")[0]}
                latitude={field.value.split(",")[1]}
                anchor="bottom"
              >
                <div style={{ color: "red", fontSize: "24px" }}>📍</div>
              </Marker>
            )}
          </ReactMapGL>
        </div>
        {field.value && (
          <button
            onClick={() => field.onChange("")}
            className={"btn btn-danger mt-2"}
          >
            مسح الخانة
          </button>
        )}
      </>
    );
  };
  return (
    <Controller
      name={memoizedFormField.id}
      control={control}
      rules={{
        required: {
          value: memoizedFormField.required,
          message: memoizedFormField.arLabel + " خانة مطلوبة",
        },
        shouldUnregister: true,
      }}
      render={renderFilePond}
    />
  );
};

export default MapSelector;
