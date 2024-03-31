// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { mock_types_data } from 'src/_mock/_types';
import { useSettingsContext } from 'src/components/settings';
import AnalyticsWidgetSummary from '../one/analytics-widget-summary';
import EmployeeVisitorTable from './employeeVisitorTable';


// ----------------------------------------------------------------------

export default function DashboardEmployee() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
     

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} marginLeft={ 20} >
          <AnalyticsWidgetSummary
            title="Visit so far"
            total={7}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          /> 
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Yet to visit"
            total={11}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total visitors"
            total={18}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>
      
       

      </Grid>
      <Grid maxWidth="xs" marginTop={2}>
      <EmployeeVisitorTable
        title="List of today visitor"
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
        ]} 
      />
    </Grid> 
    </Container>
  );
}
