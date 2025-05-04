// pages/index.js
import ProductCard from '@/components/ProductCard';

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return { props: { products } };
}

export default function Home({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
