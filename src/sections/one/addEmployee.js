import React, { useMemo, useState } from 'react';
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
import DatePicker from 'react-date-picker';
// import dayjs, { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import axios from 'axios';
// components

function AddEmployee() {
  const [done, setDone] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const currentDate = dayjs(Date.now());
  const NewTypesSchema = Yup.object().shape({
    first_name: Yup.string().max(50).required('First Name is required'),
    last_name: Yup.string().max(250).required('last name is required'),
    email_id: Yup.string().required('email is required').email('Email must be a valid email address'),
    phone_no: Yup.string()
      .matches(/^(\d{10})?$/, "Invalid Phone number")
      .required("Phome number is required"),
    department:Yup.string(),
     emp_id:Yup.string().required('employee id is required'),
     password:Yup.string(),
     role:Yup.string(),
  });
  const defaultValues = useMemo(
    () => ({
      first_name: '',
      last_name: '',
      email_id: '',
      phone_no: '',
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
      console.log('onsubmit',data);
      const req={
        emp_id: data.emp_id,
        password:data.password,
        role:data.role,
        f_name:data.first_name,
        l_name:data.last_name,
        email: data.email_id,
        phone_no: data.phone_no,
        department:data.department,
      }
      console.log('in req ',req)
      const URL = `https://localhost:7124/api/Login`;
      // const emp = await axios.post(URL, {
      //   "emp_id": "admin4",
      //   "password": "adm4",
      //   "role": "admin",
      //   "f_name": "mayanty",
      //   "l_name": "patel",
      //   "email": "mayanty@gmail.com",
      //   "phone_no": "7435618866",
      //   "department": "technology"
      // });
      const emp = await axios.post(URL,req);
     console.log("after request", emp);
      
    } catch (error) {
      alert("something went wrong");
      console.log("here in error in handle submit");
      console.error(error);
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={20} md={15}>
        <Card sx={{ p: 1 }}>
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
            <RHFTextField name="phone_no" label="Enter phone no *" />
            <RHFAutocomplete
                name="department"
                label=" department *"
                options={["manufacture", "technology"]}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const label = ["manufacture", "technology"].filter(
                    (t) => t === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      {label}
                    </li>
                  );
                }}
              />
            <RHFTextField name="emp_id" label="Enter emp_id *" />
            <RHFTextField name="password" label="Set password" />
            <RHFAutocomplete
                name="role"
                label=" role *"
                options={["admin", "employee","security"]}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const label = ["admin", "employee","security"].filter(
                    (t) => t === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      {label}
                    </li>
                  );
                }}
              />
            {/* <RHFTextField name="gatename" label="Enter gatename *" /> */}
          </Box>
          {done && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              onSubmit Types has been added!
            </Alert>
          )}
 
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add Employee
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddEmployee;
