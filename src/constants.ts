// Filter `option.label` match the user type `input`
export const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

// Handle the `onChange` event of the `Select` component
export const onSearch = (value: string) => {
  console.log("search:", value);
};
