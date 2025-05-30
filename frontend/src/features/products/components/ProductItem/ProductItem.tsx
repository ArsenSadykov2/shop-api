import Grid from "@mui/material/Grid";
import {Card, CardHeader, CardContent, CardMedia, Typography, Box} from "@mui/material";
import {Link} from 'react-router-dom';
import {apiUrl} from "../../../../../globalConstants.ts";
import notFoundPic from "../../../../assets/images/notFoundPic.png";

interface Props {
    title: string;
    ingredients: {name: string; amount: string}[];
    id: string;
    category_title: string;
    description: string;
    image: string | undefined;
}

const ProductItem: React.FC<Props> = ({title, ingredients, category_title, description, id, image}) => {
    let cartImage = notFoundPic;

    if(image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{sm: 4, md: 4, lg:3}}>
            <Card
                component={Link}
                to={'/products/' + id}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardHeader
                    title={title}
                    titleTypographyProps={{
                        variant: 'h6',
                        sx: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: 'text.primary'
                        }
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary' }}>
                        Ingredients:
                    </Typography>
                    <Box component="ul" sx={{
                        paddingLeft: '20px',
                        margin: 0,
                        marginBottom: '16px',
                        color: 'text.secondary'
                    }}>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name} - {ingredient.amount} ml
                            </li>
                        ))}
                    </Box>
                    <Typography paragraph sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: 'text.primary'
                    }}>
                        <strong>Recipe:</strong> {description}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        <strong>Author:</strong> {category_title}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProductItem;