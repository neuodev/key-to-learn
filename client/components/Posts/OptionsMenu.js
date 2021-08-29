import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const OptionsMenu = ({ label, options, currentOption, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const select = (option) => {
    setAnchorEl(null);
    onChange(option);
  };
  return (
    <div className="w-full bg-gray-200 px-4 py-1 flex justify-center items-center rounded-md shadow-sm">
      <label className="text-lg font-medium mr-4">{label}</label>
      <Button
        fullWidth
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {currentOption}
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((i) => (
          <MenuItem onClick={() => select(i)} key={i}>
            {i}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OptionsMenu;
