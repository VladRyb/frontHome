import React from "react";
import {
  createStyles,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import CloseIcon from "@material-ui/icons/Close";

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiPaper-root": {
        background: "#a9a9a933",
        color: "white",
      },
    },
  })
);

export const Alert = ({ textAlert, handleCloseAlert }: any) => {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      classes={classes}
      open={textAlert}
      // onClose={handleCloseAlert}
      message={textAlert}
      key={"topright"}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
      action={
        <React.Fragment>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleCloseAlert}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};
