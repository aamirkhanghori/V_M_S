import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
// components 

function EditEmployee({ row }) {
  const [done, setDone] = useState(false);

  const NewTypesSchema = Yup.object().shape({
    first_name: Yup.string().max(50).required('Types Name is required'),
    last_name: Yup.string().max(250).required('Description is required'),
    email_id: Yup.string(),
    phone_no: Yup.number().max(10),
    department : Yup.string(),
  });
  const defaultValues = useMemo(
    () => ({
      first_name: row?.first_name || '',
      last_name:row?.last_name || '' ,
      email_id: row?.email_id || '',
      phone_no: row?.phone_no || '',
      department : row?.department || '',
    
    }),
    [row]
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
  const getTypes = useCallback(
    (rowData) => {
      try {
        setValue('first_name', rowData?.f_name );
        setValue('last_name', rowData?.l_name);
        setValue('email_id', rowData?.email);
        setValue('phone_no', rowData?.phone_no);
        setValue('department', rowData?.department);

       
      } catch (err) {
        alert('Check your internet connectivity');
        console.log('error in handleSubmit of Add Visitor');
        console.log('error: ', err);
      }
    },
    [setValue]
  );

  useEffect(() => {
    getTypes(row);
  }, [getTypes, row]);
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
            
          </Box>
          {done && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Employee has been added!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Edit Employee
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
EditEmployee.propTypes = {
  row: PropTypes.object,
};

export default EditEmployee;
