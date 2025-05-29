import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneProducts, selectProductsLoading} from "./productsSlice.ts";
import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {fetchProductById} from "./productsThunks.ts";
import notFoundPic from '../../assets/images/notFoundPic.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {apiUrl} from "../../../globalConstants.ts";

const FullProduct = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProducts);
    const fetchLoading = useAppSelector(selectProductsLoading);
    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && product ?
                <Card sx={{ width: "100%", maxWidth: 600, margin: '0 auto'}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="400"
                            image={product?.image ? apiUrl + '/' + product.image : notFoundPic}
                            alt={product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {product.title}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Recipe: {product.description}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Ingredients:
                            </Typography>
                            <ul>
                                {product.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        <Typography variant="body1">
                                            {ingredient.name} - {ingredient.amount}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <IconButton component={NavLink} to="/" sx={{mb: 2, ml: 2}}>
                            <ArrowBackIcon sx={{mr: 1}}/>
                            <Typography variant="body2">
                                Back to products
                            </Typography>
                        </IconButton>
                    </CardActionArea>
                </Card>
                :
                <Typography variant="h6">Product not found</Typography>
            }
        </Container>
    );
};

export default FullProduct;