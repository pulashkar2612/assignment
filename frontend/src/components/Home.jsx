import React, { useEffect, useState } from 'react';
import { Box, Container, FormControlLabel, Pagination, Checkbox, Typography } from '@mui/material';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [count, setCount] = useState(0);

    const [checkedProducts, setCheckedProducts] = useState(() => {
        const storedCheckedProducts = localStorage.getItem('checkedProducts');
        return storedCheckedProducts ? JSON.parse(storedCheckedProducts) : [];
    });

    useEffect(() => {
        localStorage.setItem('checkedProducts', JSON.stringify(checkedProducts));
    }, [checkedProducts]);

    useEffect(() => {
        const authToken = localStorage.getItem("token");
        const fetchData = async (currentPage, limitPerPage, authToken) => {
            try {
                if (authToken) {
                    const response = await fetch(`http://localhost:8081/getProducts?page=${currentPage}&pageSize=${limitPerPage}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                    const res = await response.json();
                    console.log(res.status)
                    if (res.success) {
                        setProducts(res.data);
                        setCount(res.count);
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData(page, pageSize, authToken);
    }, [page, pageSize]);

    const handleCheckboxChange = (productId) => {
        const updatedCheckedItems = [...checkedProducts];
        const index = updatedCheckedItems.indexOf(productId);

        if (index !== -1) {
            updatedCheckedItems.splice(index, 1);
        } else {
            updatedCheckedItems.push(productId);
        }

        setCheckedProducts(updatedCheckedItems);
    };
    console.log(checkedProducts);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Container component="main" maxWidth="xs"
            sx={{
                border: '1px solid black',
                borderRadius: '8px',
                mt: 6
            }}>
            <Box
                sx={{
                    mt: 4,
                    mb: 10,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, alignItems: 'center' }}>
                    Please mark your interests !
                </Typography>
                <Box margin='0 auto'>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="h7" textAlign={'left'} >
                            We will keep you notified
                        </Typography>
                    </Box>
                    {products?.map((check) => {
                        return (
                            <Box key={check._id} display="flex" alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkedProducts.includes(check._id)}
                                            onChange={() => handleCheckboxChange(check._id)}
                                        />
                                    }
                                    label={check.name}
                                />
                            </Box>
                        );
                    })}
                    <Pagination
                        count={count/pageSize} 
                        page={page}
                        onChange={handleChangePage}
                        showFirstButton
                        showLastButton
                    />
                </Box>

            </Box>
        </Container>
    );
}

export default Home;