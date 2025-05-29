import Grid from "@mui/material/Grid";
import {Card, CardHeader, CardContent, CardActions, IconButton, CardMedia} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Link} from 'react-router-dom';
import {apiUrl} from "../../../../../globalConstants.ts";
import notFoundPic from "../../../../assets/images/notFoundPic.png";

interface Props {
    title: string;
    price: number;
    id: string;
    image: string | undefined;
}

const ProductItem: React.FC<Props> = ({title, price, id, image}) => {
    let cartImage = notFoundPic;

    if(image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{xs:12, sm:12, md:6, lg:4}}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                />
                <CardHeader title={title}/>
                <CardContent>
                    <strong>
                        Price: {price} KGS
                    </strong>
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