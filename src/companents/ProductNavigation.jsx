import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Snackbar, Alert } from '@mui/material';

function ProductNav() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [products, setProducts] = useState([]);

  // Örnek Ürün Listeleri
  const productData = {
    Mobilya: ['Koltuk Takımı', 'Yemek Masası', 'TV Ünitesi'],
    Teknoloji: ['Laptop', 'Akıllı Telefon', 'Kulaklık'],
    Kıyafet: ['T-shirt', 'Ceket', 'Pantolon'],
    'Bebek Ürünleri': ['Bebek Arabası', 'Mama Sandalyesi', 'Oyuncak'],
  };

  // Kategoriye tıklama olayını yönetir
  const handleCategoryClick = (category) => {
    setProducts(productData[category]);
    setOpenSnackbar(true);
    setSelectedCategory(category);
  };

  // Snackbar'ı kapat
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <AppBar position="static" color="warning">
        <Toolbar>
          {/* Marka İsmi veya Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ürünler
          </Typography>

          {/* Ürün Kategorileri */}
          <Box>
            {Object.keys(productData).map((category) => (
              <Button key={category} color="inherit" onClick={(e) => {
                e.stopPropagation(); // Olayın yayılmasını durdur
                handleCategoryClick(category);
              }}>
                {category}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Ürünleri Sağ Alt Köşede Göster */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {selectedCategory} ürünleri gösteriliyor.
          <Box sx={{ mt: 1 }}>
            {products.map((product, index) => (
              <Button
                key={index}
                color="primary"
                onClick={() => {
                  // Ürüne tıklandığında ilgili bölüme git
                  alert(`${product} ürününe yönlendiriliyorsunuz!`);
                }}
                sx={{ display: 'block', textAlign: 'left', marginTop: 1 }}
              >
                {product}
              </Button>
            ))}
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductNav;