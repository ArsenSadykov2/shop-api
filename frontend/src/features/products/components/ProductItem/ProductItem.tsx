import Grid from "@mui/material/Grid";
import {Card, CardHeader, CardContent, CardActions, IconButton, CardMedia, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Link} from 'react-router-dom';
import {apiUrl} from "../../../../../globalConstants.ts";
import notFoundPic from "../../../../assets/images/notFoundPic.png";

interface Props {
    title: string;
    ingredients: {name: string; amount: string}[];
    id: string;
    image: string | undefined;
}

const ProductItem: React.FC<Props> = ({title, ingredients, id, image}) => {
    let cartImage = notFoundPic;

    if(image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{sm: 4, md: 4, lg:3}}>
            <Card sx={{height: '75%', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                    component="img"
                    height="30%"
                    image={cartImage}
                    alt={title}
                />
                <CardHeader title={title}/>
                <CardContent sx={{flexGrow: 1}}>
                    <Typography variant="subtitle1" gutterBottom>
                        Ingredients:
                    </Typography>
                    <ul style={{paddingLeft: '20px', margin: 0}}>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name} - {ingredient.amount} ml
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;