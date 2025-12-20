// Local storage service for custom products
// Provides persistent storage that survives browser restarts

const STORAGE_KEY = 'customizer_products';
const MAX_PRODUCTS = 50; // Limit to prevent localStorage overflow

/**
 * Convert blob to base64 string for localStorage
 */
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

/**
 * Get all products from localStorage
 */
export const getProducts = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
};

/**
 * Get a specific product by ID
 */
export const getProductById = (id) => {
    const products = getProducts();
    return products.find(p => p.id === id);
};

/**
 * Save a new product to localStorage
 */
export const saveProduct = async (productData, imageBlob = null, configData = null) => {
    try {
        const products = getProducts();

        // Check if we've hit the limit
        if (products.length >= MAX_PRODUCTS) {
            throw new Error(`Maximum of ${MAX_PRODUCTS} products reached. Please delete some products first.`);
        }

        // Generate new ID
        const newId = products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1;

        // Convert image blob to base64 if provided
        let previewImage = null;
        if (imageBlob) {
            previewImage = await blobToBase64(imageBlob);
        }

        // Create product object
        const product = {
            ...productData,
            id: newId,
            previewImage,
            configurationData: configData, // Store config directly
            createDate: new Date().toISOString(),
            updateDate: new Date().toISOString()
        };

        // Add to products array
        products.push(product);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

        console.log('Product saved to localStorage:', product);
        return product;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            throw new Error('Storage quota exceeded. Please delete some products to free up space.');
        }
        throw error;
    }
};

/**
 * Update an existing product
 */
export const updateProduct = async (id, productData, imageBlob = null, configData = null) => {
    try {
        const products = getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error(`Product with id ${id} not found`);
        }

        // Convert image blob to base64 if provided
        let previewImage = products[index].previewImage;
        if (imageBlob) {
            previewImage = await blobToBase64(imageBlob);
        }

        // Update product
        const updatedProduct = {
            ...products[index],
            ...productData,
            id, // Preserve ID
            previewImage,
            configurationData: configData || products[index].configurationData,
            createDate: products[index].createDate, // Preserve create date
            updateDate: new Date().toISOString()
        };

        products[index] = updatedProduct;

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

        console.log('Product updated in localStorage:', updatedProduct);
        return updatedProduct;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            throw new Error('Storage quota exceeded. Please delete some products to free up space.');
        }
        throw error;
    }
};

/**
 * Delete a product
 */
export const deleteProduct = (id) => {
    try {
        const products = getProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        console.log('Product deleted from localStorage:', id);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

/**
 * Clear all products
 */
export const clearAllProducts = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('All products cleared from localStorage');
        return true;
    } catch (error) {
        console.error('Error clearing products:', error);
        throw error;
    }
};

/**
 * Get storage usage information
 */
export const getStorageInfo = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const sizeInBytes = data ? new Blob([data]).size : 0;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        const productCount = getProducts().length;

        return {
            sizeInBytes,
            sizeInKB,
            sizeInMB,
            productCount,
            maxProducts: MAX_PRODUCTS
        };
    } catch (error) {
        console.error('Error getting storage info:', error);
        return null;
    }
};

export default {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
    getStorageInfo
};
