import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { Link } from 'react-router-dom';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { useEffect, useState } from "react";

//type FetchDataProps = {};
//type FetchDataState = { loading: boolean; products: FetchDataProduct[] };
type FetchDataProduct = {
  id: number;
  name: string;
  price: number;
};

const AllProductsPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<FetchDataProduct[]>([]);

    useEffect(() => {
        const populateProductData = async () => {
            const response = await fetch("http://localhost:5127/products");
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        };

        populateProductData();
    }, []);

    const renderProductsTable = (products: FetchDataProduct[]) => (
        <TableContainer component={Paper}>
            <Table aria-label="products table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Create order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {product.id}
                            </TableCell>
                            <TableCell align="left">{product.name}</TableCell>
                            <TableCell align="right">
                                ${product.price.toFixed(2)}
                            </TableCell>
            <TableCell align="center">
              <Link to={`/create-order/${product.id}`}>
                <ShoppingCartCheckout />
              </Link>
            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Stack spacing={4}>
            <Typography variant="h2">All products</Typography>
            {loading ? (
                <CircularProgress size={24} />
            ) : (
                renderProductsTable(products)
            )}
        </Stack>
    );
};

export default AllProductsPage;

//export class AllProductsPage extends Component<FetchDataProps, FetchDataState> {
//  static displayName = AllProductsPage.name;
//  static propTypes = {};

//  constructor(props: FetchDataProps) {
//    super(props);
//    this.state = { products: [], loading: true };
//  }

//  componentDidMount() {
//    this.populateProductData();
//  }

//  static renderProductsTable(products: FetchDataProduct[]) {
//    return (
//      <TableContainer component={Paper}>
//        <Table aria-label="products table">
//          <TableHead>
//            <TableRow>
//              <TableCell>Id</TableCell>
//              <TableCell align="left">Description</TableCell>
//              <TableCell align="right">Price</TableCell>
//            </TableRow>
//          </TableHead>
//          <TableBody>
//            {products.map((product) => (
//              <TableRow
//                key={product.id}
//                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//              >
//                <TableCell component="th" scope="row">
//                  {product.id}
//                </TableCell>
//                <TableCell align="left">{product.name}</TableCell>
//                <TableCell align="right">
//                  ${Math.floor(product.price)}
//                </TableCell>
//              </TableRow>
//            ))}
//          </TableBody>
//        </Table>
//      </TableContainer>
//    );
//  }

//  render() {
//    const contents = this.state.loading ? (
//      <CircularProgress size={24} />
//    ) : (
//      AllProductsPage.renderProductsTable(this.state.products)
//    );

//    return (
//      <Stack spacing={4}>
//        <Typography variant="h2">All products</Typography>
//        {contents}
//      </Stack>
//    );
//  }

//  async populateProductData() {
//    const response = await fetch("http://localhost:5127/products");
//    const data = await response.json();
//    this.setState({ products: data, loading: false });
//  }
//}
