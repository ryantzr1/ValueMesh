export const copyToClipboard = async (str) => {
  try {
    await navigator.clipboard.writeText(str);
    console.log("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
