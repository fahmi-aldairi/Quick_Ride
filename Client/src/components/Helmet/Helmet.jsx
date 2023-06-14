

const Helmet = (props) => {
  // eslint-disable-next-line react/prop-types
  document.title = "Rent Car Service - " + props.title;
  // eslint-disable-next-line react/prop-types
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
