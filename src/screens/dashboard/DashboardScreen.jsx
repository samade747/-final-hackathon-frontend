// import { AreaCards,  AreaTable, AreaTop } from "../../components/dashboard";

import AreaTable from "../../components/dashboard/areaTable/AreaTable";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import AreaCards from "../../components/dashboard/areaCards/AreaCards";
const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      {/* <AreaCharts /> */}
      <AreaTable />
    </div>
  );
};

export default Dashboard;
