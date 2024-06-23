/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */

const NestedTable = ({ data = [], headers = [], groupKeys = [] }) => {
  /**
   * Groups the products based on the provided group keys.
   * @param {Array} products - List of products to group.
   * @param {Array} groupKeys - Keys to group by.
   * @param {Number} index - Current index in the groupKeys array.
   * @returns {Object} - Grouped products.
   */
  function groupProducts(products, groupKeys, index = 0) {
    const groupKey = groupKeys[index];
    if (!groupKey) {
      return products;
    }

    const groupedProducts = {};

    products.forEach((product) => {
      const key = product[groupKey];
      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          groupValue: product[`${groupKey.split("_")[0]}_value`],
          children: [],
          leafCount: 0,
        };
      }
      groupedProducts[key].children.push(product);
    });

    Object.keys(groupedProducts).forEach((key) => {
      const children = groupProducts(
        groupedProducts[key].children,
        groupKeys,
        index + 1
      );
      groupedProducts[key].children = children;

      if (groupKeys[index + 1]) {
        groupedProducts[key].leafCount = Object.values(children).reduce(
          (count, child) => count + child.leafCount,
          0
        );
      } else {
        groupedProducts[key].leafCount = children.length;
      }
    });

    return groupedProducts;
  }

  const groupedProducts = groupProducts(data, groupKeys);

  /**
   * Creates table cells recursively for the grouped products.
   * @param {Object} products - Grouped products.
   * @param {Number} depth - Current depth level.
   * @returns {Array} - Array of table cell elements.
   */
  function createTableCells(products, depth = 0) {
    let cells = [];

    Object.keys(products).forEach((key, i) => {
      if (products[key].leafCount) {
        cells.push(
          <td
            key={`group${depth}${i}${key}`}
            datakey={key}
            rowSpan={products[key].leafCount}
            className="border border-gray-200 text-center"
          >
            {products[key].groupValue || "-"}
          </td>
        );
      } else {
        cells = [
          ...cells,
          <td
            dataproduct={products[key]}
            datakey={key}
            key={`name${depth}${i}${key}`}
            className="border border-gray-200 text-center"
          >
            {products[key].product_name}
          </td>,
          <td
            dataproduct={products[key]}
            datakey={key}
            key={`id${depth}${i}${key}`}
            className="border border-gray-200 text-center"
          >
            {products[key].unique_id}
          </td>,
        ];
      }

      if (
        products[key].children &&
        Object.keys(products[key].children).length > 0
      ) {
        cells = [
          ...cells,
          ...createTableCells(products[key].children, depth + 1),
        ];
      }
    });

    return cells;
  }

  const tableCells = createTableCells(groupedProducts);

  /**
   * Organizes table cells into rows based on the 'datakey' property.
   * @param {Array} cells - Array of table cell elements.
   * @returns {Array} - Array of table row elements.
   */
  function organizeTableRows(cells) {
    const rows = [];
    let tempRow = [];

    cells.forEach((cell, i) => {
      if (cell.props.datakey === "0" && cells[i + 1]?.props?.datakey !== "0") {
        tempRow.push(cell);
        rows.push(tempRow);
        tempRow = [];
      } else {
        tempRow.push(cell);
      }
    });

    return rows;
  }

  const tableRows = organizeTableRows(tableCells);

  return (
    <table className="w-full border border-gray-200">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="border border-gray-200 text-center">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, i) => (
          <tr key={i}>{row}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default NestedTable;
