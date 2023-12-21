import React from "react";
import { BankTwoTone } from "@ant-design/icons";
import { Timeline , Card } from "antd";
import "./Help.css";
const Help = () => {
  return (
    <div className="help_container">
      <h1 className="title_steps">Les étapes à suivre : </h1>
      <Timeline
        className="steps_timeline"
        mode="alternate"
        items={[
          {
            dot: (
              <BankTwoTone
                style={{
                  fontSize: "20px",
                }}
              />
            ),
            children:
              'Choisis Les Monuments Que vous souhaitez visiter de la "DropList" Dans la Page Home ',
          },
          {
            children: 'Appuyer sur le bouton "Submit"',
            color: "green",
          },
          {
            children: 'Vous Serez redirigé vers la page "Map" ',
          },
          {
            color: "green",
            children: "Choisis le moyen de transports",
          },
          {
            children:
              "Lisez les informations fournis sur les monuments choisis en clickant sur le bouton informations",
          },
          {
            children: "suivre l'iténéraire",
          },
        ]}
      />
    </div>
  );
};

export { Help };
