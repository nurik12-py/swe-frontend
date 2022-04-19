export default function getBase64(file: File) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      return resolve(reader.result);
    };

    reader.onerror = () => {
      return reject(new Error("Unable to convert"));
    };
  });
}
