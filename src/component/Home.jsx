/* eslint-disable react/jsx-key */

import NestedTable from "./table/NestedTable";

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
  return (
    <>
      <NestedTable data={products} headers={headers} groupKeys={groupKeys} />
    </>
  );
};

export default Home;
