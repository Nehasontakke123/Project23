// components/ProductCard.js
export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow p-4">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-sm">{product.description.substring(0, 100)}...</p>
      <p className="font-semibold text-blue-600">${product.price}</p>
    </div>
  );
}
