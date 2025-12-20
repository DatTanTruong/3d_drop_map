// Enhanced mock data structure aligned with database schema
// In production, this would be replaced by API calls to customizerService.js

// Mock Images (Maps to Image table)
export const mockImages = [
  { id: 1, name: "default_preview", address: "/mock/images/products/default.png" },
  { id: 2, name: "grass_preview", address: "/mock/images/products/grass.png" },
  { id: 3, name: "tree_preview", address: "/mock/images/accessories/tree.png" },
  { id: 4, name: "2building_preview", address: "/mock/images/accessories/2building.png" },
  { id: 5, name: "bench_preview", address: "/mock/images/accessories/bench.png" },
  { id: 6, name: "tree2_preview", address: "/mock/images/accessories/tree2.png" },
  { id: 7, name: "car_preview", address: "/mock/images/accessories/car.png" },
  { id: 8, name: "bush_preview", address: "/mock/images/accessories/bush.png" },
  { id: 9, name: "fence_preview", address: "/mock/images/accessories/fence.png" },
];

// Mock 3D Models (Maps to Model table)
export const mockModels = [
  { id: 1, name: "default_model", address: "/mock/models/lane.glb" },
  { id: 2, name: "grass_model", address: "/mock/models/grasslane.glb" },
  { id: 3, name: "tree_model", address: "/mock/models/accessories/tree.glb" },
  { id: 4, name: "building_model", address: "/mock/models/accessories/building.glb" },
  { id: 5, name: "bench_model", address: "/mock/models/accessories/bench.glb" },
  { id: 6, name: "tree2_model", address: "/mock/models/accessories/tree2.glb" },
  { id: 7, name: "car_model", address: "/mock/models/accessories/car.glb" },
  { id: 8, name: "bush_model", address: "/mock/models/accessories/bush.glb" },
  { id: 9, name: "fence_model", address: "/mock/models/accessories/fence.glb" },
];

// Mock Collections (Maps to Collection table)
export const mockCollections = [
  { id: 1, name: "Basic Collection", descript: "Simple and elegant designs" },
  { id: 2, name: "Decorative Collection", descript: "Ornate and detailed pieces" },
];
// Base Products (aligned with Base table in database)
export const bases = [
  {
    id: 1,
    name: "Base lane",
    color: "Default",
    price: 5.00,
    imageId: 1, // References Image table
    modelId: 1, // References Model table
    // Enhanced with resolved references for easy access
    image: mockImages.find(img => img.id === 1),
    model: mockModels.find(model => model.id === 1),
    // For backward compatibility with existing code
    previewImage: "/mock/images/products/default.png",
    modelPath: "/mock/models/lane.glb",
  },
  {
    id: 2,
    name: "Base grass",
    color: "Silver",
    price: 7.50,
    imageId: 2,
    modelId: 2,
    image: mockImages.find(img => img.id === 2),
    model: mockModels.find(model => model.id === 2),
    previewImage: "/mock/images/products/grass.png",
    modelPath: "/mock/models/grasslane.glb",
  },
];

// Materials and Textures removed - not in database schema

// Charms (aligned with Charm table in database)
export const charms = [
  {
    id: 1,
    name: "tree",
    price: 2.5,
    imageId: 3, // References Image table
    modelId: 3, // References Model table
    // Enhanced with resolved references
    image: mockImages.find(img => img.id === 3),
    model: mockModels.find(model => model.id === 3),
    // For backward compatibility
    previewImage: "/mock/images/accessories/tree.png",
    modelPath: "/mock/models/accessories/tree.glb",
  },
  {
    id: 2,
    name: "building",
    price: 3.0,
    imageId: 4,
    modelId: 4,
    image: mockImages.find(img => img.id === 4),
    model: mockModels.find(model => model.id === 4),
    previewImage: "/mock/images/accessories/2building.png",
    modelPath: "/mock/models/accessories/building.glb",
  },
  {
    id: 3,
    name: "bench",
    price: 3.0,
    imageId: 5,
    modelId: 5,
    image: mockImages.find(img => img.id === 5),
    model: mockModels.find(model => model.id === 5),
    previewImage: "/mock/images/accessories/bench.png",
    modelPath: "/mock/models/accessories/bench.glb",
  },
  {
    id: 4,
    name: "tree2",
    price: 3.0,
    imageId: 6,
    modelId: 6,
    image: mockImages.find(img => img.id === 6),
    model: mockModels.find(model => model.id === 6),
    previewImage: "/mock/images/accessories/tree2.png",
    modelPath: "/mock/models/accessories/tree2.glb",
  },
  {
    id: 5,
    name: "car",
    price: 3.0,
    imageId: 7,
    modelId: 7,
    image: mockImages.find(img => img.id === 7),
    model: mockModels.find(model => model.id === 7),
    previewImage: "/mock/images/accessories/car.png",
    modelPath: "/mock/models/accessories/car.glb",
  },
  {
    id: 6,
    name: "bush",
    price: 3.0,
    imageId: 8,
    modelId: 8,
    image: mockImages.find(img => img.id === 8),
    model: mockModels.find(model => model.id === 8),
    previewImage: "/mock/images/accessories/bush.png",
    modelPath: "/mock/models/accessories/bush.glb",
  },
  {
    id: 7,
    name: "fence",
    price: 3.0,
    imageId: 9,
    modelId: 9,
    image: mockImages.find(img => img.id === 9),
    model: mockModels.find(model => model.id === 9),
    previewImage: "/mock/images/accessories/fence.png",
    modelPath: "/mock/models/accessories/fence.glb",
  },
];
