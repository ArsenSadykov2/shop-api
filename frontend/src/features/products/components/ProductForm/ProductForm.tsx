import {Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import type {ProductMutation} from "../../../../types";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmitProduct}) => {
    const [form, setForm] = useState<ProductMutation>({
        title: '',
        description: '',
        price: 0,
        image: null,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({...form});
        onSubmitProduct({...form, price: Number(form.price)});

    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form onSubmit={onSubmit}>
           <Grid container spacing={2} direction="column" alignItems="center">
               <Grid size={{sm: 12, md: 6, lg:6}}>
                   <TextField
                       style={{width: '100%'}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                   />
               </Grid>
               <Grid size={{sm: 12, md: 6, lg:6}}>
                   <TextField
                       style={{width: '100%'}}
                       InputProps={{inputProps: {min: 1}}}
                       type={'number'}
                       id="price"
                       label="Price"
                       name="price"
                       value={form.price}
                       onChange={onInputChange}
                   />
               </Grid>
               <Grid size={{sm: 12, md: 6, lg:6}}>
                   <TextField
                       style={{width: '100%'}}
                       multiline rows={3}
                       id="description"
                       label="Description"
                       name="description"
                       value={form.description}
                       onChange={onInputChange}
                   />
               </Grid>
               <Grid size={{sm: 12, md: 6, lg:6}}>
                   <FileInput
                       name='image'
                       onChange={fileInputChangeHandler}
                       label='Image'
                   />
               </Grid>
               <Grid size={{sm: 12, md: 6, lg:6}}>
                   <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
                        Create
                   </Button>
               </Grid>
           </Grid>
        </form>
    );
};

export default ProductForm;