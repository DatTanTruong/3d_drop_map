import { bases, charms } from '../mock/mockData';
import { customProducts } from '../mock/customProductsData';

/**
 * Fetch all available bases from the database
 * MOCK: Returns mock data instead of API call
 */
export const fetchBases = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Fetching bases from mock data:', bases);
    return bases;
  } catch (error) {
    console.error('Error fetching bases:', error);
    throw error;
  }
};

/**
 * Fetch all available charms from the database
 * MOCK: Returns mock data instead of API call
 */
export const fetchCharms = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Fetching charms from mock data:', charms);
    return charms;
  } catch (error) {
    console.error('Error fetching charms:', error);
    throw error;
  }
};

/**
 * Fetch user's custom products
 * MOCK: Returns products from localStorage
 */
export const fetchUserProducts = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Import localStorage service dynamically
    const localStorageService = await import('./localStorageService');
    const products = localStorageService.getProducts();

    console.log('Fetching custom products from localStorage:', products);

    // Enhance custom products with base references for compatibility
    const enhancedProducts = products.map(product => ({
      ...product,
      base: bases.find(base => base.id === product.baseId),
      model: {
        id: product.modelId || product.id,
        address: product.configurationFile || null
      }
    }));

    return enhancedProducts;
  } catch (error) {
    console.error('Error fetching user products:', error);
    throw error;
  }
};

/**
 * Create a new custom product
 * MOCK: Saves to localStorage with persistent storage
 */
export const createCustomProduct = async (productData, images, modelFile) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Mock: Creating product with data:', productData);
    console.log('Mock: Images:', images);
    console.log('Mock: Model file:', modelFile);

    // Import localStorage service
    const localStorageService = await import('./localStorageService');

    // Extract image blob
    const imageBlob = images && images.length > 0 ? images[0] : null;

    // Extract configuration data from model file
    let configData = null;
    if (modelFile) {
      try {
        const text = await modelFile.text();
        configData = JSON.parse(text);
      } catch (error) {
        console.warn('Could not parse model file:', error);
      }
    }

    // Save to localStorage
    const newProduct = await localStorageService.saveProduct(productData, imageBlob, configData);

    console.log('Mock: Product created and saved to localStorage:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing custom product (including model file)
 * MOCK: Updates product in localStorage
 */
export const updateCustomProduct = async (productData, images, modelFile) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Mock: Updating product with data:', productData);
    console.log('Mock: Images:', images);
    console.log('Mock: Model file:', modelFile);

    // Import localStorage service
    const localStorageService = await import('./localStorageService');

    // Extract image blob
    const imageBlob = images && images.length > 0 ? images[0] : null;

    // Extract configuration data from model file
    let configData = null;
    if (modelFile) {
      try {
        const text = await modelFile.text();
        configData = JSON.parse(text);
      } catch (error) {
        console.warn('Could not parse model file:', error);
      }
    }

    // Update in localStorage
    const updatedProduct = await localStorageService.updateProduct(
      productData.id,
      productData,
      imageBlob,
      configData
    );

    console.log('Mock: Product updated in localStorage:', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
/**
 * Calculate total price for a custom product
 */
export const calculateCustomProductPrice = (base, selectedCharms) => {
  const basePrice = parseFloat(base.price) || 0;
  const charmsPrices = selectedCharms.reduce((total, charm) => {
    return total + (parseFloat(charm.price) || 0);
  }, 0);

  return basePrice + charmsPrices;
};

// Export all services as default object
const customizerService = {
  fetchBases,
  fetchCharms,
  fetchUserProducts,
  createCustomProduct,
  updateCustomProduct,
  calculateCustomProductPrice
};

export default customizerService;
