const getImage = ({ imageByte }) => {
  return "data:image/png;base64," + imageByte;
};

export { getImage };
