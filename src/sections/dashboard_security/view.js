// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { mock_types_data } from 'src/_mock/_types';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from 'src/components/settings';
import AnalyticsWidgetSummary from '../one/analytics-widget-summary';
// import VisitorListView from './visitor-list-view';
import SecurityVisitorTable from './securityVisitorTable';
// ----------------------------------------------------------------------

export default function DashboardSecurity() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <Typography variant="h4"> Page Security Dashboard </Typography> */}

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

<Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Visitors In"
            total={10}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          /> 
        </Grid>

       
       

        <Grid xs={12} sm={6} md={3} marginLeft={ 70}>
          <AnalyticsWidgetSummary
            title="Visitors Out"
            total={2}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        
        
       
        
        {/* <VisitorListView/> */}
       
      </Grid>
      <Grid maxWidth="xs" marginTop={2}>
      <SecurityVisitorTable
        title="Visitor details"
        Categories_Data={mock_types_data}
        tableLabels={[
          { id: 'Sr no', label: 'Sr no' },
          { id: 'Photo', label: 'Photo' },
          { id: 'First name', label: 'First name' },
          { id: 'Last name', label: 'Last name' },
          { id: 'Phone no', label: 'Phone no' },
          { id: 'Company', label: 'Company' },
          { id: 'time', label: 'time' },
          { id: 'time_in', label: 'time_in' },
          { id: 'time_out', label: 'time_out' },
        ]} 
      />
    </Grid>

    </Container>
  );
}
