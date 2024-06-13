import { calculateTotalPrice, RelatedProduct } from './manageProductsModal';

describe('prices are proplery calculated', () => {
  test('a unit of a product with a price of 100, 21% VAT and a discount of 10% should have a price of 108.9', () => {
    const product: RelatedProduct = {
      product: 'product',
      totalPrice: 108.9,
      unitPrice: 100,
      vat: 21,
      discount: 10,
      extraFee: 0,
      units: 1,
    };
    expect(calculateTotalPrice(product).toFixed(2)).toBe('90.00');
  });
  test('a unit of a product with a price of 100, 21% VAT and a discount of 10% and an extra fee of 10 should have a price of 100', () => {
    const product: RelatedProduct = {
      product: 'product',
      totalPrice: 108.09,
      unitPrice: 100,
      vat: 21,
      discount: 10,
      extraFee: 10,
      units: 1,
    };
    expect(calculateTotalPrice(product).toFixed(2)).toBe('100.00');
  });
  test('10 units of a product with a price of 100, 21% VAT and a discount of 10% and an extra fee of 10 should have a price of 910.00', () => {
    const product: RelatedProduct = {
      product: 'product',
      totalPrice: 910.0,
      unitPrice: 100,
      vat: 21,
      discount: 10,
      extraFee: 10,
      units: 10,
    };
    expect(calculateTotalPrice(product).toFixed(2)).toBe('910.00');
  });
});
