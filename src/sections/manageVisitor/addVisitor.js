import React, { useMemo, useState ,useRef} from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import {  RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import { LoadingButton } from '@mui/lab';
import * as icons from "@mui/icons-material";
// import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Image} from "react-bootstrap";
import Camera from "react-html5-camera-photo";
import Typography from "@mui/material/Typography";
import { fData } from "src/utils/format-number";
import { useTheme } from "@mui/material/styles";
// import { useRef } from "react";
// import dayjs, { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Dialog, { dialogClasses } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-html5-camera-photo/build/css/index.css";
import { TimeField } from '@mui/x-date-pickers/TimeField';
// components

function AddVisitor() {
  const [done, setDone] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const currentDate = dayjs(Date.now());
  const [openCamera, setOpenCamera] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [image, setImage] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileInputRef = useRef(null);

  const handleDrop = () => {
    // Trigger a click on the input element to open the file dialog
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check file size (max size 3.1 MB)
      if (file.size > 3.1 * 1024 * 1024) {
        alert("File size exceeds the maximum limit of 3.1 MB");
        return;
      }

      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (e) => {
        // e.target.result contains the base64-encoded image data
        const base64Data = e.target.result;

        // Perform further actions with the base64Data if needed

        // Example: Log the base64 data to the console
        console.log(base64Data);
        setOpen(false);
        setImage(base64Data);
      };

      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    }
  };

  const NewTypesSchema = Yup.object().shape({
    first_name: Yup.string().max(50).required('Types Name is required'),
    last_name: Yup.string().max(250).required('Description is required'),
    email_id: Yup.string(),
    address: Yup.string().max(50),
    phone_no: Yup.number().max(10),
    purpose : Yup.string(),
    company: Yup.string().max(250),
    department : Yup.string(),
    time : Yup.string(),
    from: Yup.date(),
    to : Yup.date(),
    photo:Yup.string(),
    
  });
  const defaultValues = useMemo(
    () => ({
      first_name: '',
      last_name: '',
      email_id: '',
      address: '',
      phone_no: '',
      purpose : '',
      company: '',
      department : '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewTypesSchema),
    defaultValues,
  });
  const popover = usePopover();
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data', data);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Categories');
      console.log('error: ', error);
    }
  });
  function handleTakePhoto(dataUri) {
    console.log("takePhoto", dataUri);
    setOpen(false);
    setImage(dataUri);
  }
  return (
   
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={1}>
        <Box sx={{ mt: 4, height: 200, width: 200 }}>
          {image && (
            <div style={{ position: "relative", flexDirection: "column" }}>
              <Image
                style={{ height: 200, width: 200, borderRadius: 20 }}
                src={image}
                alt="Uploaded Image"
              />
            </div>
          )}
          {!image ? (
            <Button
              onClick={handleClickOpen}
              component="label"
              variant="outlined"
              style={{
                flexDirection: "column",
                paddingTop: 10,
                marginTop: 20,
                marginLeft: 10,
                alignContent: "center",
              }}
              startIcon={<icons.CloudUpload fontSize="large" />}
            >
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  mx: "auto",
                  display: "block",
                  textAlign: "center",
                  color: "text.disabled",
                }}
              >
                Upload your Id proof here
                <br /> max size of {fData(3145728)}
              </Typography>
              {/* <VisuallyHiddenInput type="file" /> */}
            </Button>
          ) : (
            <Button
              component="label"
              variant="outlined"
              style={{
                flexDirection: "column",
                paddingTop: 10,
                marginTop: 20,
                marginLeft: 18,
                color: "red",
                alignContent: "center",
              }}
              onClick={() => {
                setImage("");
              }}
              startIcon={<icons.Delete fontSize="large" />}
            >
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  mx: "auto",
                  display: "block",
                  textAlign: "center",
                  color: "text.disabled",
                }}
              >
                Delete Uploaded Image
              </Typography>
            </Button>
          )}
        </Box>
        {/* </Grid> */}
        <Dialog
          // fullWidth
          maxWidth="xl"
          // open={flag.value}
          open={openCamera}
          isFullscreen="true"
          onClose={() => {
            setOpenCamera(false);
          }}
          transitionDuration={{
            enter: theme.transitions.duration.shortest,
            exit: 0,
          }}
          PaperProps={{
            sx: {
              mt: 3,
              padding: 1,
              // paddingTop: 6,
              // paddingTop: 1,
              // position: "fixed",

              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // overflow: "unset",
            },
          }}
          sx={{
            [`& .${dialogClasses.container}`]: {
              alignItems: "flex-start",
            },
          }}
        >
          <Camera
            onCameraError={() => {
              setOpenCamera(false);
              alert("Problem with camera");
              setOpen(true);
            }}
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);

              setOpenCamera(false);
            }}
          />
        </Dialog>
        <Grid xs={12} md={10}>
          <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="first_name" label="Enter first Name *" />
            <RHFTextField name="last_name" label="Enter last name *" /> 
            <RHFTextField name="email_id" label="Enter email_id *" />
            <RHFTextField name="address" label="Enter address *" />
            <RHFTextField name="phone_no" label="Enter phone no *" />
            <RHFTextField name="purpose" label="Enter purpose *" />
            <RHFTextField name="company" label="Enter company *" />
            <RHFTextField name="department" label="Enter department *" />
            {/* <RHFTextField name="time" label="Enter time *" /> */}
            {/* <RHFTextField name="from" label="Enter from date *" /> */}
            <TimeField
  label="Time"
  defaultValue={dayjs('2022-04-17T15:30')}
  format="hh:mm a"
/>  
            <Controller
                name="from_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="From Date *"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    minDate={currentDate}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
            <Controller
                name="to_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="To Date *"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    minDate={currentDate}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
          </Box>
       
            {done && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Visitor has been added!
              </Alert>
            )}

            {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentUser ? "Add Visitor" : "Save Changes"}
              </LoadingButton>
            </Stack> */}
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
             <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
               Add Visitor
             </LoadingButton>
          </Stack>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Please Upload Photo of Visitor
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            select camera or upload file accrodingly
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCamera(true);
            }}
          >
            Open Camera
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <Button onClick={handleDrop} autoFocus>
            Upload File
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

export default AddVisitor;
