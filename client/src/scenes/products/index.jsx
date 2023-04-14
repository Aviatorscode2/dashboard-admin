import {useState} from 'react'
import { Box, Button, Typography, useTheme, Rating, Card, CardActions, CardContent, useMediaQuery, Collapse } from '@mui/material'
import Header from 'components/Header'
import { useGetProductsQuery } from 'state/api'

// Product cpomponent
const Product = ({ _id, description, name, price, rating, category, supply, stat }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card
        sx={{
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.alt,
          borderRadius: '0.55rem',
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.text.secondary[700]}
            gutterBottom
          >
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            sx={{ mb: '1.5rem' }}
            color={theme.palette.secondary[400]}
          >
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="primart"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ color: theme.palette.neutral[300] }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>Yearly Sales This Year: {stat.yearlySalesTotal} {_id}</Typography>
            <Typography>Yearly Units Sold This Year {stat.yearlyTotalSoldUnits}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
}

function Products() {
    const { data, isLoading } = useGetProductsQuery();
    // console.log("Data" , data)
    const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Products" subtitle="See all products." />
        { data || !isLoading ? (
            <Box mt="20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
            }}>

            {data.map(({
                _id,
                description,
                name,
                price,
                rating,
                category,
                supply,
                stat
            }) => (
                <Product
                    key={_id}
                    _id={_id}
                    description={description}
                    name={name}
                    price={price}
                    rating={rating}
                    category={category}
                    supply={supply}
                    stat={stat}
                />

            ))}
            </Box>
        ) : (
            <>Loading...</>
        )}
        
    </Box>
  )
}

export default Products