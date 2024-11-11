import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersData } from "./fetch";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
];

export default function UserTable() {
  /**
   * Composant UserTable qui affiche un tableau des utilisateurs avec des fonctionnalités de pagination.
   * Il utilise React Query pour récupérer les données des utilisateurs à partir d'une API externe.
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Un tableau affichant les informations des utilisateurs avec pagination.
   */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersData,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) return <h2>Loading users...</h2>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="user table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "#ffffff",
                    backgroundColor: "#3f51b5",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow hover key={user.email}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{user[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        aria-label="user pagination"
      />
    </Paper>
  );
}
