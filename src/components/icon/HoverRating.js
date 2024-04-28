import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "0.5 Sao",
  1: "1 Sao",
  1.5: "1.5 Sao",
  2: "2 Sao",
  2.5: "2.5 Sao",
  3: "3 Sao",
  3.5: "3.5 Sao",
  4: "4 Sao",
  4.5: "4.5 Sao",
  5: "5 Sao",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ rating, initial }) {
  const [value, setValue] = React.useState(initial);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
        color: "#ffff00",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          rating(newValue);
        }}
        style={{ color: "#ffea00" }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}
