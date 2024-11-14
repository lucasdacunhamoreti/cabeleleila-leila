import { Table, Toggle, Placeholder, Loader } from "rsuite";
import React from "react";

import "rsuite/dist/rsuite.min.css";
const { Cell, HeaderCell, Column } = Table;

const TableComponent = ({ data, config, actions, onRowClick, loading }) => {
  const renderLoading = () => {
    return <Loader center backdrop content="Loading..." />;
  };

  return (
    <Table
      loading={loading}
      height={400}
      data={data}
      renderLoading={renderLoading}
      onRowClick={onRowClick}
      locale={{
        emptyMessage: "Não há clientes cadastrados",
      }}
    >
      {config.map((column) => {
        const { key, label, ...rest } = column;
        return (
          <Column {...rest} key={key}>
            <HeaderCell>{label}</HeaderCell>
            <Cell dataKey={key} />
          </Column>
        );
      })}
      <Column flexGrow={1}>
        <HeaderCell>Ações</HeaderCell>
        <Cell>{(item) => actions(item)}</Cell>
      </Column>
      ;
    </Table>
  );
};

export default TableComponent;
