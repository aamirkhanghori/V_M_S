import { Helmet } from 'react-helmet-async';
// sections
import EmployeeManageVisitor from 'src/sections/employee_manage_visitor/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: employee manage visitor</title>
      </Helmet>

      
      <EmployeeManageVisitor/>
    </>
  );
}
