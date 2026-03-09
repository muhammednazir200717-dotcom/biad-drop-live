const phrases = [
  "BIAD.NG", "THE REALEST", "NEW DROP", "AUTHENTIC", "LAGOS", "CULTURE", "MOVEMENT",
  "BIAD.NG", "THE REALEST", "NEW DROP", "AUTHENTIC", "LAGOS", "CULTURE", "MOVEMENT",
];

const Ticker = () => {
  return (
    <div className="bg-accent/50 border-t border-b border-border overflow-hidden py-[9px]">
      <div className="flex gap-[60px] whitespace-nowrap ticker-animate">
        {phrases.map((p, i) => (
          <span
            key={i}
            className="font-body font-semibold text-[10px] tracking-[5px] uppercase text-foreground opacity-50 flex-shrink-0"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
