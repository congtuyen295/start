import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { TextField } from "@mui/material";
import "./style.scss";

const minDistance = 0;

export default function FilterPrice({ values }) {
  // const [price, setPrice] = React.useState([0, 1000000]);
  const formatter = new Intl.NumberFormat("vn");

  const { price, setPrice } = values;

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice(()=>[Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice(()=>[price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  return (
    <>
      <Box sx={{ width: 280 }}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={price}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          disableSwap
          min={0}
          max={100000000}
        />
      </Box>
      <div className="row">
        <div className="col c-6">
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            value={`${formatter.format(price[0])}₫`}
            variant="filled"
            size="small"
            disabled
          />
        </div>
        <div className="col c-6">
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            value={`${formatter.format(price[1])}₫`}
            variant="filled"
            size="small"
            disabled
          />
        </div>
      </div>
    </>
  );
}
