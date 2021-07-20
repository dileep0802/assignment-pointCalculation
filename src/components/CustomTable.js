import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import usePointCalculations from "../custHooks/usePointCalculations";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tablecell: {
    border: "1px solid #dddddd"
  }
});
const CustomTable = () => {
  const classes = useStyles();

  const data = usePointCalculations();
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Month</TableCell>
            <TableCell align="right">Total Amount</TableCell>
            <TableCell align="right">Total Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <>
              {row.transactions.map((item, index) => (
                <TableRow key={item.tnx_id}>
                  {index === 0 ? (
                    <TableCell
                      classes={{ root: classes.tablecell }}
                      rowSpan={row.transactions.length}
                    >
                      {row.name}
                    </TableCell>
                  ) : null}

                  <TableCell align="right">{item.month}</TableCell>
                  <TableCell align="right">{item.totalAmount}</TableCell>
                  <TableCell align="right">{item.totalPoints}</TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
