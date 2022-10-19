import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { helperText, titlePrice } from "../../../helpers/options";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  handleClose: () => void;
  open: boolean;
  typeModal: "create" | "edit";
  onSubmit: (value: FormikTypeShema) => void;
  initState: FormikTypeShema;
}

const validationSchema = yup.object({
  date: yup.date().required(helperText.required),
  hot: yup.string().trim().required(helperText.required),
  cold: yup.string().trim().required(helperText.required),
  electricity: yup.string().trim().required(helperText.required),
});

type FormikTypeShema = yup.InferType<typeof validationSchema>;

const ModalData = React.memo(
  ({ handleClose, open, typeModal, onSubmit, initState }: Props) => {
    const formik = useFormik({
      initialValues: {
        date: new Date(),
        hot: "",
        cold: "",
        electricity: "",
      },
      validationSchema,
      onSubmit: onSubmit,
    });

    useEffect(() => {
      if (typeModal === "edit") {
        formik.setValues(initState);
      }
    }, [typeModal]);

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
          {typeModal === "create" ? (
            <>Добавить новые показания</>
          ) : (
            <>Редактировать показаний</>
          )}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogContent dividers>
            <div className="modal_body">
              <DesktopDatePicker
                openTo="month"
                views={["year", "month"]}
                label="Месяц и год"
                onChange={(date) => {
                  formik.setValues({
                    ...formik.values,
                    date: new Date(date?.toISOString() || ""),
                  });
                }}
                value={formik.values.date}
                renderInput={(props: any) => {
                  props = {
                    ...props,
                    inputProps: {
                      ...props.inputProps,
                      placeholder: "дд.мм.гггг",
                    },
                  };

                  return (
                    <TextField
                      {...props}
                      sx={{ height: 78 }}
                      required
                      label="Месяц и год"
                      type="date"
                      name="date"
                      fullWidth
                      variant="outlined"
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={
                        (formik.touched.date && formik.errors.date) || " "
                      }
                    />
                  );
                }}
              />
              <TextField
                label={titlePrice[1].title}
                required
                type={"number"}
                variant="outlined"
                name="hot"
                value={formik.values?.hot}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched?.hot && Boolean(formik.errors?.hot)}
                helperText={(formik.touched?.hot && formik.errors?.hot) || " "}
              />
              <TextField
                required
                type={"number"}
                variant="outlined"
                label={titlePrice[2].title}
                name="cold"
                value={formik.values?.cold}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched?.cold && Boolean(formik.errors?.cold)}
                helperText={
                  (formik.touched?.cold && formik.errors?.cold) || " "
                }
              />
              <TextField
                required
                type={"number"}
                label={titlePrice[4].title}
                variant="outlined"
                name="electricity"
                value={formik.values?.electricity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched?.electricity &&
                  Boolean(formik.errors?.electricity)
                }
                helperText={
                  (formik.touched?.electricity && formik.errors?.electricity) ||
                  " "
                }
              />
            </div>
          </DialogContent>
          <DialogActions>
            <LoadingButton type="submit" variant="contained">
              Сохранить
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);

export default ModalData;
