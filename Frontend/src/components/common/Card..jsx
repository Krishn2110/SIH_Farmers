const Card = ({ title, value, unit, color = "text-green-600" }) => {
  return (
    <div className="p-4 text-center bg-white shadow rounded-xl">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>
        {value} {unit}
      </p>
    </div>
  );
};

export default Card;
