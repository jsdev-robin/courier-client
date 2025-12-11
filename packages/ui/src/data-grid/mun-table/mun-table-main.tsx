"use client";

import { useDataGrid } from "../contexts/data-grid-contexts";
import MunTableBody from "./mun-table-body";
import MunTableHeader from "./mun-table-header";

const MunTableMain = () => {
  const { paneRef1, paneRef2 } = useDataGrid();
  return (
    <>
      <div
        className="w-full bg-muted border-b border-border overflow-y-scroll scroll-hidden-x"
        ref={paneRef1}
      >
        <MunTableHeader />
      </div>
      <div className="h-[75vh] overflow-scroll bg-background" ref={paneRef2}>
        <MunTableBody />
      </div>
    </>
  );
};

export default MunTableMain;
