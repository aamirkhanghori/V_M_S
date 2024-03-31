import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from 'react-router-dom';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

   const [emp_id,setEmp_id]=useState("");
   const [password,setPassword]=useState("");
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const passwordNew = useBoolean();

  const LoginSchema = Yup.object().shape({
    emp_id: Yup.string().required('Emp_id is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    emp_id: 'emp1',
    password: '12',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.emp_id, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
    
  });
  // const onSubmit=async()=>{
  //   console.warn(emp_id,password);
  //   const item={emp_id,password};
  //  const result= await fetch("https://localhost:7124/api/Login/validate",{
  //       method:'POST',
  //       headers:{
  //         "Content-Type":"application/json",
  //         "Accept":"application/json",
  //       },
  //       body:JSON.stringify(item)
  //  })
  // const data=await result.json();
  //  if(data){
  //   router.push(returnTo || PATH_AFTER_LOGIN);
  //  }
  // }

  // const renderHead = (
  //   <Stack spacing={2} sx={{ mb: 5 }}>
  //     <Typography variant="h4">Sign in to Minimal</Typography>

  //     <Stack direction="row" spacing={0.5}>
  //       <Typography variant="body2">New user?</Typography>

  //       <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
  //         Create an account
  //       </Link>
  //     </Stack>
  //   </Stack>
  // );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="emp_id" label="emp id" />
      {/* onChange={(e)=>setEmp_id(e.target.value)} */}
      {/* <RHFTextField name="email" label="email"/> */}

      <RHFTextField
        name="password"
        label="Password"
        type={passwordNew.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={passwordNew.onToggle} edge="end">
                <Iconify icon={passwordNew.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
       
      />
 {/* onChange={(e)=>{setPassword(e.target.value)}} */}
      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {/* {renderHead} */}

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>emp1</strong> / password :<strong> demo1234</strong>
      </Alert>

      {renderForm}
    </FormProvider>
  );
}
