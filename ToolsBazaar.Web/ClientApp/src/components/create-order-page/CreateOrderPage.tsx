import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

type FetchDataProduct = {
    id: number;
    name: string;
    price: number;
};
const CreateOrderPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const [selectedProduct, setSelectedProduct] = useState({ id: 0, name: "", price: 0 });

    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
   //const history = useHistory();
    const [products, setProducts] = useState<FetchDataProduct[]>([]);
    


    useEffect(() => {
        const populateProductData = async () => {
            const response = await fetch("http://localhost:5127/products");
            const data = await response.json();
            setProducts(data);


        };

        populateProductData();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const selProduct = products.find((p) => p.id.toString() === productId);
            if (selProduct) {
                setSelectedProduct(selProduct);
                setTotalPrice(selProduct?.price * quantity);
            }
        };

        fetchProduct();
    }, [productId, quantity,products]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async(event)=> {
       // event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const productId = Number(formData.get('productId'));
        const quantity = Number(formData.get('quantity'));
        console.log(productId, quantity);
        const response = await fetch('http://localhost:5127/orders', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity}),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            // Redirect to success page
            alert('Order Sucess');

        } else {
            const data = await response.json();
            // Display error message
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <FormControl>
                    <InputLabel id="product-label">Product</InputLabel>
                    <Select labelId="product-label" id="product" name="productId"  value={selectedProduct.id} >
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                        ))}
                    </Select>


                </FormControl>
                <TextField
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(parseInt(event.target.value))}
                />
                <TextField id="total-price" label="Total Price"  type="text" value={totalPrice } InputProps={{ readOnly: true }} disabled />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Stack>
        </form>
    );
};

export default CreateOrderPage;
