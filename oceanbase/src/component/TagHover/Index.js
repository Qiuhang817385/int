import React, { useState } from "react";
import { Tag, Tooltip } from "antd";
import Item from "antd/lib/list/Item";
const ShowIp = ({ IPdress }) => {
  IPdress = IPdress;
  return IPdress.map((_) => <Tag color="blue">{_}</Tag>);
};
export default function Index() {
  const [arr, setArr] = useState([
    "192.168.0.0:22",
    "192.168.0.0:22",
    "192.168.0.0:22",
    "192.168.0.0:22",
    "192.168.0.0:22",
    "192.168.0.0:22",
  ]);
  return (
    <div>
      {arr.length >= 2 ? (
        <>
          {arr.slice(0, 2).map((_,index) => (
            <Tag key={index}>{_}</Tag>
          ))}
          <Tooltip placement="right" title={<ShowIp IPdress={arr} />}>
            <Tag style={{ cursor: "pointer" }}>...</Tag>
          </Tooltip>
        </>
      ) : (
        <>
          {arr.map((_,index) => (
            <Tag key={index}>{_}</Tag>
          ))}
        </>
      )}
    </div>
  );
}
