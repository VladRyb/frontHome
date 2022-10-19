import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface Props {
  handleClose: () => void;
  handleDelete: () => void;
  open: boolean;
}

const ModalDelete = React.memo(({ handleClose, open, handleDelete }: Props) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      style={{ minWidth: 400 }}
    >
      <DialogTitle id="customized-dialog-title">Удалить показания</DialogTitle>
      <DialogContent dividers>
        <div style={{ minWidth: 400, padding: "12px 0px" }}>
          Вы точно хотите удалить?
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error" variant="contained">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ModalDelete;
