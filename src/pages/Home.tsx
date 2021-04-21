import React, { useEffect, useState } from "react";
import { getPrice } from "../api/endpoints/price";

interface PriceState {
  cold: string | number;
  drainage: string | number;
  electricity: string | number;
  hot: string | number;
  internet: string | number;
  rent: string | number;
  __v: string | number;
  _id: string | number;
}

function Home() {
  const [price, setPrice] = useState<PriceState | null>(null);
  const fetchPrice = async () => {
    try {
      const response = await getPrice();
      setPrice(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPrice();
  }, []);
  return (
    <div>
      <div className="home_container">
        <div className="home_top_block box_shadow">
          <div className="last_container">
            <div>
              <h3>Предыдушие показания</h3>
            </div>

            <div className="last_block">
              <div>
                <span>Гор.вода</span>
                <span>28000 руб.</span>
              </div>
              <div>
                <span>Хол.вода</span>
                <span>42.30 руб.</span>
              </div>
              <div>
                <span>Водоотвод</span>
                <span>30.90 руб.</span>
              </div>
              <div>
                <span>Свет</span>
                <span>4.87 руб.</span>
              </div>
            </div>
          </div>
          <div className="price_container">
            <div>
              <h3>Тариф</h3>
            </div>
            {price && (
              <div className="price_block">
                <div>
                  <span>Аренда</span>
                  <span>{price.rent} руб.</span>
                </div>
                <div>
                  <span>Гор.вода</span>
                  <span>{price.hot} руб.</span>
                </div>
                <div>
                  <span>Хол.вода</span>
                  <span>{price.cold} руб.</span>
                </div>
                <div>
                  <span>Водоотвод</span>
                  <span>{price.drainage} руб.</span>
                </div>
                <div>
                  <span>Свет</span>
                  <span>{price.electricity} руб.</span>
                </div>
                <div>
                  <span>Интертет</span>
                  <span>{price.internet} руб.</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
