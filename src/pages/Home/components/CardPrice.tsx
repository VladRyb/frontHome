import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { titlePrice } from "../../../helpers/options";
import { PriceState } from "../../../interface/home";
interface ITitlePrice {
  title: string;
  key: string;
}

const CardPrice = React.memo(({ price }: { price: PriceState | null }) => {
  return (
    <Card className="price_container">
      <CardContent>
        <Typography variant="h6" className="card_title">
          Тариф
        </Typography>
        {price && (
          <div className="price_block">
            {titlePrice?.map((item: ITitlePrice) => (
              <div key={item?.key}>
                <span>{item?.title}</span>
                <span>{price?.[item?.key]} руб.</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default CardPrice;
