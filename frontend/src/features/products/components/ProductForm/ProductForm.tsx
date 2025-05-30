import {
    Button,
    Grid,
    TextField,
    IconButton,
    Card,
    CardContent,
    Typography,
    Box,
    Divider, MenuItem
} from "@mui/material";
import {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { ProductMutation } from "../../../../types";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import { styled } from "@mui/material/styles";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectCategories, selectCategoriesLoading} from "../../../categories/categoriesSlice.ts";
import {fetchAllCategories} from "../../../categories/categoriesThunks.ts";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

interface Ingredient {
    name: string;
    amount: string;
}

const FormContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e6f2ff 0%, #cce0ff 100%)',
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const StyledCard = styled(Card)(() => ({
    maxWidth: 800,
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 100, 0.1)',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
}));

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        '&:hover fieldset': {
            borderColor: '#1976d2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
        }
    }
}));

const ProductForm: React.FC<Props> = ({ onSubmitProduct }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectCategoriesLoading);
    const [form, setForm] = useState<ProductMutation>({
        category: "",
        title: "",
        description: "",
        ingredients: [{ name: "", amount: "" }],
        image: null,
    });

    const [errors, setErrors] = useState({
        title: false,
        description: false,
    });

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const validateForm = () => {
        const newErrors = {
            title: form.title.trim() === "",
            description: form.description.trim() === "",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmitProduct(form);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name as keyof typeof errors]) {
            setErrors({ ...errors, [name]: false });
        }
    };

    const addIngredient = () => {
        setForm({
            ...form,
            ingredients: [...form.ingredients, { name: "", amount: "" }],
        });
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = form.ingredients.filter((_: Ingredient, i: number) => i !== index);
        setForm({ ...form, ingredients: updatedIngredients });
    };

    const handleIngredientChange = (
        index: number,
        field: keyof Ingredient,
        value: string
    ) => {
        const updatedIngredients = form.ingredients.map((ingredient: Ingredient, i: number) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setForm({ ...form, ingredients: updatedIngredients });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <FormContainer>
            <StyledCard>
                <CardContent>
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{
                            fontWeight: 700,
                            color: '#1976d2',
                            letterSpacing: '-0.5px'
                        }}>
                            Create New Cocktail
                        </Typography>
                    </Box>

                    <form onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{xs: 8}}>
                                <StyledTextField
                                    fullWidth
                                    select
                                    disabled={categoriesLoading}
                                    id="category"
                                    label="Category"
                                    name="category"
                                    value={form.category}
                                    onChange={onInputChange}
                                >
                                    <MenuItem value='' disabled>Select Category</MenuItem>
                                    {categories.map(category => (
                                        <MenuItem value={category._id} key={category._id}>{category.title}</MenuItem>
                                    ))}
                                </StyledTextField>/
                            </Grid>
                            <Grid size={{xs: 8}}>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    id="title"
                                    label="Product Title"
                                    name="title"
                                    value={form.title}
                                    onChange={onInputChange}
                                    error={errors.title}
                                    helperText={errors.title ? "Title is required" : ""}
                                />
                            </Grid>

                            <Grid size={{xs: 6}}>
                                <Divider sx={{ my: 2 }}>
                                    <Typography color="textSecondary" sx={{ px: 2 }}>
                                        Ingredients
                                    </Typography>
                                </Divider>

                                <CardContent>
                                    {form.ingredients.map((ingredient: Ingredient, index: number) => (
                                        <Grid size={{xs: 12}} key={index}>
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <StyledTextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id={`ingredient-${index}`}
                                                    label="Ingredient Name"
                                                    value={ingredient.name}
                                                    onChange={(e) =>
                                                        handleIngredientChange(index, "name", e.target.value)
                                                    }
                                                    sx={{ flex: '1 1 60%' }}
                                                />
                                                <StyledTextField
                                                    fullWidth
                                                    variant="outlined"
                                                    id={`amount-${index}`}
                                                    type="number"
                                                    label="Amount"
                                                    value={ingredient.amount}
                                                    onChange={(e) =>
                                                        handleIngredientChange(index, "amount", e.target.value)
                                                    }
                                                    sx={{ flex: '1 1 30%' }}
                                                />
                                                {index > 0 && (
                                                    <IconButton
                                                        onClick={() => removeIngredient(index)}
                                                        color="error"
                                                        sx={{
                                                            borderRadius: 2,
                                                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(244, 67, 54, 0.2)'
                                                            }
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                )}
                                                {index === form.ingredients.length - 1 && (
                                                    <IconButton
                                                        onClick={addIngredient}
                                                        color="primary"
                                                        sx={{
                                                            borderRadius: 2,
                                                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(25, 118, 210, 0.2)'
                                                            }
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Grid>
                                    ))}
                                </CardContent>
                            </Grid>


                            <Grid size={{xs: 12}}>
                                <StyledTextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    id="description"
                                    label="Product Description"
                                    name="description"
                                    value={form.description}
                                    onChange={onInputChange}
                                    error={errors.description}
                                    helperText={errors.description ? "Description is required" : ""}
                                />
                            </Grid>

                            <Grid size={{xs: 10}}>
                                <FileInput
                                    name="image"
                                    onChange={fileInputChangeHandler}
                                    label="Product Image"
                                />
                            </Grid>
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <Box display="flex" justifyContent="start" mt={4}>
                                <Button variant="contained" color="primary" type="submit">
                                    Create Cocktail
                                </Button>
                            </Box>
                        </Grid>
                    </form>
                </CardContent>
            </StyledCard>
        </FormContainer>
    );
};

export default ProductForm;