/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
const products = [
  {
    unique_id: "uid1",
    product_name: "Product 1",
    step1_id: "step1.1",
    step2_id: null,
    step3_id: null,
    step1_value: "Step 1.1",
    step2_value: null,
    step3_value: null,
  },
  {
    unique_id: "uid2",
    product_name: "Product 2",
    step1_id: "step1.1",
    step2_id: "step1.1.1",
    step3_id: null,
    step1_value: "Step 1.1",
    step2_value: "Step 1.1.1",
    step3_value: null,
  },
  {
    unique_id: "uid3",
    product_name: "Product 3",
    step1_id: "step1.1",
    step2_id: "step1.1.2",
    step3_id: null,
    step1_value: "Step 1.1",
    step2_value: "Step 1.1.2",
    step3_value: null,
  },
  {
    unique_id: "uid4",
    product_name: "Product 4",
    step1_id: "step1.1",
    step2_id: "step1.1.1",
    step3_id: "step1.1.1.1",
    step1_value: "Step 1.1",
    step2_value: "Step 1.1.1",
    step3_value: "Step 1.1.1.1",
  },
  {
    unique_id: "uid5",
    product_name: "Product 5",
    step1_id: "step1.1",
    step2_id: "step1.1.1",
    step3_id: "step1.1.1.2",
    step1_value: "Step 1.1",
    step2_value: "Step 1.1.1",
    step3_value: "Step 1.1.1.2",
  },
  {
    unique_id: "uid6",
    product_name: "Product 6",
    step1_id: "step1.1",
    step2_id: "step1.1.2",
    step3_id: "step1.1.2.1",
    step1_value: "Step 1.1",
    step2_value: "Step 1.1.2",
    step3_value: "Step 1.1.2.1",
  },
  {
    unique_id: "uid7",
    product_name: "Product 7",
    step1_id: "step1.1",
    step2_id: "step1.1.2",
    step3_id: "step1.1.2.2",
    step1_value: "Step 1.1",
    step2_value: "Step 1.1.2",
    step3_value: "Step 1.1.2.2",
  },
];
const headers = ["Step 1", "Step 2", "Step 3", "Product Name", "Product ID"];
const groupKeys = ["step1_id", "step2_id", "step3_id"];
const Home = () => {
  function organizeData(products, groupKeys, index = 0) {
    const groupKey = groupKeys[index];
    if (!groupKey) {
      return products;
    }
    const groupedProducts = {};
    products.forEach((product) => {
      const key = product[groupKey];
      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          step_value: product[`${groupKey.split("_")[0]}_value`],
          childrens: [],
          leafCount: 0,
        };
      }
      groupedProducts[key].childrens.push(product);
    });
    Object.keys(groupedProducts).forEach((key) => {
      const children = organizeData(
        groupedProducts[key].childrens,
        groupKeys,
        index + 1
      );
      groupedProducts[key].childrens = children;

      // Calculate leafCount
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

  const groupedProds = organizeData(products, groupKeys);

  // console.log(groupedProds);
  let tds = [];
  function consoleObj(prods) {
    Object.keys(prods).forEach((key, i) => {
      // console.log(key, prods[key]);
      if (prods[key].leafCount) {
        tds.push(
          <td
            datakey={key}
            rowSpan={prods[key].leafCount}
            className="border border-gray-200 text-center"
          >
            {prods[key].step_value || "-"}
          </td>
        );
      } else {
        tds = [
          ...tds,
          <td
            dataproduct={prods[key]}
            datakey={key}
            className="border border-gray-200 text-center"
          >
            {prods[key].product_name}
          </td>,
          <td
            dataproduct={prods[key]}
            datakey={key}
            className="border border-gray-200 text-center"
          >
            {prods[key].unique_id}
          </td>,
        ];
      }
      if (
        prods[key].childrens &&
        Object.keys(prods[key].childrens).length > 0
      ) {
        consoleObj(prods[key].childrens);
      }
    });
  }
  consoleObj(groupedProds);
  // console.log(tds);
  let trs = [];
  let temp = [];
  tds.forEach((td, i) => {
    if (td.props.datakey === "0" && tds[i + 1]?.props?.datakey !== "0") {
      temp.push(td);
      trs.push(temp);
      temp = [];
    } else {
      temp.push(td);
    }
  });
  console.log(trs);
  return (
    <>
      <div className="w-full">
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
            {trs.map((tr, i) => (
              <tr key={i}>{tr}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
