export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error(error);

      reject(new Error("Failed to upload a file"));
    };

    reader.readAsDataURL(file);
  });
};
