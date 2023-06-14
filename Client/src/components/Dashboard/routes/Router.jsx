import { Routes, Route } from "react-router-dom";

import Dashboard from "../../../pages/Dashboard/Dashboard";
import Costumers from "../../../pages/Dashboard/Costumers";
import Settings from "../../../pages/Dashboard/Settings";
import Cars from "../../../pages/Dashboard/Cars";
import Providers from "../../../pages/Dashboard/Providers";
import Admins from "../../../pages/Dashboard/Admins";
import RentedCars from "../../../pages/Dashboard/RentedCars";

const Router = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Dashboard />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Cars" element={<Cars />} />
        <Route path="Costumers" element={<Costumers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="Providers" element={<Providers />} />
        <Route path="Admins" element={<Admins />} />
        <Route path="RentedCars" element={<RentedCars />} />
      </Route>
    </Routes>
  );
};

export default Router;
