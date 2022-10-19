import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertClose } from "../redux/alertStore";

export const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((store: any) => store.alert);

  const handleCloseAlert = () => {
    dispatch(alertClose());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!alert.textAlert}
      onClose={handleCloseAlert}
      message={alert.textAlert}
      key={"topright"}
      autoHideDuration={5000}
      action={
        <React.Fragment>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleCloseAlert}
          >
            <Close />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};
