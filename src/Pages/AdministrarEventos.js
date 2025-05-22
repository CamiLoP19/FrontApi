import React from "react";
import Sidebar from "../Components/AdminComponents/SideBar.js";

import Editar from "../Components/ManejoEventos/Editar";
export default function AdministrarEventos() {
  return (
    <div>
      <Sidebar></Sidebar>
      <div style={{ marginLeft: "240px", padding: "20px" }}>
        <Editar></Editar>
      </div>
    </div>
  );
}
