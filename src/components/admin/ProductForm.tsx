import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import { Product } from '../../types';
import ImageUploader from './ImageUploader';

interface ProductFormProps {
  product?: Product;
  onSubmit: (products: Array<Omit<Product, 'id'> | Product>) => void;
  multipleMode?: boolean;
}

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  images: [],
  category: 'toys',
  gender: 'unisex',
  price: 0,
  code: 'N/A',
  sizes: [{ name: 'Default', count: 0 }],
  ageRange: '0-3 years',
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, multipleMode = false }) => {
  const [products, setProducts] = useState<Array<Omit<Product, 'id'> | Product>>([
    product || { ...emptyProduct }
  ]);
  const [errors, setErrors] = useState<Array<Record<string, string>>>([{}]);

  useEffect(() => {
    if (product) {
      setProducts([product]);
    }
  }, [product]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setProducts(updatedProducts);
  };

  const handleImageUploaded = (index: number, imageBase64: string) => {
    const updatedProducts = [...products];
    if (!updatedProducts[index].images.includes(imageBase64)) {
      updatedProducts[index] = {
        ...updatedProducts[index],
        images: [...updatedProducts[index].images, imageBase64],
      };
      setProducts(updatedProducts);
    }
  };

  const removeImage = (productIndex: number, image: string) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      images: updatedProducts[productIndex].images.filter((img) => img !== image),
    };
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { ...emptyProduct }]);
    setErrors([...errors, {}]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setErrors(updatedErrors);
  };

  const validate = (): boolean => {
    const newErrors = products.map(product => {
      const productErrors: Record<string, string> = {};
      
      if (!product.name) productErrors.name = 'Product name is required';
      if (!product.description) productErrors.description = 'Description is required';
      if (product.images.length === 0) productErrors.images = 'At least one image is required';
      if (!product.category) productErrors.category = 'Category is required';
      if (!product.ageRange) productErrors.ageRange = 'Age range is required';
      
      return productErrors;
    });
    
    setErrors(newErrors);
    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(products);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {products.map((product, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Product {index + 1}
            </h3>
            {multipleMode && products.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeProduct(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X size={18} />
                Remove
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id={`name-${index}`}
                value={product.name}
                onChange={(e) => handleChange(index, e)}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${
                  errors[index]?.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[index]?.name && <p className="mt-1 text-sm text-red-600">{errors[index].name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor={`category-${index}`} className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  id={`category-${index}`}
                  value={product.category}
                  onChange={(e) => handleChange(index, e)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${
                    errors[index]?.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="toys">Toys</option>
                  <option value="clothes">Clothes</option>
                  <option value="supplies">Supplies</option>
                </select>
                {errors[index]?.category && <p className="mt-1 text-sm text-red-600">{errors[index].category}</p>}
              </div>

              <div>
                <label htmlFor={`ageRange-${index}`} className="block text-sm font-medium text-gray-700">
                  Age Range
                </label>
                <select
                  name="ageRange"
                  id={`ageRange-${index}`}
                  value={product.ageRange}
                  onChange={(e) => handleChange(index, e)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${
                    errors[index]?.ageRange ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="0-3 years">0-3 years</option>
                  <option value="3-6 years">3-6 years</option>
                  <option value="6-9 years">6-9 years</option>
                  <option value="9-12 years">9-12 years</option>
                  <option value="12+ years">12+ years</option>
                  <option value="All ages">All ages</option>
                </select>
                {errors[index]?.ageRange && <p className="mt-1 text-sm text-red-600">{errors[index].ageRange}</p>}
              </div>
            </div>

            <div>
              <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                name="description"
                id={`description-${index}`}
                rows={4}
                value={product.description}
                onChange={(e) => handleChange(index, e)}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${
                  errors[index]?.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[index]?.description && <p className="mt-1 text-sm text-red-600">{errors[index].description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              
              <div className="mt-2 space-y-4">
                <div className="border border-gray-300 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Upload from Device</h4>
                  <ImageUploader onImageUploaded={(image) => handleImageUploaded(index, image)} />
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
                {product.images.length === 0 ? (
                  <p className="text-sm text-gray-500">No images added yet</p>
                ) : (
                  <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {product.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                          {image ? (
                            <img
                              src={image}
                              alt={`Product image ${imageIndex + 1}`}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index, image)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors[index]?.images && <p className="mt-1 text-sm text-red-600">{errors[index].images}</p>}
            </div>
          </div>
        </div>
      ))}

      {multipleMode && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={addProduct}
            className="w-full md:w-auto"
          >
            Add Another Product
          </Button>
        </div>
      )}

      <div className="pt-4">
        <Button type="submit" fullWidth>
          {product ? 'Update Product' : `Save ${products.length > 1 ? 'Products' : 'Product'}`}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;