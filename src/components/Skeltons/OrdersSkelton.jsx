import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
const OrdersSkeleton = () => {
  const rows = Array.from({ length: 5 }); // Show 5 placeholder rows
  const columns = Array.from({ length: 13 }); // Same number of columns as your table

  return (
    <Box className="relative overflow-x-auto mt-5">
      <Table className="w-full text-sm text-left text-gray-500 rtl:text-right">
        <TableHead className="text-xs text-gray-700 bg-gray-50">
          <TableRow>
            {columns.map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" width={70} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((_, rowIndex) => (
            <TableRow key={rowIndex} className="bg-white border-b">
              {columns.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="rounded" height={25} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrdersSkeleton;
