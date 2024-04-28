import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ min, max, onChange, onLabelChange,step }) {
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (event, newValue) => {
    const adjustedValue = newValue.map((val) => (val === max ? null : val));
    setValue(adjustedValue);

    if (onChange) {
      onChange(adjustedValue);
    }

    if (onLabelChange) {
      onLabelChange(adjustedValue.map((val) => (val === null ? max : val)));
    }
  };

  const formatLabel = (value) => {
    return value === null ? `${max}` : `${value}`;
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value.map((val) => (val === null ? max : val))}
        onChangeCommitted={handleChange}
        min={min}
        step={step}
        max={max}
        valueLabelDisplay="auto"
        valueLabelFormat={formatLabel}
        style={{ width: "97%" }}
      />
    </Box>
  );
}
