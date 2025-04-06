import React from "react";
import EditButtonDashboad from "./EditButton";
import DeleteButtonDashboad from "./DeleteButton";
import { Link } from "react-router-dom";

const TbodyDashboad = ({ data, removeItem }) => {
  // Sắp xếp dữ liệu từ ID lớn đến nhỏ
  const sortedData = [...data].sort((a, b) => b.id - a.id);

  return (
    <tbody>
      {sortedData.length > 0 &&
        sortedData.map((product) => {
          return (
            <tr key={product.id}>
              <td scope="row">{product.id}</td>
              <td scope="row">{product.title}</td>
              <td scope="row">{product.content}</td>
              <td className="text-danger" scope="row">
                {product.price} Vnd
              </td>
              <td scope="row">
                <Link to={`/dashboad/product/edit/${product.id}`}>
                  <EditButtonDashboad />
                </Link>
              </td>
              <td scope="row">
                <DeleteButtonDashboad id={product.id} removeItem={removeItem} />
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default TbodyDashboad;
