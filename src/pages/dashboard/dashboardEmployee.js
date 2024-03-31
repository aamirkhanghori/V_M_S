import { Helmet } from 'react-helmet-async';
// sections
import DashboardEmployee from 'src/sections/dashboard_employee/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard_employee</title>
      </Helmet>

      <DashboardEmployee />
    </>
  );
}
