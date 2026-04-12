import React from "react";

interface TableRowProps {
  label: string;
  children: React.ReactNode;
}

const TableRow = ({ label, children }: TableRowProps) => (
  <tr className="border-b border-border last:border-0">
    <th className="py-5 text-left font-medium text-foreground-muted">
      {label}
    </th>
    <td className="py-5 text-right">{children}</td>
  </tr>
);

interface TableProps {
  children: React.ReactNode;
}

const Table = ({ children }: TableProps) => (
  <div className="w-full">
    <table className="w-full border-collapse">
      <tbody>{children}</tbody>
    </table>
  </div>
);

export { Table, TableRow };
