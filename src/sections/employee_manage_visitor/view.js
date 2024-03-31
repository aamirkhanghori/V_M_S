// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

// components
import { mock_types_data } from 'src/_mock/_types';
import { useSettingsContext } from 'src/components/settings';
import EmpvisitorDetailsTable from './Emp_visitorDetailsTable';
// ----------------------------------------------------------------------

export default function EmployeeManageVisitor() {
  const settings = useSettingsContext();
 
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page employee manage visitor </Typography>
       <Grid maxWidth="xs" marginTop={2}>
        <EmpvisitorDetailsTable
          title="Visitors Details"
          Categories_Data={mock_types_data}
          tableLabels={[
            { id: 'Sr no', label: 'Sr no' },
            { id: 'First name', label: 'First name' },
            { id: 'Last name', label: 'Last name' },
            { id: 'Email id', label: 'Email id' },
            { id: 'Address', label: 'address' },
            { id: 'Phone no', label: 'Phone no' },
            { id: 'Purpose', label: 'Purpose' },
            { id: 'Company', label: 'Company' },
            { id: 'Department', label: 'Department' },
            { id: 'time', label: 'time' },
            { id: 'Action', label: 'Action' },
          ]} 
        />
      </Grid>
    </Container>
  );
}
