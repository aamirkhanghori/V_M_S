// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
// components
import { useSettingsContext } from 'src/components/settings';
import { mock_types_data } from 'src/_mock/_types';
import OverviewAnalyticsView from './overview-analytics';
import EmployeeDetailsTable from './employeeDetailsTable';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const userSession =  JSON.parse(sessionStorage.getItem('user'));;
  console.log(userSession);
  const [data,setData]=useState([]);
   const getAllEmployee=async()=>{
    try{    
      const URL =`https://localhost:7124/api/Login`;
      
      const res = await axios.get(URL)
      console.log("here in get All employee response", res.data)
      setData(res.data);
  }
  catch(err){
      alert("something went wrong");
      console.log(err)
  }
   }
   useEffect(() => {
    getAllEmployee();
  
}, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page Dashboard </Typography>

      {/* <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }} 
      /> */}
      <OverviewAnalyticsView/>
      <Grid maxWidth="xs" marginTop={2}>
        <EmployeeDetailsTable
          title="Employee Details"
          Categories_Data={data} 
          tableLabels={[
            { id: 'id', label: 'Sr no' },
            { id: 'f_name', label: 'First name' },
            { id: 'f_name', label: 'Last name' },
            { id: 'emp_id', label: 'Emp_id' },
            { id: 'email', label: 'Email id' },
            { id: 'phone_no', label: 'Phone no' },
            { id: 'role', label: 'role' },
            { id: 'department', label: 'Department' },
            { id: 'Action', label: 'Action' },
          ]} 
        />
      </Grid>
    </Container>
  );
}
