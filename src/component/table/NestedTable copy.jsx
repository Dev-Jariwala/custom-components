const NestedTable = ({ data = [], headers = [] }) => {
  // Convert the flat data into a nested structure and calculate row spans
  const buildTreeAndCalculateRowspan = (list, parent = null) => {
    return list
      .filter((item) => item.parent_step_id === parent)
      .map((item) => {
        const children = buildTreeAndCalculateRowspan(list, item.unique_id);
        const leafCount = children.length
          ? children.reduce((sum, child) => sum + child.leafCount, 0)
          : 1;
        return {
          ...item,
          children,
          leafCount,
        };
      });
  };

  const nestedData = buildTreeAndCalculateRowspan(data);
  console.log(nestedData);
  return <div>NestedTable</div>;
};

export default NestedTable;
