import {
  Box,
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
      sx={{ minWidth: 1 }}
    >
      <DialogTitle id="customized-dialog-title">Удалить показания</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ minWidth: { sm: 1, md: 400 }, padding: "12px 0px" }}>
          Вы точно хотите удалить?
        </Box>
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
