import Grid from "@mui/material/Grid"
import {Button, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectProducts, selectProductsLoading} from "./productsSlice.ts";
import {useEffect} from "react";
import {fetchAllProducts} from "./productsThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ProductItem from "./components/ProductItem/ProductItem.tsx";
import {selectCategories} from "../categories/categoriesSlice.ts";
import {fetchAllCategories} from "../categories/categoriesThunks.ts";

const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const productsFetchLoading = useAppSelector(selectProductsLoading);
    const categories = useAppSelector(selectCategories);
    const {category_id} = useParams();

    useEffect(() => {
        dispatch(fetchAllProducts(category_id));
        dispatch(fetchAllCategories());
    }, [fetchAllProducts, dispatch, category_id]);


    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Cocktails
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to="/products/new">
                        Add New Cocktails
                    </Button>
                </Grid>
            </Grid>


            {productsFetchLoading ? <Spinner/> :
                <Grid container justifyContent="space-between">
                    <Grid size={3}>
                        {categories.length > 0 ?
                            <ul>
                                Пользователи
                                {categories.map(category => (
                                    <li key={category._id}>
                                        <Button variant="text" component={Link} to={`/${category._id}`}>{category.title}</Button>
                                    </li>
                                ))}
                            </ul>
                            :
                            null
                        }
                    </Grid>

                    <Grid size={8}>
                        {products.length === 0 ? <Typography variant='h4'>No Products yet</Typography> :
                            <Grid container direction="row" spacing={1}>
                                {products.map(product => (
                                    <ProductItem
                                        key={product._id}
                                        title={product.title}
                                        category_title={product.category?.title || 'No category'}
                                        description={product.description}
                                        ingredients={product.ingredients}
                                        id={product._id}
                                        image = {product.image || undefined}
                                    />
                                ))}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            }
        </Grid>
    );
};

export default Products;