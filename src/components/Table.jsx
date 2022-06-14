import React from "react";
import "./Table.css";
import { motion } from "framer-motion";

const Table = ({ rows }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Count</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {rows ? (
          rows.length > 0 ? (
            rows.map((item, i) => (
              <motion.tr
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2 * i }}
                variants={{
                  visible: { x: 0 },
                  hidden: { x: -1000 },
                }}
                key={item.id}
              >
                <motion.td>{item.date.slice(0, 10)}</motion.td>
                <motion.td>{item.title}</motion.td>
                <motion.td>{item.count}</motion.td>
                <motion.td>{item.distance}</motion.td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td>No delivery</td>
            </tr>
          )
        ) : (
          <tr>
            <td>No delivery</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
