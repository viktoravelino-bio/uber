export function PriceDetailItem({ label, price }) {
  return (
    <div className="ride-extra-info__body__price-detail-item">
      <p>{label}</p>
      <p>CA${price.toFixed(2)}</p>
    </div>
  );
}
